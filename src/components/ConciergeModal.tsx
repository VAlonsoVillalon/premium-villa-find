import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MessageSquare } from "lucide-react";

interface ConciergeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConciergeModal = ({ open, onOpenChange }: ConciergeModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    dates: "",
    guests: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would normally send the data to a backend
    console.log("Concierge request:", formData);
    
    toast({
      title: "Solicitud enviada",
      description: "Nuestro equipo de concierge se pondrá en contacto contigo en las próximas 24 horas.",
    });
    
    onOpenChange(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      destination: "",
      dates: "",
      guests: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">Servicio de Concierge</DialogTitle>
          <DialogDescription>
            Déjanos ayudarte a planificar la experiencia de lujo perfecta. Nuestro equipo de expertos se encargará de todos los detalles.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                placeholder="Tu nombre"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+34 600 000 000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">Destino preferido</Label>
              <Select value={formData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un destino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ibiza">Ibiza</SelectItem>
                  <SelectItem value="mallorca">Mallorca</SelectItem>
                  <SelectItem value="marbella">Marbella</SelectItem>
                  <SelectItem value="baqueira">Baqueira Beret</SelectItem>
                  <SelectItem value="andorra">Andorra</SelectItem>
                  <SelectItem value="otro">Otro destino</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dates">Fechas de estancia</Label>
              <Input
                id="dates"
                value={formData.dates}
                onChange={(e) => handleInputChange("dates", e.target.value)}
                placeholder="Ej: 15-22 Julio 2024"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guests">Número de huéspedes</Label>
              <Select value={formData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Número de huéspedes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 huéspedes</SelectItem>
                  <SelectItem value="4">4 huéspedes</SelectItem>
                  <SelectItem value="6">6 huéspedes</SelectItem>
                  <SelectItem value="8">8 huéspedes</SelectItem>
                  <SelectItem value="10">10 huéspedes</SelectItem>
                  <SelectItem value="12+">12+ huéspedes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Cuéntanos sobre tu experiencia ideal</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Describe qué buscas: tipo de villa, servicios especiales, ocasión especial, presupuesto estimado, etc."
              rows={4}
            />
          </div>

          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Nuestro servicio incluye:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-luxury-gold" />
                Atención 24/7
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-luxury-gold" />
                Mejor precio garantizado
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-luxury-gold" />
                Servicios personalizados
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" variant="luxury" className="flex-1">
              Enviar Solicitud
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};