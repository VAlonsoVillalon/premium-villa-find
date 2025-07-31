import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star, Wifi, Car, Utensils, Users } from "lucide-react";
import { destinations } from "@/data/destinations";

const DestinationDetail = () => {
  const { slug } = useParams();
  const destination = destinations.find(d => d.id === slug);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destino no encontrado</h1>
          <Link to="/explorar-villas">
            <Button variant="luxury">Volver a Destinos</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock villas data for now - later we'll connect to Supabase
  const mockVillas = [
    {
      id: 1,
      name: `Villa Luxury ${destination.name}`,
      description: "Exclusiva villa con vistas panorámicas y todas las comodidades",
      image: destination.image,
      price: "€2,500/noche",
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      amenities: ["Wifi", "Aparcamiento", "Chef", "Piscina privada"]
    },
    {
      id: 2,
      name: `Villa Premium ${destination.name}`,
      description: "Villa de ensueño con diseño moderno y ubicación privilegiada",
      image: destination.image,
      price: "€3,200/noche",
      guests: 10,
      bedrooms: 5,
      bathrooms: 4,
      amenities: ["Wifi", "Aparcamiento", "Servicio completo", "Piscina infinita"]
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi": return <Wifi className="w-4 h-4" />;
      case "aparcamiento": return <Car className="w-4 h-4" />;
      case "chef":
      case "servicio completo": return <Utensils className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.image})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <Link to="/explorar-villas" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a Destinos
            </Link>
            
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 bg-luxury-gold/90 text-white">
                {destination.season === "summer" ? "Verano" : "Invierno"}
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-playfair font-light text-white mb-4">
                {destination.name}
              </h1>
              
              <div className="flex items-center text-white/90 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{destination.region}</span>
              </div>
              
              <p className="text-xl text-white/90 leading-relaxed">
                {destination.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Highlights */}
          <div className="mb-16">
            <h2 className="text-3xl font-playfair mb-8">Lo que hace especial este destino</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {destination.highlights.map((highlight, index) => (
                <div key={index} className="text-center p-6 border border-border/50 rounded-lg">
                  <Star className="w-8 h-8 text-luxury-gold mx-auto mb-4" />
                  <p className="text-muted-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Villas */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-playfair">Villas Disponibles</h2>
              <span className="text-muted-foreground">{mockVillas.length} villas</span>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {mockVillas.map((villa) => (
                <Card key={villa.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={villa.image} 
                      alt={villa.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        {villa.price}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{villa.name}</h3>
                    <p className="text-muted-foreground mb-4">{villa.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {villa.guests} huéspedes
                      </div>
                      <div>
                        {villa.bedrooms} habitaciones
                      </div>
                      <div>
                        {villa.bathrooms} baños
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {villa.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-xs bg-muted rounded-full px-3 py-1">
                          {getAmenityIcon(amenity)}
                          <span className="ml-1">{amenity}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="luxury" className="flex-1">
                        Ver Detalles
                      </Button>
                      <Button variant="luxuryOutline" className="flex-1">
                        Contactar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinationDetail;