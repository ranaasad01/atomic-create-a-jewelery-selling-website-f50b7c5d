"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Star, Shield, Truck, RefreshCw, ChevronDown, Mail, Phone, MapPin, Check } from 'lucide-react';
import { brandName, brandTagline, BRAND_GOLD, BRAND_CREAM, BRAND_DARK } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const featuredProducts = [
  {
    id: "p1",
    name: "Soleil Diamond Ring",
    category: "Rings",
    material: "18k Gold",
    price: 2850,
    badge: "Bestseller",
    image: "https://traxnyc.com/cdn/shop/files/DSC9243.jpg?crop=center&height=800&v=1765907288&width=800",
    description: "A radiant round-cut diamond set in hand-polished 18k gold.",
  },
  {
    id: "p2",
    name: "Lumière Pendant",
    category: "Necklaces",
    material: "Platinum",
    price: 3400,
    badge: "New",
    image: "https://ak1.ostkcdn.com/images/products/is/images/direct/97e1b3755cde170b79b530fc61b47f53bf24e595/Lumiere-Brown-Rattan-Pendant-%E2%80%93-Medium-Statement-Light-Fixture-for-Kitchen-Island%2C-or-Living-Room-in-Boho%2C-Japandi-%26-Modern-Style.jpg?imwidth=714&impolicy=medium&carousel=true",
    description: "Cascading pavé diamonds suspended on a fine platinum chain.",
  },
  {
    id: "p3",
    name: "Étoile Cuff",
    category: "Bracelets",
    material: "Rose Gold",
    price: 1950,
    badge: null,
    image: "https://lanamara.com/cdn/shop/files/etoile-cuff-2718083.jpg?crop=center&height=2048&v=1781156166&width=2048",
    description: "A sculptural rose-gold cuff with star-set brilliant diamonds.",
  },
  {
    id: "p4",
    name: "Céleste Drops",
    category: "Earrings",
    material: "18k Gold",
    price: 1680,
    badge: "Limited",
    image: "http://www.oliveandpiper.com/cdn/shop/files/E.05.26.005GLDOS_Celeste-Drops_Gold_OP_LR.jpg?v=1779495298",
    description: "Teardrop sapphires framed in delicate 18k gold filigree.",
  },
];

const collections = [
  {
    id: "c1",
    name: "Eternal Rings",
    count: "24 pieces",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/f50b7c5d-771c-48ba-9787-a2e9a350400c/images/uploaded-1782821103314-r71jau.png?v=1782821104667",
    href: "#collections",
  },
  {
    id: "c2",
    name: "Radiant Necklaces",
    count: "18 pieces",
    image: "https://shapirodiamonds.com/cdn/shop/files/round-diamond-solitaire-mixed-shape-eternity-band-1266786_1080x.jpg?v=1755151791",
    href: "#collections",
  },
  {
    id: "c3",
    name: "Wrist Stories",
    count: "15 pieces",
    image: "http://www.melaniecasey.com/cdn/shop/files/2025_07_WB_Threaded_Necklace_2ct_Radiant_YG_0001.jpg?v=1755804709",
    href: "#collections",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Isabelle Fontaine",
    location: "Paris, France",
    rating: 5,
    text: "The Soleil ring arrived in the most exquisite packaging. Every detail, from the setting to the engraving, was flawless. I wear it every single day.",
    avatar: "https://picsum.photos/seed/ccf84321af2a/800/600",
  },
  {
    id: "t2",
    name: "Charlotte Wren",
    location: "London, UK",
    rating: 5,
    text: "Aurum's craftsmanship is unlike anything I've experienced. The Lumière pendant catches light in a way that genuinely stops people in their tracks.",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQEYMdRFkc_W_w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729578254791?e=2147483647&v=beta&t=vsaupSFZY_WZXOxLDxxb_uWT37KU8XkleCCTamkXIwU",
  },
  {
    id: "t3",
    name: "Sofia Marchetti",
    location: "Milan, Italy",
    rating: 5,
    text: "I gifted the Étoile cuff to my mother for her anniversary. She called it the most beautiful piece she has ever owned. Worth every penny.",
    avatar: "https://static.wikia.nocookie.net/sex-education-netflix/images/8/85/Sofia_S4.png/revision/latest?cb=20240101141957",
  },
];

