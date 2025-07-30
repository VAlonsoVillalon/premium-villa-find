import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Copy, 
  Trash2, 
  Eye, 
  EyeOff,
  MapPin,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VillaList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - will be replaced with Supabase data
  const villas = [
    {
      id: '1',
      nombre: 'Villa Mediterránea Premium',
      slug: 'villa-mediterranea-premium',
      destino: 'Ibiza',
      descripcion_corta: 'Villa exclusiva con vistas al mar',
      temporada: ['verano'],
      visible: true,
      imagenes: ['villa1.jpg'],
      enlace_booking: 'https://booking.com/villa1',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      nombre: 'Chalet Alpino Deluxe',
      slug: 'chalet-alpino-deluxe',
      destino: 'Andorra',
      descripcion_corta: 'Chalet de lujo en las montañas',
      temporada: ['invierno'],
      visible: true,
      imagenes: ['chalet1.jpg', 'chalet2.jpg'],
      enlace_booking: 'https://booking.com/chalet1',
      created_at: '2024-01-14'
    },
    {
      id: '3',
      nombre: 'Villa Costa Brava Exclusiva',
      slug: 'villa-costa-brava-exclusiva',
      destino: 'Costa Brava',
      descripcion_corta: 'Propiedad frente al mar',
      temporada: ['verano'],
      visible: false,
      imagenes: ['villa2.jpg'],
      enlace_booking: '',
      created_at: '2024-01-13'
    },
    {
      id: '4',
      nombre: 'Penthouse Marbella Gold',
      slug: 'penthouse-marbella-gold',
      destino: 'Marbella',
      descripcion_corta: 'Penthouse de lujo en Puerto Banús',
      temporada: ['verano', 'invierno'],
      visible: true,
      imagenes: ['penthouse1.jpg', 'penthouse2.jpg', 'penthouse3.jpg'],
      enlace_booking: 'https://booking.com/penthouse1',
      created_at: '2024-01-12'
    }
  ];

  const filteredVillas = villas.filter(villa =>
    villa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    villa.destino.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeasonBadgeVariant = (season: string) => {
    return season === 'verano' ? 'default' : 'secondary';
  };

  const handleDuplicate = (villa: any) => {
    console.log('Duplicating villa:', villa.id);
    // TODO: Implement duplication logic
  };

  const handleDelete = (villa: any) => {
    console.log('Deleting villa:', villa.id);
    // TODO: Implement delete logic with confirmation
  };

  const toggleVisibility = (villa: any) => {
    console.log('Toggling visibility for villa:', villa.id);
    // TODO: Implement visibility toggle
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Villas</h1>
          <p className="text-muted-foreground">
            Administra las propiedades de lujo del catálogo
          </p>
        </div>
        
        <Button 
          onClick={() => navigate('/admin/villas/nueva')}
          className="bg-gradient-luxury text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Villa
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar villas por nombre o destino..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Villas Table */}
      <Card>
        <CardHeader>
          <CardTitle>Villas ({filteredVillas.length})</CardTitle>
          <CardDescription>
            Lista completa de todas las villas registradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Villa</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Temporada</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Imágenes</TableHead>
                  <TableHead>Booking</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVillas.map((villa) => (
                  <TableRow key={villa.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{villa.nombre}</div>
                        <div className="text-sm text-muted-foreground">
                          {villa.descripcion_corta}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          /{villa.slug}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {villa.destino}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex gap-1">
                        {villa.temporada.map((season) => (
                          <Badge 
                            key={season} 
                            variant={getSeasonBadgeVariant(season)}
                            className="text-xs"
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            {season}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant={villa.visible ? "default" : "secondary"}>
                        {villa.visible ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Visible
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Oculta
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {villa.imagenes.length} imagen{villa.imagenes.length !== 1 ? 'es' : ''}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      {villa.enlace_booking ? (
                        <Badge variant="outline" className="text-green-600">
                          Configurado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600">
                          Pendiente
                        </Badge>
                      )}
                    </TableCell>
                    
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem 
                            onClick={() => navigate(`/admin/villas/${villa.id}`)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem onClick={() => handleDuplicate(villa)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem onClick={() => toggleVisibility(villa)}>
                            {villa.visible ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Ocultar
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                Mostrar
                              </>
                            )}
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            onClick={() => handleDelete(villa)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredVillas.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm ? 'No se encontraron villas que coincidan con tu búsqueda.' : 'No hay villas registradas.'}
              </p>
              {!searchTerm && (
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/admin/villas/nueva')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear primera villa
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VillaList;