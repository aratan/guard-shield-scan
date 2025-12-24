import { Shield, Linkedin, Twitter, Github, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-lg text-foreground">
                CyberAudit<span className="text-primary">Pro</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Especialistas en auditorías ofensivas y evaluación de vulnerabilidades.
              Protege tu empresa con simulaciones de ataques reales y asesoría experta.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#sobre-mi" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Sobre mí
                </a>
              </li>
              <li>
                <a href="#testimonios" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <div className="space-y-3">
              <a
                href="mailto:contacto@seed42.uk"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                contacto@seed42.uk
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} CyberAuditPro. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs">
              Política de privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs">
              Términos y condiciones
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs">
              Aviso legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
