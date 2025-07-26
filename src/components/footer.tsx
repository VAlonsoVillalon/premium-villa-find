import { Crown, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  Alquiler Villas de Lujo
                </h3>
                <p className="text-sm text-white/70">Destinos exclusivos</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Conectamos viajeros exigentes con las mejores villas de lujo en Europa. 
              Experiencias inolvidables en destinos exclusivos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-luxury-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-luxury-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-luxury-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Destinos</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-luxury-gold transition-colors">Ibiza</a></li>
              <li><a href="#" className="text-white/80 hover:text-luxury-gold transition-colors">Marbella</a></li>
              <li><a href="#" className="text-white/80 hover:text-luxury-gold transition-colors">Mallorca</a></li>
              <li><a href="#" className="text-white/80 hover:text-luxury-gold transition-colors">Baqueira</a></li>
              <li><a href="#" className="text-white/80 hover:text-luxury-gold transition-colors">Andorra</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Servicios</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-luxury-gold transition-colors">Villas de Playa</a></li>
              <li><a href="#" className="text-white/80 hover:text-luxury-gold transition-colors">Chalets de Montaña</a></li>
              <li><a href="#" className="text-white/80 hover:text-luxury-gold transition-colors">Concierge Premium</a></li>
              <li><a href="#" className="text-white/80 hover:text-luxury-gold transition-colors">Experiencias VIP</a></li>
              <li><a href="#" className="text-white/80 hover:text-luxury-gold transition-colors">Transporte Privado</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-luxury-gold" />
                <span className="text-white/80">info@villasdelujo.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-luxury-gold" />
                <span className="text-white/80">+34 900 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-luxury-gold" />
                <span className="text-white/80">Madrid, España</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-white/60 mb-2">Atención al cliente</p>
              <p className="text-sm text-white/80">Lun - Dom: 24h disponible</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2024 Alquiler Villas de Lujo. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-luxury-gold transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-white/60 hover:text-luxury-gold transition-colors">
                Términos de Uso
              </a>
              <a href="#" className="text-white/60 hover:text-luxury-gold transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};