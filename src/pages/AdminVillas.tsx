import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Copy, Trash2, Eye, EyeOff, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Villa {
  id: string;
  name: string;
  slug: string;
  destination_id: string;
  destinos: {
    name: string;
  };
  season_summer: boolean;
  season_winter: boolean;
  short_description: string;
  images: string[];
  booking_link: string;
  is_visible: boolean;
  created_at: string;
}

const AdminVillas = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loadingVillas, setLoadingVillas] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchVillas();
    }
  }, [user, isAdmin]);

  const fetchVillas = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('villas')
        .select(`
          *,
          destinos:destination_id (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVillas(data || []);
    } catch (error) {
      toast.error('Error loading villas');
    } finally {
      setLoadingVillas(false);
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      const { error } = await (supabase as any)
        .from('villas')
        .update({ is_visible: !currentVisibility })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Villa ${!currentVisibility ? 'shown' : 'hidden'}`);
      fetchVillas();
    } catch (error) {
      toast.error('Error updating villa visibility');
    }
  };

  const deleteVilla = async (id: string) => {
    if (!confirm('Are you sure you want to delete this villa?')) return;

    try {
      const { error } = await (supabase as any)
        .from('villas')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Villa deleted successfully');
      fetchVillas();
    } catch (error) {
      toast.error('Error deleting villa');
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
            <h1 className="text-3xl font-bold">Villa Management</h1>
            <p className="text-muted-foreground">Manage your luxury villa listings</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Villa
          </Button>
        </div>

        {loadingVillas ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : villas.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <div className="text-center space-y-2">
                <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-medium">No villas found</h3>
                <p className="text-muted-foreground">Get started by adding your first villa</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Villa
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {villas.map((villa) => (
              <Card key={villa.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {villa.name}
                        {!villa.is_visible && (
                          <Badge variant="secondary">Hidden</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {villa.destinos?.name} • {villa.slug}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility(villa.id, villa.is_visible)}
                      >
                        {villa.is_visible ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteVilla(villa.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {villa.short_description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      {villa.season_summer && (
                        <Badge variant="outline">Summer</Badge>
                      )}
                      {villa.season_winter && (
                        <Badge variant="outline">Winter</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{villa.images?.length || 0} images</span>
                      <span>Created {new Date(villa.created_at).toLocaleDateString()}</span>
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

export default AdminVillas;