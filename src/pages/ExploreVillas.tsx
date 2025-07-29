import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getSummerDestinations, 
  getWinterDestinations, 
  type Destination 
} from "@/data/destinations";
import { Sun, Snowflake, MapPin, Home, ArrowRight } from "lucide-react";

const DestinationCard = ({ destination }: { destination: Destination }) => (
  <Card className="group relative overflow-hidden border-0 shadow-luxury hover:shadow-gold transition-all duration-500 cursor-pointer">
    {/* Image */}
    <div className="relative h-64 overflow-hidden">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
      {/* Properties count */}
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
        {destination.properties}
      </div>

      {/* Season badge */}
      <div className="absolute top-4 left-4">
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
          {destination.season === "summer" ? (
            <><Sun className="w-3 h-3 mr-1" /> Verano</>
          ) : (
            <><Snowflake className="w-3 h-3 mr-1" /> Invierno</>
          )}
        </Badge>
      </div>
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-luxury-gold" />
        <span className="text-luxury-gold text-sm font-medium">{destination.region}</span>
      </div>
      
      <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
      <p className="text-white/90 text-sm mb-3">{destination.description}</p>
      
      {/* Highlights */}
      <div className="flex flex-wrap gap-1 mb-4">
        {destination.highlights.slice(0, 2).map((highlight, index) => (
          <span 
            key={index}
            className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full"
          >
            {highlight}
          </span>
        ))}
      </div>

      {/* Hover effect */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button variant="luxuryOutline" size="sm" className="text-white border-white/50 hover:bg-white hover:text-primary">
          Ver Villas <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  </Card>
);

const ExploreVillas = () => {
  const summerDestinations = getSummerDestinations();
  const winterDestinations = getWinterDestinations();

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-gradient-to-br from-primary via-primary to-luxury-gold-dark overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-luxury-gold/10 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
            Explora Nuestras{" "}
            <span className="font-bold">
              Villas de Lujo
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Descubre propiedades exclusivas en los destinos más codiciados de España. 
            Desde costas mediterráneas hasta chalets alpinos.
          </p>
          
          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">200+</div>
              <div className="text-white/80 text-sm">Propiedades Exclusivas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">15</div>
              <div className="text-white/80 text-sm">Destinos Premium</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-white/80 text-sm">Servicio Concierge</div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations by Season */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="summer" className="w-full">
            {/* Tabs Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
                Destinos por{" "}
                <span className="font-bold bg-gradient-luxury bg-clip-text text-transparent">
                  Temporada
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Selecciona la temporada que prefieras para descubrir nuestras villas exclusivas
              </p>
              
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-14">
                <TabsTrigger 
                  value="summer" 
                  className="flex items-center gap-2 text-base"
                >
                  <Sun className="w-4 h-4" />
                  Verano
                </TabsTrigger>
                <TabsTrigger 
                  value="winter" 
                  className="flex items-center gap-2 text-base"
                >
                  <Snowflake className="w-4 h-4" />
                  Invierno
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Summer Destinations */}
            <TabsContent value="summer" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Temporada de Verano
                </h3>
                <p className="text-muted-foreground">
                  Mayo - Septiembre • Costa, islas y zonas exclusivas
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {summerDestinations.map((destination, index) => (
                  <div 
                    key={destination.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <DestinationCard destination={destination} />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Winter Destinations */}
            <TabsContent value="winter" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Temporada de Invierno
                </h3>
                <p className="text-muted-foreground">
                  Diciembre - Marzo • Esquí y montaña
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {winterDestinations.map((destination, index) => (
                  <div 
                    key={destination.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <DestinationCard destination={destination} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary to-luxury-gold-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Nuestro equipo de concierge puede ayudarte a encontrar la villa perfecta
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="min-w-[200px]">
              <Home className="w-5 h-5 mr-2" />
              Solicitud Personalizada
            </Button>
            <Button variant="luxuryOutline" size="lg" className="min-w-[200px] border-white text-white hover:bg-white hover:text-primary">
              Contactar Concierge
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExploreVillas;