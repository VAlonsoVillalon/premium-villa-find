import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-luxury-gold-dark" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-luxury-gold/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
          Elige tu destino.{" "}
          <span className="font-bold">
            Vive lo extraordinario.
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Tu próxima escapada de lujo te está esperando. Descubre villas exclusivas 
          donde cada detalle ha sido pensado para superar tus expectativas.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-12 py-6 h-auto min-w-[240px] group"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Explorar Villas
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          
          <Button 
            variant="luxuryOutline" 
            size="lg" 
            className="text-lg px-12 py-6 h-auto min-w-[240px] border-white/50 text-white hover:bg-white group"
          >
            Contactar Concierge
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse" />
            <span className="text-sm font-medium">Reserva sin registro</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse" />
            <span className="text-sm font-medium">Mejor precio garantizado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse" />
            <span className="text-sm font-medium">Atención 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};