import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
  price: string;
  delivery: string;
  delay?: number;
}

export const ServiceCard = ({
  icon: Icon,
  title,
  description,
  duration,
  price,
  delivery,
  delay = 0,
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative bg-card border border-border rounded-xl p-6 card-hover glow-border overflow-hidden"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon */}
      <div className="relative z-10 mb-5">
        <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-4">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer with details */}
      <div className="relative z-10 mt-6 pt-4 border-t border-border/50">
        <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <span className="text-primary">⏱</span> {duration}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-primary">💰</span> {price}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-primary">📦</span> {delivery}
          </span>
        </div>
        <Button variant="card" size="sm" className="w-full">
          Solicitar evaluación
        </Button>
      </div>
    </motion.div>
  );
};