const values = [
  {
    icon: Shield,
    title: "Ethically Sourced",
    description:
      "Every gemstone and metal is traceable to certified, conflict-free origins. We partner only with suppliers who share our commitment to responsible mining.",
  },
  {
    icon: Star,
    title: "Master Craftsmanship",
    description:
      "Each piece passes through the hands of artisans with decades of experience. No shortcuts, no compromises — only the finest hand-finishing techniques.",
  },
  {
    icon: Truck,
    title: "Complimentary Delivery",
    description:
      "Every order ships in our signature gift box via insured courier, with white-glove delivery available in select cities worldwide.",
  },
  {
    icon: RefreshCw,
    title: "Lifetime Guarantee",
    description:
      "We stand behind every piece we create. Complimentary cleaning, resizing, and repairs for the life of your jewelry — no questions asked.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Select Your Piece",
    description:
      "Browse our curated collections or begin a bespoke commission with our design team.",
  },
  {
    number: "02",
    title: "Personalise",
    description:
      "Choose your metal, gemstone, and engraving. Every detail is yours to define.",
  },
  {
    number: "03",
    title: "Handcrafted",
    description:
      "Our master jewelers bring your vision to life over 4 to 6 weeks of meticulous work.",
  },
  {
    number: "04",
    title: "Delivered",
    description:
      "Your piece arrives in our signature box, insured and ready to be treasured forever.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#c9a96e] font-medium mb-4">
      <span className="w-6 h-px bg-[#c9a96e]" />
      {children}
      <span className="w-6 h-px bg-[#c9a96e]" />
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? "fill-[#c9a96e] text-[#c9a96e]" : "text-white/20"}
          strokeWidth={1}
        />
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const motionProps = (variants: Variants) =>
    shouldReduceMotion ? {} : { variants };

  function handleContactChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="bg-[#0f0f0f] text-[#f5f0eb] overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.magnific.com/free-photo/fine-jewelry-promotion-ears-woman_114579-11505.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Luxury jewelry on dark background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/70 via-[#0f0f0f]/50 to-[#0f0f0f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/60 via-transparent to-[#0f0f0f]/30" />
        </div>

        {/* Radial glow */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,169,110,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={fadeIn}>
              <SectionLabel>Fine Jewelry Since 1987</SectionLabel>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-balance mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Jewelry ThatOutlastsEvery
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-[#f5f0eb]/65 text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-10"
            >
              Handcrafted from ethically sourced gold, platinum, and precious stones. Each Aurum piece is a testament to the art of fine jewelry.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#collections"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#c9a96e] text-[#0f0f0f] text-sm tracking-widest uppercase font-medium rounded-sm hover:bg-[#e0c08a] transition-all duration-300 shadow-[0_0_30px_rgba(201,169,110,0.25)]"
              >
                Explore Collections
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#c9a96e]/40 text-[#f5f0eb]/80 text-sm tracking-widest uppercase font-medium rounded-sm hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
              >
                Our Story
              </a>
            </motion.div>
          </motion.div>

          {/* Right: floating stat cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex flex-col gap-4 flex-shrink-0"
          >
            {[
              { value: "35+", label: "Years of Craft" },
              { value: "12k+", label: "Pieces Created" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="bg-white/5 backdrop-blur-md border border-[#c9a96e]/20 rounded-xl px-8 py-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <p
                  className="text-3xl font-semibold text-[#c9a96e] mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs tracking-widest uppercase text-[#f5f0eb]/50">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f5f0eb]/30"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── COLLECTIONS GRID ─────────────────────────────────────────────── */}
      <section id="collections" className="py-28 md:py-36 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn}>
              <SectionLabel>Our Collections</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-balance"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Discover Your Signature Piece
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-[#f5f0eb]/55 max-w-xl mx-auto leading-relaxed"
            >
              From timeless solitaires to sculptural statement pieces, every
              collection is designed to complement the woman who wears it.
            </motion.p>
          </motion.div>

          {/* Category tiles */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
          >
            {collections.map((col) => (
              <motion.a
                key={col.id}
                href={col.href}
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-1">
                    {col.count}
                  </p>
                  <h3
                    className="text-xl font-semibold text-[#f5f0eb]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {col.name}
                  </h3>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Featured products */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group bg-[#161616] border border-white/5 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-[#c9a96e]/30 hover:shadow-[0_8px_40px_rgba(201,169,110,0.1)] transition-all duration-400"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#c9a96e] text-[#0f0f0f] text-[10px] tracking-widest uppercase font-semibold rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a96e]/80 mb-1">
                    {product.material} · {product.category}
                  </p>
                  <h3
                    className="text-base font-semibold text-[#f5f0eb] mb-1 leading-snug"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#f5f0eb]/45 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#c9a96e] font-semibold text-sm">
                      ${(product.price ?? 0).toLocaleString()}
                    </span>
                    <button className="text-[10px] tracking-widest uppercase text-[#f5f0eb]/50 hover:text-[#c9a96e] transition-colors duration-300 border border-white/10 hover:border-[#c9a96e]/40 px-3 py-1.5 rounded-sm">
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / STORY ────────────────────────────────────────────────── */}
      <section id="about" className="py-28 md:py-36 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                <img
                  src="https://pearls-and-colors.com/_next/image?url=%2Fimages%2Fatelier%2Fjewelry-craftsman-artisan-workshop-hands.jpg&w=3840&q=75"
                  alt="Master jeweler at work in the Aurum atelier"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent" />
              </div>
              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="absolute -bottom-6 -right-6 bg-[#c9a96e] text-[#0f0f0f] rounded-xl p-6 shadow-[0_16px_48px_rgba(201,169,110,0.3)]"
              >
                <p
                  className="text-4xl font-bold leading-none mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  35
                </p>
                <p className="text-xs tracking-widest uppercase font-medium opacity-80">
                  Years of
                  <br />
                  Mastery
                </p>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.div variants={fadeIn}>
                <SectionLabel>Our Story</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-balance mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Born in a Parisian
                <br />
                Atelier, Worn Worldwide
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#f5f0eb]/60 leading-relaxed mb-5"
              >
                Aurum was founded in 1987 by master goldsmith Henri Beaumont in
                a small workshop on the Île Saint-Louis. What began as a
                one-man pursuit of perfection has grown into one of the world's
                most respected fine jewelry houses, while never losing the
                intimacy of its origins.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[#f5f0eb]/60 leading-relaxed mb-10"
              >
                Every piece is still made by hand in our Paris atelier, using
                techniques passed down through generations. We source only
                conflict-free diamonds and Fairmined-certified gold, because
                beauty should never come at someone else's expense.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4 mb-10"
              >
                {[
                  "Conflict-free gemstones",
                  "Fairmined gold certified",
                  "Handcrafted in Paris",
                  "Lifetime guarantee",
                ].map((point) => (
                  <motion.div
                    key={point}
                    variants={fadeInUp}
                    className="flex items-center gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#c9a96e]/15 border border-[#c9a96e]/40 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#c9a96e]" />
                    </span>
                    <span className="text-sm text-[#f5f0eb]/70">{point}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.a
                variants={fadeInUp}
                href="#collections"
                className="group inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#c9a96e] hover:gap-4 transition-all duration-300"
              >
                Explore the Collection
                <ArrowRight size={14} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn}>
              <SectionLabel>Why Aurum</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-balance"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Aurum Promise
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                    i === 0
                      ? "bg-[#c9a96e]/8 border-[#c9a96e]/30 lg:col-span-1"
                      : "bg-[#161616] border-white/5 hover:border-[#c9a96e]/20"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/25 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-[#c9a96e]" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="text-lg font-semibold text-[#f5f0eb] mb-3 leading-snug"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {val.title}
                  </h3>
                  <p className="text-sm text-[#f5f0eb]/50 leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.div variants={fadeIn}>
                <SectionLabel>The Process</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-balance mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                From Concept to
                <br />
                Cherished Heirloom
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#f5f0eb]/55 leading-relaxed mb-12"
              >
                Whether you choose from our collections or commission a bespoke
                creation, every Aurum piece follows the same meticulous
                four-step journey.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-8">
                {processSteps.map((step) => (
                  <motion.div
                    key={step.number}
                    variants={fadeInUp}
                    className="flex items-start gap-5"
                  >
                    <span
                      className="text-3xl font-bold text-[#c9a96e]/25 leading-none flex-shrink-0 w-10"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {step.number}
                    </span>
                    <div>
                      <h4 className="text-base font-semibold text-[#f5f0eb] mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-[#f5f0eb]/50 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                <img
                  src="https://i.ytimg.com/vi/RqUtKd21D1o/hqdefault.jpg"
                  alt="Jewelry crafting process in the Aurum atelier"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent" />
              </div>
              {/* Decorative border */}
              <div className="absolute -inset-3 rounded-2xl border border-[#c9a96e]/10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-28 md:py-36 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn}>
              <SectionLabel>Client Stories</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-balance"
              style={{ fontFamily: "var(--font-playfair)", color: "#f97316", backgroundColor: "#d946ef", padding: "16px", margin: "8px", borderRadius: "24px", fontSize: "32px" }}
            >
              Worn with Love,
              <br />
              Remembered Forever
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                  i === 1
                    ? "bg-[#c9a96e]/8 border-[#c9a96e]/30 md:-mt-4 md:mb-4"
                    : "bg-[#161616] border-white/5 hover:border-[#c9a96e]/20"
                }`}
              >
                <div className="mb-5" style={{ color: "#f59e0b", backgroundColor: "#84cc16" }}>
                  <StarRating rating={t.rating} />“The Soleil ring arrived in the most exquisite packaging. Every detail, from the setting to the engraving, was flawless</div>
                <p className="text-[#f5f0eb]/70 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c9a96e]/30 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#f5f0eb]">{t.name}</p>
                    <p className="text-xs text-[#f5f0eb]/40">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-[#0a0a0a]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,169,110,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 border-y border-[#c9a96e]/10 pointer-events-none" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        >
          <motion.div variants={fadeIn}>
            <SectionLabel>Bespoke Commissions</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Create Something
            <br />
            Entirely Your Own
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-[#f5f0eb]/55 leading-relaxed mb-10 max-w-xl mx-auto"
          >
            Work directly with our master jewelers to design a piece that tells
            your story. From engagement rings to anniversary gifts, we bring
            your vision to life with uncompromising craft.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#c9a96e] text-[#0f0f0f] text-sm tracking-widest uppercase font-medium rounded-sm hover:bg-[#e0c08a] transition-all duration-300 shadow-[0_0_30px_rgba(201,169,110,0.2)]"
            >
              Begin a Commission
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
            <a
              href="#collections"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#c9a96e]/40 text-[#f5f0eb]/80 text-sm tracking-widest uppercase font-medium rounded-sm hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
            >
              Browse Ready-to-Wear
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 md:py-36 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.div variants={fadeIn}>
                <SectionLabel>Get in Touch</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-balance mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                We Would Love
                <br />
                to Hear from You
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#f5f0eb]/55 leading-relaxed mb-10"
              >
                Whether you have a question about a piece, wish to begin a
                bespoke commission, or simply want to visit our Paris atelier,
                our team is here to assist you.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    label: "Atelier",
                    value: "12 Rue de la Paix, 75002 Paris, France",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+33 1 42 60 00 00",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@aurum-jewelry.com",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      variants={fadeInUp}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={16} className="text-[#c9a96e]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs tracking-widest uppercase text-[#f5f0eb]/40 mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm text-[#f5f0eb]/75">{item.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-[#161616] border border-[#c9a96e]/20 rounded-2xl"
                >
                  <div className="w-14 h-14 rounded-full bg-[#c9a96e]/15 border border-[#c9a96e]/40 flex items-center justify-center mb-5">
                    <Check size={24} className="text-[#c9a96e]" />
                  </div>
                  <h3
                    className="text-2xl font-semibold text-[#f5f0eb] mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Message Received
                  </h3>
                  <p className="text-[#f5f0eb]/55 text-sm leading-relaxed max-w-xs">
                    Thank you for reaching out. A member of our team will be in
                    touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  className="bg-[#161616] border border-white/5 rounded-2xl p-8 space-y-5 shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs tracking-widest uppercase text-[#f5f0eb]/50 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#f5f0eb] placeholder-[#f5f0eb]/25 focus:outline-none focus:border-[#c9a96e]/50 focus:ring-1 focus:ring-[#c9a96e]/30 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs tracking-widest uppercase text-[#f5f0eb]/50 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#f5f0eb] placeholder-[#f5f0eb]/25 focus:outline-none focus:border-[#c9a96e]/50 focus:ring-1 focus:ring-[#c9a96e]/30 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs tracking-widest uppercase text-[#f5f0eb]/50 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Tell us about your inquiry or commission..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#f5f0eb] placeholder-[#f5f0eb]/25 focus:outline-none focus:border-[#c9a96e]/50 focus:ring-1 focus:ring-[#c9a96e]/30 transition-all duration-300 resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-[#c9a96e] text-[#0f0f0f] text-sm tracking-widest uppercase font-medium rounded-lg hover:bg-[#e0c08a] transition-all duration-300 shadow-[0_0_24px_rgba(201,169,110,0.2)]"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}