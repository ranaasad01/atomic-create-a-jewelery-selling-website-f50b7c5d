export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#collections",
};

export const brandName = "Aurum";
export const brandTagline = "Crafted for eternity.";

export type Product = {
  id: string;
  name: string;
  category: "rings" | "necklaces" | "bracelets" | "earrings";
  material: "gold" | "platinum" | "rose-gold" | "silver";
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  details: string[];
  sizes?: string[];
  inStock: boolean;
  featured?: boolean;
  badge?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize?: string;
};

export const BRAND_GOLD = "#c9a96e";
export const BRAND_DARK = "#0f0f0f";
export const BRAND_CREAM = "#f5f0eb";