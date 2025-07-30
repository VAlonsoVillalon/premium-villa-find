import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Destination {
  id: string;
  name: string;
  season: 'summer' | 'winter';
  description: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
}

const AdminDestinations = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchDestinations();
    }
  }, [user, isAdmin]);

  const fetchDestinations = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('destinos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDestinations(data || []);
    } catch (error) {
      toast.error('Error loading destinations');
    } finally {
      setLoadingDestinations(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await (supabase as any)
        .from('destinos')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Destination ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchDestinations();
    } catch (error) {
      toast.error('Error updating destination status');
    }
  };

  const deleteDestination = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;

    try {
      // Check if destination has villas first
      const { data: villas } = await (supabase as any)
        .from('villas')
        .select('id')
        .eq('destination_id', id);

      if (villas && villas.length > 0) {
        toast.error('Cannot delete destination with existing villas');
        return;
      }

      const { error } = await (supabase as any)
        .from('destinos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Destination deleted successfully');
      fetchDestinations();
    } catch (error) {
      toast.error('Error deleting destination');
    }
  };

  if (loading || !user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Destination Management</h1>
            <p className="text-muted-foreground">Manage available destinations</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Destination
          </Button>
        </div>

        {loadingDestinations ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Card key={destination.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {destination.name}
                        {!destination.is_active && (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="capitalize">
                          {destination.season}
                        </Badge>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleStatus(destination.id, destination.is_active)}
                      >
                        {destination.is_active ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteDestination(destination.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {destination.image_url && (
                      <div className="aspect-video rounded-md overflow-hidden bg-muted">
                        <img
                          src={destination.image_url}
                          alt={destination.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {destination.description}
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                      Created {new Date(destination.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDestinations;