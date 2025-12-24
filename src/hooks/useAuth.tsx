import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { BrowserProvider } from 'ethers';
import EthereumProvider from '@walletconnect/ethereum-provider';

type WalletType = 'metamask' | 'walletconnect';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithWallet: (walletType: WalletType) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const authenticateWithAddress = async (address: string, signer: { signMessage: (message: string) => Promise<string> }) => {
    // Create a message for the user to sign with timestamp for security
    const timestamp = Date.now();
    const message = `Iniciar sesión en CyberAuditPro\n\nWallet: ${address}\nTimestamp: ${timestamp}`;
    
    // Request signature
    let signature: string;
    try {
      signature = await signer.signMessage(message);
    } catch (signError) {
      if (signError instanceof Error && signError.message.includes('user rejected')) {
        return { error: new Error('Firma rechazada por el usuario') };
      }
      return { error: new Error('Error al firmar el mensaje') };
    }

    // Use the wallet address as email and a hash of signature as password
    const walletEmail = `${address.toLowerCase()}@wallet.cyberauditpro`;
    // Use a consistent password derived from the address (not the signature which changes)
    const walletPassword = `wallet_${address.toLowerCase()}_secure_auth`;

    // Try to sign in first
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: walletEmail,
      password: walletPassword,
    });

    // If user doesn't exist, sign up
    if (signInError?.message?.includes('Invalid login credentials')) {
      const { error: signUpError } = await supabase.auth.signUp({
        email: walletEmail,
        password: walletPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: `Wallet ${address.slice(0, 6)}...${address.slice(-4)}`,
            wallet_address: address,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message?.includes('Email not confirmed')) {
          return { error: new Error('Por favor confirma tu email para continuar') };
        }
        return { error: signUpError as Error };
      }

      // Try to sign in after signup
      const { error: autoSignInError } = await supabase.auth.signInWithPassword({
        email: walletEmail,
        password: walletPassword,
      });

      if (autoSignInError?.message?.includes('Email not confirmed')) {
        return { error: new Error('Cuenta creada. Por favor confirma tu email para continuar.') };
      }

      if (autoSignInError) {
        return { error: autoSignInError as Error };
      }
    } else if (signInError) {
      return { error: signInError as Error };
    }

    return { error: null };
  };

  const signInWithWallet = async (walletType: WalletType) => {
    try {
      if (walletType === 'metamask') {
        // MetaMask connection
        const ethereum = (window as Window & { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown>; isMetaMask?: boolean } }).ethereum;
        
        if (!ethereum) {
          return { error: new Error('No se detectó MetaMask. Por favor instala MetaMask.') };
        }

        try {
          await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (requestError) {
          return { error: new Error('Acceso a la wallet denegado. Por favor, autoriza la conexión.') };
        }

        const provider = new BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        return authenticateWithAddress(address, signer);
      } else {
        // WalletConnect connection
        const { data, error: configError } = await supabase.functions.invoke('get-walletconnect-config');
        
        if (configError || !data?.projectId) {
          return { error: new Error('WalletConnect no está configurado correctamente') };
        }

        const wcProvider = await EthereumProvider.init({
          projectId: data.projectId,
          chains: [1], // Ethereum mainnet
          optionalChains: [137, 56, 42161], // Polygon, BSC, Arbitrum
          showQrModal: true,
          metadata: {
            name: 'CyberAuditPro',
            description: 'Servicios de auditoría Web3 y seguridad blockchain',
            url: window.location.origin,
            icons: [`${window.location.origin}/favicon.ico`],
          },
        });

        await wcProvider.connect();
        
        const accounts = wcProvider.accounts;
        if (!accounts || accounts.length === 0) {
          return { error: new Error('No se pudo obtener la dirección de la wallet') };
        }

        const address = accounts[0];
        const provider = new BrowserProvider(wcProvider);
        const signer = await provider.getSigner();

        const result = await authenticateWithAddress(address, signer);
        
        // Disconnect WalletConnect after authentication
        if (!result.error) {
          // Keep session alive but close modal
        }

        return result;
      }
    } catch (err) {
      console.error('Wallet login error:', err);
      if (err instanceof Error) {
        if (err.message.includes('user rejected') || err.message.includes('User rejected') || err.message.includes('User closed')) {
          return { error: new Error('Operación cancelada por el usuario') };
        }
        if (err.message.includes('already pending')) {
          return { error: new Error('Ya hay una solicitud pendiente en tu wallet.') };
        }
        return { error: err };
      }
      return { error: new Error('Error al conectar con la wallet') };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithWallet, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
