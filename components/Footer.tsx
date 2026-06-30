"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, Mail } from 'lucide-react';
import { navLinks, brandName, brandTagline } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerCollections = [
  { label: "Rings", href: "#collections" },
  { label: "Necklaces", href: "#collections" },
  { label: "Bracelets", href: "#collections" },
  { label: "Earrings", href: "#collections" },
];

const footerInfo = [
  { label: "About Aurum", href: "#about" },
  { label: "Craftsmanship", href: "#about" },
  { label: "Sustainability", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Mail, label: "Email", href: "#contact" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer className="bg-[#080808] border-t border-[#c9a96e]/15">
      {/* Main footer content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-6 lg:px-8 py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#c9a96e] text-xs">✦</span>
              <span
                className="font-playfair text-2xl font-semibold tracking-widest text-[#f5f0eb]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {brandName}
              </span>
              <span className="text-[#c9a96e] text-xs">✦</span>
            </div>
            <p className="text-[#f5f0eb]/50 text-sm leading-relaxed mb-6 max-w-xs">
              {brandTagline} Fine jewelry handcrafted from ethically sourced
              materials, designed to be worn for generations.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={getHref(href)}
                  onClick={(e) => handleAnchorClick(e, href)}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-[#c9a96e]/25 flex items-center justify-center text-[#f5f0eb]/50 hover:text-[#c9a96e] hover:border-[#c9a96e]/60 transition-all duration-300"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Collections */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-5 font-medium">
              Collections
            </h4>
            <ul className="space-y-3">
              {footerCollections.map((item) => (
                <li key={item.label}>
                  <Link
                    href={getHref(item.href)}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-sm text-[#f5f0eb]/55 hover:text-[#c9a96e] transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-5 font-medium">
              Our Story
            </h4>
            <ul className="space-y-3">
              {footerInfo.map((item) => (
                <li key={item.label}>
                  <Link
                    href={getHref(item.href)}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-sm text-[#f5f0eb]/55 hover:text-[#c9a96e] transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-5 font-medium">
              Stay in Touch
            </h4>
            <p className="text-sm text-[#f5f0eb]/50 leading-relaxed mb-4">
              New collections, private previews, and stories from the atelier.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 bg-white/5 border border-[#c9a96e]/20 rounded-sm text-sm text-[#f5f0eb] placeholder-[#f5f0eb]/30 focus:outline-none focus:border-[#c9a96e]/60 transition-colors duration-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-[#c9a96e]/15 border border-[#c9a96e]/40 text-[#c9a96e] text-xs tracking-widest uppercase rounded-sm hover:bg-[#c9a96e]/25 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-[#c9a96e]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#f5f0eb]/30 tracking-wide">
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Shipping Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs text-[#f5f0eb]/30 hover:text-[#c9a96e]/70 transition-colors duration-300"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}