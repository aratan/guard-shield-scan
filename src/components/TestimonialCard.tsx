import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  delay?: number;
}

export const TestimonialCard = ({
  quote,
  author,
  role,
  company,
  delay = 0,
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
    >
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-primary/30 mb-4" />
      
      {/* Quote text */}
      <p className="text-foreground/90 text-sm leading-relaxed mb-6 italic">
        "{quote}"
      </p>

      {/* Author info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-bold text-sm">
            {author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-foreground font-semibold text-sm">{author}</p>
          <p className="text-muted-foreground text-xs">
            {role} · {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
