import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, MapPin, TrendingUp, Clock, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data - will be replaced with real data from Supabase
  const stats = {
    totalVillas: 42,
    activeDestinations: 8,
    bookingClicks: 1234,
    recentVillas: 5
  };

  const recentVillas = [
    {
      id: 1,
      name: 'Villa Mediterránea Premium',
      destination: 'Ibiza',
      season: ['verano'],
      visible: true,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Chalet Alpino Deluxe',
      destination: 'Andorra',
      season: ['invierno'],
      visible: true,
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      name: 'Villa Costa Brava Exclusiva',
      destination: 'Costa Brava',
      season: ['verano'],
      visible: false,
      createdAt: '2024-01-13'
    }
  ];

  const StatCard = ({ 
    title, 
    value, 
    description, 
    icon: Icon, 
    trend 
  }: { 
    title: string; 
    value: number; 
    description: string; 
    icon: any; 
    trend?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen general de tu panel de administración
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => navigate('/admin/villas/nueva')}
            className="bg-gradient-luxury text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Villa
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/admin/destinos/nuevo')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Destino
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Villas"
          value={stats.totalVillas}
          description="Propiedades registradas"
          icon={Home}
          trend="+3 este mes"
        />
        <StatCard
          title="Destinos Activos"
          value={stats.activeDestinations}
          description="Ubicaciones disponibles"
          icon={MapPin}
        />
        <StatCard
          title="Clicks de Booking"
          value={stats.bookingClicks}
          description="Este mes"
          icon={TrendingUp}
          trend="+12% vs mes anterior"
        />
        <StatCard
          title="Villas Recientes"
          value={stats.recentVillas}
          description="Últimos 7 días"
          icon={Clock}
        />
      </div>

      {/* Recent Villas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Villas Recientes</CardTitle>
              <CardDescription>
                Las villas agregadas más recientemente
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/admin/villas')}
            >
              Ver todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentVillas.map((villa) => (
              <div
                key={villa.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{villa.name}</h4>
                    <Badge variant={villa.visible ? "default" : "secondary"}>
                      {villa.visible ? (
                        <>
                          <Eye className="w-3 h-3 mr-1" />
                          Visible
                        </>
                      ) : (
                        'Oculta'
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {villa.destination}
                    </span>
                    <span>
                      Temporada: {villa.season.join(', ')}
                    </span>
                    <span>
                      {villa.createdAt}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/admin/villas/${villa.id}`)}
                >
                  Editar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Gestión de Villas
            </CardTitle>
            <CardDescription>
              Administra las propiedades de lujo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/villas')}
            >
              Ver todas las villas
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/villas/nueva')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar nueva villa
            </Button>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Gestión de Destinos
            </CardTitle>
            <CardDescription>
              Organiza las ubicaciones disponibles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/destinos')}
            >
              Ver todos los destinos
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/destinos/nuevo')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar nuevo destino
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;