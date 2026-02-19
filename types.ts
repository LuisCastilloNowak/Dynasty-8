
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  imageUrl: string;
  gallery?: string[];
  description: string;
  type: 'Villa' | 'Manoir' | 'Appartement' | 'Mobile-home' | 'Petite maison' | 'Ferme' | 'Maison de ville' | 'Appartements de Luxe' | 'Entrepôt' | 'Appartement Bord de Mer' | 'Maison Bord de Mer';
}

export interface Interior {
  id: string;
  title: string;
  imageUrl: string;
  gallery?: string[];
  description: string;
  style: 'Meublé' | 'Non Meublé';
}

export interface ContactMessage {
  id: string;
  name: string;
  discord: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  propertyId?: string;
  status: 'nouveau' | 'lu' | 'traité';
}

export interface ContactMessageForm {
  name: string;
  discord: string;
  phone: string;
  message: string;
  propertyId?: string;
}