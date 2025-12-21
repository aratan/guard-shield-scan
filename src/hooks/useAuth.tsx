import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { BrowserProvider } from 'ethers';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithWallet: () => Promise<{ error: Error | null }>;
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

  const signInWithWallet = async () => {
    try {
      // Check if MetaMask or another wallet is installed
      const ethereum = (window as Window & { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum;
      if (!ethereum) {
        return { error: new Error('No se detectó una wallet Web3. Por favor instala MetaMask.') };
      }

      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Create a message for the user to sign
      const nonce = Math.floor(Math.random() * 1000000).toString();
      const message = `Iniciar sesión en CyberAuditPro\n\nWallet: ${address}\nNonce: ${nonce}`;
      
      // Request signature
      const signature = await signer.signMessage(message);

      // Use the wallet address as email (with a domain) and signature as password
      const walletEmail = `${address.toLowerCase()}@wallet.local`;
      const walletPassword = signature.slice(0, 72); // Use first 72 chars of signature as password

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
          return { error: signUpError as Error };
        }

        // Auto sign in after signup
        const { error: autoSignInError } = await supabase.auth.signInWithPassword({
          email: walletEmail,
          password: walletPassword,
        });

        if (autoSignInError) {
          return { error: autoSignInError as Error };
        }
      } else if (signInError) {
        return { error: signInError as Error };
      }

      return { error: null };
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('user rejected')) {
          return { error: new Error('Firma rechazada por el usuario') };
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
