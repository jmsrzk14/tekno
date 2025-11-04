export interface Destination {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  description: string;
}

export interface Itinerary {
  id: number;
  title: string;
  destination: string;
  days: number;
  activities: number;
  rating: number;
  users: number;
  highlights: string[];
}

export interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  destination: string;
  comment: string;
  date: string;
  helpful: number;
}

export interface Cuisine {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: string;
  category: string;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: string;
  amenities: string[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
}