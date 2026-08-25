import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X, Compass, Sparkles } from "lucide-react";

import logo  from "../assets/logo.png"
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Tours", path: "/tours" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="w-full font-sans sticky top-0 z-50">
      
      {/* 1. TOP HEADER STRIP */}
      <div className="bg-[#080616] text-slate-300 text-xs py-2 px-4 sm:px-8 flex justify-between items-center border-b border-[#1A1953]">
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="tel:+917891604638"
            className="flex items-center gap-1.5 hover:text-white transition font-medium"
          >
            <Phone size={13} className="text-[#34A99D]" />
            <span>+91 7891604638</span>
          </a>
          <a
            href="mailto:ishika.travels4379@gmail.com"
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition font-medium"
          >
            <Mail size={13} className="text-blue-300" />
            <span>ishika.travels4379@gmail.com</span>
          </a>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] text-blue-200 font-semibold">
          <Sparkles size={12} className="text-[#34A99D]" />
          <span>Top Taxi & Sightseeing Service in Rajasthan</span>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-[#162E93]/20 shadow-xs py-3.5 px-4 sm:px-8 flex justify-between items-center relative z-50">
        
        {/* Brand Logo */}
       <Link to="/" className="flex items-center gap-2 group">
  <img
    src={logo}
    alt="Ishika Tour & Travels"
    className="w-29 h-12 object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
  />


</Link>
        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8 font-extrabold text-xs sm:text-sm text-slate-700">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors py-1 relative ${
                isActive(link.path)
                  ? "text-[#34A99D] font-black"
                  : "hover:text-[#34A99D]"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#34A99D] rounded-full shadow-xs"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Right CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/tours"
            className="hidden sm:inline-flex items-center space-x-1.5 bg-gradient-to-r from-[#458393] to-[#34A99D] hover:from-[#34A99D] hover:to-[#458393] text-white px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-300 shadow-md shadow-[#458393]/30 hover:scale-105"
          >
            <span>Book Now</span>
            <span>🚀</span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-800 hover:text-[#34A99D] transition focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </nav>

      {/* 3. MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#162E93]/20 shadow-xl px-6 py-5 flex flex-col space-y-4 font-black text-sm text-slate-700 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-1.5 transition-colors ${
                isActive(link.path) ? "text-[#34A99D]" : "hover:text-[#34A99D]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/tours"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-gradient-to-r from-[#458393] to-[#162E93] text-white text-center py-3 rounded-2xl font-black text-xs shadow-md shadow-[#458393]/25"
          >
            Book Now 🚀
          </Link>
        </div>
      )}

    </header>
  );
};

export default Navbar;