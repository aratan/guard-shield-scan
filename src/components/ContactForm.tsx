import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  empresa: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Email inválido").max(255),
  telefono: z.string().trim().max(20).optional(),
  comentario: z.string().trim().min(10, "El comentario debe tener al menos 10 caracteres").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    comentario: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = contactSchema.parse(formData);
      
      const { error } = await supabase.from('leads').insert({
        nombre: validatedData.nombre,
        empresa: validatedData.empresa || null,
        email: validatedData.email,
        telefono: validatedData.telefono || null,
        comentario: validatedData.comentario,
      });

      if (error) throw error;
      
      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
      });

      setFormData({
        nombre: "",
        empresa: "",
        email: "",
        telefono: "",
        comentario: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: "Error de validación",
          description: "Por favor, revisa los campos marcados.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="nombre" className="text-sm font-medium text-foreground">
            Nombre *
          </label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className={errors.nombre ? "border-destructive" : ""}
          />
          {errors.nombre && (
            <p className="text-xs text-destructive">{errors.nombre}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="empresa" className="text-sm font-medium text-foreground">
            Empresa
          </label>
          <Input
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            placeholder="Tu empresa"
            className={errors.empresa ? "border-destructive" : ""}
          />
          {errors.empresa && (
            <p className="text-xs text-destructive">{errors.empresa}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="telefono" className="text-sm font-medium text-foreground">
            Teléfono
          </label>
          <Input
            id="telefono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+34 600 000 000"
            className={errors.telefono ? "border-destructive" : ""}
          />
          {errors.telefono && (
            <p className="text-xs text-destructive">{errors.telefono}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="comentario" className="text-sm font-medium text-foreground">
          Comentario *
        </label>
        <Textarea
          id="comentario"
          name="comentario"
          value={formData.comentario}
          onChange={handleChange}
          placeholder="Cuéntanos sobre tu proyecto o necesidades de seguridad..."
          rows={5}
          className={errors.comentario ? "border-destructive" : ""}
        />
        {errors.comentario && (
          <p className="text-xs text-destructive">{errors.comentario}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="hero"
        size="lg"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar mensaje
          </>
        )}
      </Button>
    </motion.form>
  );
};
