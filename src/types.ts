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

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  specialty: string;
}
