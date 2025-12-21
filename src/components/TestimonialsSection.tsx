import { motion } from "framer-motion";
import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    quote:
      "La auditoría reveló vulnerabilidades críticas que nuestro equipo interno no había detectado. El informe fue claro y las recomendaciones muy accionables.",
    author: "María García",
    role: "CTO",
    company: "TechStartup SL",
  },
  {
    quote:
      "Profesionalidad y rigor técnico excepcionales. Nos ayudó a cumplir con los requisitos de seguridad de nuestros clientes enterprise.",
    author: "Carlos Ruiz",
    role: "Director de IT",
    company: "FinanceGroup",
  },
  {
    quote:
      "El Red Team Assessment fue revelador. Identificamos brechas en nuestra seguridad que nunca hubiéramos encontrado de otra manera.",
    author: "Ana Martínez",
    role: "CISO",
    company: "HealthTech Corp",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonios" className="py-20 md:py-32 bg-background relative">
      {/* Background accent */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

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
            // TESTIMONIOS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Lo que dicen nuestros{" "}
            <span className="text-gradient">clientes</span>
          </h2>
          <p className="text-muted-foreground">
            Empresas que han confiado en nosotros para proteger sus activos digitales.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              {...testimonial}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
