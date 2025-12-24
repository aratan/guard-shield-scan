import { motion } from "framer-motion";
import { Shield, Award, Target, Users } from "lucide-react";

const highlights = [
  {
    icon: Award,
    title: "Certificaciones",
    description: "OSCP, CEH, CISSP y más certificaciones reconocidas internacionalmente.",
  },
  {
    icon: Target,
    title: "Metodología",
    description: "Enfoque basado en OWASP, PTES y metodologías propias probadas.",
  },
  {
    icon: Users,
    title: "Experiencia",
    description: "Más de 10 años trabajando con empresas de todos los sectores.",
  },
];

export const AboutSection = () => {
  return (
    <section id="sobre-mi" className="py-20 md:py-32 bg-card relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image/Avatar area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform rotate-3" />
              <div className="absolute inset-0 border-2 border-primary/30 rounded-2xl transform -rotate-3" />
              
              {/* Main avatar container */}
              <div className="relative bg-secondary rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-6">
                  <Shield className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  [Victor Arbiol]
                </h3>
                <p className="text-primary font-mono text-sm mb-4">
                  Security Researcher & Pentester
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full">
                    OSCP
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full">
                    CEH
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full">
                    CISSP
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-mono text-sm mb-4 block">
              // SOBRE MÍ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Experiencia real en{" "}
              <span className="text-gradient">seguridad ofensiva</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Con más de una década de experiencia en ciberseguridad, me especializo
              en encontrar vulnerabilidades antes de que los atacantes las exploten.
              Mi enfoque combina técnicas manuales avanzadas con herramientas
              automatizadas para ofrecer evaluaciones exhaustivas.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Creo firmemente que la mejor defensa es conocer cómo piensa y actúa
              un atacante. Por eso, mis auditorías simulan escenarios reales que
              van más allá de los escaneos superficiales.
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
