import { motion } from "framer-motion";
import { ContactForm } from "./ContactForm";
import { Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contacto@seed42.uk",
    href: "mailto:contacto@seed42.uk",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: "Madrid, España",
    href: null,
  },
  {
    icon: Clock,
    title: "Horario",
    value: "Lun - Vie: 9:00 - 18:00",
    href: null,
  },
];

export const ContactSection = () => {
  return (
    <section id="contacto" className="py-20 md:py-32 bg-card relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-mono text-sm mb-4 block">
              // CONTACTO
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Listo para proteger{" "}
              <span className="text-gradient">tu empresa?</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Cuéntanos sobre tu proyecto y necesidades de seguridad. Te responderemos
              en menos de 24 horas con una propuesta personalizada.
            </p>

            {/* Contact info cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{item.title}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-foreground font-medium hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <div className="bg-background rounded-xl border border-border p-6 md:p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">
              Envíanos un mensaje
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
