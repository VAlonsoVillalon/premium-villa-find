import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-villa.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-light text-white mb-6 tracking-tight animate-fade-in">
          La vida que{" "}
          <span className="font-bold bg-gradient-luxury bg-clip-text text-transparent">
            imaginas
          </span>
          ,<br />
          empieza aquí
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed animate-slide-up">
          Villas privadas de lujo en los destinos más exclusivos del Mediterráneo y los Pirineos
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
          <Link to="/explorar-villas">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-12 py-6 h-auto min-w-[200px]"
            >
              Descubrir Villas
            </Button>
          </Link>
          
          <a href="#destinos">
            <Button 
              variant="luxuryOutline" 
              size="lg" 
              className="text-lg px-12 py-6 h-auto min-w-[200px] border-white/50 text-white hover:bg-white hover:text-primary"
            >
              Ver Destinos
            </Button>
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};