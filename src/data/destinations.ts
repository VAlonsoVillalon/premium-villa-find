import ibizaImage from "@/assets/ibiza-villa.jpg";
import marbellaImage from "@/assets/marbella-villa.jpg";
import mallorcaImage from "@/assets/mallorca-villa.jpg";
import baqueiraImage from "@/assets/baqueira-chalet.jpg";
import andorraImage from "@/assets/andorra-chalet.jpg";

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  properties: string;
  season: "summer" | "winter";
  featured: boolean;
  region: string;
  highlights: string[];
}

export const destinations: Destination[] = [
  // Summer Destinations
  {
    id: "ibiza",
    name: "Ibiza",
    description: "Villas con vistas al mar, fiestas exclusivas, calas escondidas",
    image: ibizaImage,
    properties: "24 villas",
    season: "summer",
    featured: true,
    region: "Islas Baleares",
    highlights: ["Vistas al mar", "Fiestas exclusivas", "Calas escondidas"]
  },
  {
    id: "mallorca",
    name: "Mallorca",
    description: "Deià, Andratx y Pollença - Turismo de lujo mediterráneo",
    image: mallorcaImage,
    properties: "31 villas",
    season: "summer",
    featured: true,
    region: "Islas Baleares",
    highlights: ["Deià exclusivo", "Andratx premium", "Pollença elegante"]
  },
  {
    id: "menorca",
    name: "Menorca",
    description: "Tranquila y familiar, perfecta para un lujo relajado",
    image: mallorcaImage, // Placeholder - same as Mallorca for now
    properties: "15 villas",
    season: "summer",
    featured: false,
    region: "Islas Baleares",
    highlights: ["Ambiente tranquilo", "Lujo familiar", "Privacidad total"]
  },
  {
    id: "formentera",
    name: "Formentera",
    description: "Exclusividad total, difícil acceso, ideal para estancias largas",
    image: ibizaImage, // Placeholder
    properties: "8 villas",
    season: "summer",
    featured: false,
    region: "Islas Baleares",
    highlights: ["Exclusividad total", "Acceso limitado", "Estancias largas"]
  },
  {
    id: "marbella",
    name: "Marbella",
    description: "Golden Mile y Puerto Banús - Villas de lujo, golf y vida social",
    image: marbellaImage,
    properties: "18 villas",
    season: "summer",
    featured: true,
    region: "Costa del Sol",
    highlights: ["Golden Mile", "Puerto Banús", "Golf premium"]
  },
  {
    id: "estepona",
    name: "Estepona / Sotogrande",
    description: "Más tranquilo que Marbella, con alto nivel y privacidad",
    image: marbellaImage, // Placeholder
    properties: "12 villas",
    season: "summer",
    featured: false,
    region: "Costa del Sol",
    highlights: ["Ambiente tranquilo", "Alto nivel", "Máxima privacidad"]
  },
  {
    id: "costa-brava",
    name: "Costa Brava",
    description: "Begur, Calella de Palafrugell, Cadaqués - Mediterráneo refinado",
    image: mallorcaImage, // Placeholder
    properties: "16 villas",
    season: "summer",
    featured: false,
    region: "Cataluña",
    highlights: ["Begur exclusivo", "Calella premium", "Cadaqués artístico"]
  },
  {
    id: "costa-blanca",
    name: "Jávea / Moraira / Altea",
    description: "Zonas de lujo en crecimiento, muy demandadas por europeos",
    image: ibizaImage, // Placeholder
    properties: "14 villas",
    season: "summer",
    featured: false,
    region: "Costa Blanca",
    highlights: ["Crecimiento premium", "Demanda europea", "Villas modernas"]
  },
  {
    id: "tarifa",
    name: "Tarifa / Zahara",
    description: "Paraíso natural con un toque bohemio y villas con encanto",
    image: marbellaImage, // Placeholder
    properties: "9 villas",
    season: "summer",
    featured: false,
    region: "Costa de la Luz",
    highlights: ["Paraíso natural", "Estilo bohemio", "Villas con encanto"]
  },

  // Winter Destinations
  {
    id: "baqueira",
    name: "Baqueira Beret",
    description: "El destino de esquí más exclusivo de España",
    image: baqueiraImage,
    properties: "12 chalets",
    season: "winter",
    featured: true,
    region: "Valle de Arán",
    highlights: ["Esquí exclusivo", "Chalets premium", "Servicios de lujo"]
  },
  {
    id: "andorra",
    name: "Andorra",
    description: "Grandvalira, Ordino - Oferta de lujo creciente con acceso directo a pistas",
    image: andorraImage,
    properties: "8 chalets",
    season: "winter",
    featured: true,
    region: "Pirineos",
    highlights: ["Grandvalira", "Acceso directo", "Servicios top"]
  },
  {
    id: "sierra-nevada",
    name: "Sierra Nevada",
    description: "Villas modernas en Pradollano. Combinación perfecta: sol + nieve",
    image: baqueiraImage, // Placeholder
    properties: "10 chalets",
    season: "winter",
    featured: false,
    region: "Granada",
    highlights: ["Villas modernas", "Sol y nieve", "Pradollano exclusivo"]
  },
  {
    id: "valle-tena",
    name: "Valle de Tena / Formigal",
    description: "Pirineo aragonés - Opción exclusiva fuera de Baqueira",
    image: andorraImage, // Placeholder
    properties: "7 chalets",
    season: "winter",
    featured: false,
    region: "Pirineo Aragonés",
    highlights: ["Pirineo aragonés", "Formigal premium", "Alternativa exclusiva"]
  },
  {
    id: "la-molina",
    name: "La Molina / Masella",
    description: "Pirineos catalanes - Esquí de calidad con acceso desde Barcelona",
    image: baqueiraImage, // Placeholder
    properties: "6 chalets",
    season: "winter",
    featured: false,
    region: "Pirineos Catalanes",
    highlights: ["Cercanía Barcelona", "Esquí de calidad", "Masella conectado"]
  }
];

export const getFeaturedDestinations = () => destinations.filter(dest => dest.featured);
export const getDestinationsBySeason = (season: "summer" | "winter") => 
  destinations.filter(dest => dest.season === season);
export const getSummerDestinations = () => getDestinationsBySeason("summer");
export const getWinterDestinations = () => getDestinationsBySeason("winter");