import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurum | Fine Jewelry Boutique",
  description:
    "Discover handcrafted fine jewelry — rings, necklaces, bracelets, and earrings forged from ethically sourced gold, platinum, and precious stones.",
  keywords: ["fine jewelry", "luxury jewelry", "gold rings", "diamond necklaces", "handcrafted jewelry"],
  openGraph: {
    title: "Aurum | Fine Jewelry Boutique",
    description: "Handcrafted fine jewelry for life's most precious moments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#0f0f0f] text-[#f5f0eb] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}