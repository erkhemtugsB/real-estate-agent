import { Property, Agent } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Obsidian Pavilion',
    location: 'Aspen, Colorado • 6 Bedrooms • 8,400 sq.ft',
    price: '$12,450,000',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000',
    tags: ['Featured', 'Exclusive'],
    size: 'large'
  },
  {
    id: '2',
    title: 'Villa Mariposa',
    location: 'Montecito, CA',
    price: '$8,900,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
    size: 'medium'
  },
  {
    id: '3',
    title: 'Zen Sanctuary',
    location: 'Kyoto Highlands',
    price: '$6,200,000',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1000',
    size: 'small'
  },
  {
    id: '4',
    title: 'The Sky Garden Penthouse',
    location: 'New York City, NY',
    price: '$15,000,000',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000',
    size: 'wide'
  }
];

export const AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Eleanor Vance',
    role: 'Global Strategy Partner',
    specialty: 'GLOBAL STRATEGY PARTNER',
    description: 'Specializing in European heritage estates and historic restoration projects across the Mediterranean.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    name: 'Julian Montgomery',
    role: 'Senior Associate',
    specialty: 'SENIOR ASSOCIATE',
    description: 'Expert in mid-century modern architecture and sustainable luxury developments in coastal California.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    role: 'Urban Loft Specialist',
    specialty: 'URBAN LOFT SPECIALIST',
    description: 'Connecting high-net-worth clients with exclusive off-market penthouses and industrial conversions.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
  }
];
