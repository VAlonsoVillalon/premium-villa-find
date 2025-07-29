import { Button } from "@/components/ui/button";
import { Menu, X, Crown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Alquiler Villas de Lujo
              </h1>
              <p className="text-xs text-muted-foreground">Destinos exclusivos</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#destinos" className="text-foreground hover:text-luxury-gold transition-colors font-medium">
              Destinos
            </a>
            <a href="#villas" className="text-foreground hover:text-luxury-gold transition-colors font-medium">
              Villas
            </a>
            <a href="#como-funciona" className="text-foreground hover:text-luxury-gold transition-colors font-medium">
              Cómo Funciona
            </a>
            <a href="#contacto" className="text-foreground hover:text-luxury-gold transition-colors font-medium">
              Contacto
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="luxuryOutline" size="sm">
              Concierge
            </Button>
            <Link to="/explorar-villas">
              <Button variant="luxury" size="sm">
                Explorar Villas
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-luxury-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#destinos" 
                className="text-foreground hover:text-luxury-gold transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinos
              </a>
              <a 
                href="#villas" 
                className="text-foreground hover:text-luxury-gold transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Villas
              </a>
              <a 
                href="#como-funciona" 
                className="text-foreground hover:text-luxury-gold transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Cómo Funciona
              </a>
              <a 
                href="#contacto" 
                className="text-foreground hover:text-luxury-gold transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
              <div className="flex flex-col space-y-3 pt-4">
                <Button variant="luxuryOutline" size="sm">
                  Concierge
                </Button>
                <Link to="/explorar-villas">
                  <Button variant="luxury" size="sm">
                    Explorar Villas
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};