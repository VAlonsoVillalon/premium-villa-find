-- Panel de Administración - Estructura de Base de Datos
-- Ejecuta estos comandos en el SQL Editor de Supabase

-- 1. Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create user roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable Row Level Security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create destinos table
CREATE TABLE public.destinos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  temporada TEXT NOT NULL CHECK (temporada IN ('verano', 'invierno')),
  descripcion TEXT,
  imagen TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.destinos ENABLE ROW LEVEL SECURITY;

-- 5. Create villas table
CREATE TABLE public.villas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  destino_id UUID REFERENCES public.destinos(id) ON DELETE SET NULL,
  descripcion_corta TEXT,
  descripcion_larga TEXT,
  imagenes TEXT[], -- Array of image paths in Supabase Storage
  temporada TEXT[] DEFAULT '{}', -- Array like ['verano', 'invierno']
  enlace_booking TEXT,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.villas ENABLE ROW LEVEL SECURITY;

-- 6. Create function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 7. Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_destinos_updated_at
  BEFORE UPDATE ON public.destinos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_villas_updated_at
  BEFORE UPDATE ON public.villas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

-- 10. Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 11. RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- 12. RLS Policies for user_roles
CREATE POLICY "Admins can view all user roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage user roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 13. RLS Policies for destinos
CREATE POLICY "Anyone can view active destinos"
  ON public.destinos
  FOR SELECT
  USING (activo = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage destinos"
  ON public.destinos
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 14. RLS Policies for villas
CREATE POLICY "Anyone can view visible villas"
  ON public.villas
  FOR SELECT
  USING (visible = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage villas"
  ON public.villas
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 15. Create storage bucket for villa images
INSERT INTO storage.buckets (id, name, public) VALUES ('villa-images', 'villa-images', true);

-- 16. Storage policies for villa images
CREATE POLICY "Anyone can view villa images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'villa-images');

CREATE POLICY "Admins can upload villa images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'villa-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update villa images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'villa-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete villa images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'villa-images' AND public.has_role(auth.uid(), 'admin'));

-- 17. Insert some sample destinos based on existing data
INSERT INTO public.destinos (nombre, temporada, descripcion, activo) VALUES
('Ibiza', 'verano', 'La isla blanca con las mejores villas de lujo', true),
('Mallorca', 'verano', 'Paraíso mediterráneo con propiedades exclusivas', true),
('Marbella', 'verano', 'Costa del Sol, glamour y exclusividad', true),
('Andorra', 'invierno', 'Montañas pirenaicas con chalets de lujo', true),
('Baqueira', 'invierno', 'Estación de esquí premium en el Valle de Arán', true);

-- 18. IMPORTANTE: Crear un usuario administrador
-- Después de ejecutar todo lo anterior, registra un usuario con email que contenga "admin"
-- Por ejemplo: admin@villasluxury.com
-- Luego ejecuta este comando para darle rol de admin:

-- INSERT INTO public.user_roles (user_id, role) 
-- VALUES ('TU_USER_ID_AQUI', 'admin');

-- Para obtener el user_id, ejecuta:
-- SELECT id, email FROM auth.users WHERE email = 'admin@villasluxury.com';