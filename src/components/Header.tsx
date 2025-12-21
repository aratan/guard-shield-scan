import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate("/auth");
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block">
              CyberAudit<span className="text-primary">Pro</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth & CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Panel Admin
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAuthClick}
              className="flex items-center gap-2"
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Acceder
                </>
              )}
            </Button>
            <Button variant="hero" size="default" asChild>
              <a href="#contacto">Solicitar evaluación</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg"
          >
            <div className="flex flex-col py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 px-4 py-2 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-4 pt-2 space-y-2">
                {user && (
                  <Button 
                    variant="ghost" 
                    size="default" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/admin');
                    }}
                  >
                    <User className="w-4 h-4" />
                    Panel Admin
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="default" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleAuthClick();
                  }}
                >
                  {user ? (
                    <>
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      Acceder
                    </>
                  )}
                </Button>
                <Button variant="hero" size="default" className="w-full" asChild>
                  <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)}>
                    Solicitar evaluación
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
