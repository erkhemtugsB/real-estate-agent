export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  details?: string;
  image: string;
  tags?: string[];
  size: 'large' | 'medium' | 'small' | 'wide';
}

export interface Estate {
  id: string;
  title: string;
  description?: string | null;
  location?: string | null;
  price?: number | null;
  area?: number | null;
  bed?: number | null;
  bath?: number | null;
  images: string[];
  created_at?: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  specialty: string;
}
