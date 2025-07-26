import { Card } from "@/components/ui/card";
import ibizaImage from "@/assets/ibiza-villa.jpg";
import marbellaImage from "@/assets/marbella-villa.jpg";
import mallorcaImage from "@/assets/mallorca-villa.jpg";
import baqueiraImage from "@/assets/baqueira-chalet.jpg";
import andorraImage from "@/assets/andorra-chalet.jpg";

const destinations = [
  {
    name: "Ibiza",
    description: "Islas Baleares - Villas frente al mar",
    image: ibizaImage,
    properties: "24 villas",
  },
  {
    name: "Marbella",
    description: "Costa del Sol - Lujo mediterráneo",
    image: marbellaImage,
    properties: "18 villas",
  },
  {
    name: "Mallorca",
    description: "Islas Baleares - Elegancia tradicional",
    image: mallorcaImage,
    properties: "31 villas",
  },
  {
    name: "Baqueira",
    description: "Pirineos - Chalets de montaña",
    image: baqueiraImage,
    properties: "12 chalets",
  },
  {
    name: "Andorra",
    description: "Pirineos - Lujo alpino",
    image: andorraImage,
    properties: "8 chalets",
  },
];

export const DestinationsSection = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            Destinos{" "}
            <span className="font-bold bg-gradient-luxury bg-clip-text text-transparent">
              Exclusivos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Seleccionamos cuidadosamente las mejores propiedades en los destinos más codiciados
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card 
              key={destination.name}
              className="group relative overflow-hidden border-0 shadow-luxury hover:shadow-gold transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
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
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                <p className="text-white/90 text-sm">{destination.description}</p>
                
                {/* Hover effect */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-0.5 bg-gradient-luxury rounded-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};