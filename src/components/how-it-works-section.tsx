import { Card } from "@/components/ui/card";
import { Search, ExternalLink, Calendar } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Encuentra tu villa perfecta",
    description: "Explora nuestra selección curada de villas de lujo en destinos exclusivos",
    number: "01",
  },
  {
    icon: ExternalLink,
    title: "Haz clic en 'Ver en Booking'",
    description: "Te dirigimos directamente a la plataforma de reservas sin intermediarios",
    number: "02",
  },
  {
    icon: Calendar,
    title: "Reserva directamente",
    description: "Completa tu reserva con total seguridad y al mejor precio garantizado",
    number: "03",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            Cómo{" "}
            <span className="font-bold bg-gradient-luxury bg-clip-text text-transparent">
              Funciona
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nuestro modelo de afiliación te garantiza transparencia total y los mejores precios
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={step.number}
              className="relative p-8 text-center border-0 bg-white shadow-luxury hover:shadow-gold transition-all duration-500 group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Step Number */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-luxury rounded-full flex items-center justify-center text-white font-bold text-lg shadow-gold">
                  {step.number}
                </div>
              </div>

              {/* Icon */}
              <div className="mb-6 mt-4">
                <step.icon className="w-16 h-16 mx-auto text-luxury-gold group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Decorative line */}
              <div className="mt-6 w-16 h-0.5 bg-gradient-luxury mx-auto opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-card backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Sin comisiones. Sin registros. Sin intermediarios.
            </h3>
            <p className="text-muted-foreground text-lg">
              Trabajamos directamente con las plataformas de reserva más confiables para garantizarte 
              los mejores precios y una experiencia de reserva sin complicaciones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};