"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from 'lucide-react';
import { navLinks, navCTA, brandName } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0f0f0f]/95 backdrop-blur-md border-b border-[#c9a96e]/20 shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Aurum home"
            >
              <span className="text-[#c9a96e] text-xs tracking-[0.35em] uppercase font-light select-none">
                ✦
              </span>
              <span
                className="font-playfair text-2xl font-semibold tracking-widest text-[#f5f0eb] group-hover:text-[#c9a96e] transition-colors duration-300"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {brandName}
              </span>
              <span className="text-[#c9a96e] text-xs tracking-[0.35em] uppercase font-light select-none">
                ✦
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="relative text-sm tracking-widest uppercase text-[#f5f0eb]/70 hover:text-[#c9a96e] transition-colors duration-300 group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#c9a96e] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA + Cart */}
            <div className="hidden md:flex items-center gap-4">
              <button
                aria-label="Shopping bag"
                className="relative p-2 text-[#f5f0eb]/70 hover:text-[#c9a96e] transition-colors duration-300"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
              </button>
              <Link
                href={getHref(navCTA.href)}
                onClick={(e) => handleAnchorClick(e, navCTA.href)}
                className="px-6 py-2.5 text-xs tracking-widest uppercase font-medium bg-[#c9a96e] text-[#0f0f0f] rounded-sm hover:bg-[#e0c08a] transition-all duration-300 shadow-[0_0_20px_rgba(201,169,110,0.25)] hover:shadow-[0_0_28px_rgba(201,169,110,0.4)]"
              >
                {navCTA.label}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-3">
              <button
                aria-label="Shopping bag"
                className="p-2 text-[#f5f0eb]/70 hover:text-[#c9a96e] transition-colors duration-300"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="p-2 text-[#f5f0eb]/70 hover:text-[#c9a96e] transition-colors duration-300"
              >
                {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#0f0f0f]/98 backdrop-blur-lg flex flex-col pt-24 px-8"
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => {
                      handleAnchorClick(e, link.href);
                      setIsOpen(false);
                    }}
                    className="block text-3xl font-playfair font-light text-[#f5f0eb]/80 hover:text-[#c9a96e] transition-colors duration-300 py-2 border-b border-white/5"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.4, ease: "easeOut" }}
                className="mt-4"
              >
                <Link
                  href={getHref(navCTA.href)}
                  onClick={(e) => {
                    handleAnchorClick(e, navCTA.href);
                    setIsOpen(false);
                  }}
                  className="inline-block px-8 py-3 text-sm tracking-widest uppercase font-medium bg-[#c9a96e] text-[#0f0f0f] rounded-sm hover:bg-[#e0c08a] transition-all duration-300"
                >
                  {navCTA.label}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}