import { motion } from "framer-motion";
import { ServiceCard } from "./ServiceCard";
import { Shield, Search, Bug, Lock, Server, FileWarning } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Auditoría ofensiva de exposición",
    description:
      "Simulamos ataques reales para que descubras riesgos antes de que ocurran. Informe ejecutivo claro y recomendaciones priorizadas.",
    duration: "5–7 días",
    price: "Desde 2.500€",
    delivery: "Informe + presentación",
  },
  {
    icon: Search,
    title: "Pentesting de aplicaciones web",
    description:
      "Análisis exhaustivo de tu aplicación web buscando vulnerabilidades OWASP Top 10 y lógica de negocio comprometida.",
    duration: "3–5 días",
    price: "Desde 1.800€",
    delivery: "Informe técnico detallado",
  },
  {
    icon: Bug,
    title: "Red Team Assessment",
    description:
      "Evaluación completa simulando un atacante real. Incluye ingeniería social, evasión de defensas y movimiento lateral.",
    duration: "10–15 días",
    price: "Desde 5.000€",
    delivery: "Informe + plan de remediación",
  },
  {
    icon: Lock,
    title: "Evaluación de seguridad en la nube",
    description:
      "Revisión de configuración y seguridad en AWS, Azure o GCP. Detectamos exposiciones y malas configuraciones críticas.",
    duration: "4–6 días",
    price: "Desde 2.000€",
    delivery: "Informe con hallazgos",
  },
  {
    icon: Server,
    title: "Auditoría de infraestructura",
    description:
      "Análisis de la red interna, servidores y servicios expuestos. Identificamos vectores de ataque internos y externos.",
    duration: "5–8 días",
    price: "Desde 2.800€",
    delivery: "Informe + mapa de red",
  },
  {
    icon: FileWarning,
    title: "Análisis de vulnerabilidades",
    description:
      "Escaneo automatizado y validación manual de vulnerabilidades. Perfecto como primera línea de defensa continua.",
    duration: "2–3 días",
    price: "Desde 800€",
    delivery: "Informe priorizado",
  },
];

export const ServicesSection = () => {
  return (
    <section id="servicios" className="py-20 md:py-32 bg-background relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">
            // NUESTROS SERVICIOS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Soluciones de seguridad{" "}
            <span className="text-gradient">ofensiva</span>
          </h2>
          <p className="text-muted-foreground">
            Cada servicio diseñado para identificar y mitigar riesgos reales
            antes de que se conviertan en incidentes costosos.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
