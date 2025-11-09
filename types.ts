export interface Property {
  id: number;
  images: string[];
  price: number;
  name: string;
  address: string;
  beds: number;
  baths: number;
  area: number; // in sqft
  description: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name:string;
  role: string;
  image: string;
}

export interface User {
  name: string;
  email: string;
  role?: 'admin' | 'user';
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
