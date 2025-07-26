import { Card } from "@/components/ui/card";
import { Shield, Award, Heart, Star } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Curamos solo propiedades de lujo",
    description: "Cada villa es seleccionada personalmente por nuestro equipo de expertos en hospitalidad de lujo",
  },
  {
    icon: Shield,
    title: "Siempre el mejor precio disponible",
    description: "Garantizamos que encontrarás el mismo precio o mejor que en cualquier otra plataforma",
  },
  {
    icon: Heart,
    title: "Experiencias inolvidables",
    description: "Nos enfocamos en crear momentos únicos en destinos que permanecerán en tu memoria para siempre",
  },
  {
    icon: Star,
    title: "Atención personalizada",
    description: "Nuestro equipo de concierge está disponible para asistirte antes, durante y después de tu estancia",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            Por qué elegirnos para tu{" "}
            <span className="font-bold bg-gradient-luxury bg-clip-text text-transparent">
              próxima escapada
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Más de 5 años conectando viajeros exigentes con las mejores villas de lujo en Europa
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-8 border-0 shadow-luxury hover:shadow-gold transition-all duration-500 group bg-white"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-luxury rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-luxury bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              93+
            </div>
            <p className="text-muted-foreground font-medium">Villas de Lujo</p>
          </div>
          <div className="group">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-luxury bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              5
            </div>
            <p className="text-muted-foreground font-medium">Destinos Exclusivos</p>
          </div>
          <div className="group">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-luxury bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              2.8k+
            </div>
            <p className="text-muted-foreground font-medium">Huéspedes Satisfechos</p>
          </div>
          <div className="group">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-luxury bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              4.9
            </div>
            <p className="text-muted-foreground font-medium">Valoración Media</p>
          </div>
        </div>
      </div>
    </section>
  );
};