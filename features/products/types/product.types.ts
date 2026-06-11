export interface Product {
  id: string;
  slug: string;

  name: string;
  tagline: string;
  description: string;
  logo: string;

  company: Company;

  categories: Category[];

  pricing: Pricing;

  stats: ProductStats;

  media: Media;

  features: Feature[];
  alternatives: ProductPreview[];

  featured?: boolean;
  trending?: boolean;
  createdAt: string;
}

export interface Company {
  name: string;
  logo?: string;
  website?: string;
  foundedYear?: number;
  location?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Pricing {
  type: "free" | "freemium" | "paid" | "custom";
  startingPrice?: number;
}

export interface ProductStats {
  rating: number;
  reviewCount: number;
  monthlyVisits?: number;
  upvotes?: number;
}

export interface Media {
  thumbnail: string;
  images?: string[];
  videoUrl?: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface ProductPreview {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
}