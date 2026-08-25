import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Headphones,
  User,
  Send,
  Clock,
  ShieldCheck,
  ThumbsUp,
  Plane,
  MessageSquare,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-800 font-sans relative overflow-hidden pb-12">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#34A99D]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-[#E5CB90]/15 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none"></div>

      {/* 1. HERO HEADER SECTION */}
      <div
        className="relative bg-cover bg-center py-16 sm:py-24 md:py-28 px-4 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 25, 35, 0.92), rgba(69, 131, 147, 0.85)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80')`,
        }}
      >
        <div className="hidden lg:block absolute right-20 top-12 text-[#34A99D] opacity-30">
          <Plane size={64} className="transform rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-[#34A99D]/30 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-widest text-[#FFF3C8] uppercase mb-3 sm:mb-4 shadow-sm">
            <Link to="/" className="hover:text-white transition">
              HOME
            </Link>
            <span>&gt;</span>
            <span className="text-white">CONTACT US</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-3 sm:mb-4 text-white leading-tight">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF3C8] via-[#E5CB90] to-[#34A99D]">
              Touch
            </span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed font-medium mx-auto sm:mx-0">
            We are here to help you plan your dream vacation. Reach out to our
            travel experts for instant assistance!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        {/* 2. TOP 4 CONTACT INFO CARDS WITH DYNAMIC ACTION LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-12 sm:mb-16">
          {/* Card 1 - Call */}
          <a
            href="tel:+917891604638"
            className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm sm:shadow-md border border-[#34A99D]/20 flex items-center sm:items-start space-x-3.5 sm:space-x-4 active:scale-95 sm:active:scale-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            <div className="bg-[#FFF3C8] text-[#458393] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl group-hover:bg-[#34A99D] group-hover:text-white transition duration-300 flex-shrink-0">
              <Phone size={20} className="sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                Call Us
              </h3>
              <p className="text-[#34A99D] font-black text-xs sm:text-sm my-0.5 sm:my-1 truncate">
                +91 7891604638
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">
                Click to call directly
              </p>
            </div>
          </a>

          {/* Card 2 - Email */}
          <a
            href="mailto:ishika.travels4379@gmail.com?subject=Travel%20Inquiry%20-%20Ishika%20Tours"
            className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm sm:shadow-md border border-[#34A99D]/20 flex items-center sm:items-start space-x-3.5 sm:space-x-4 active:scale-95 sm:active:scale-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            <div className="bg-[#FFF3C8] text-[#458393] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl group-hover:bg-[#34A99D] group-hover:text-white transition duration-300 flex-shrink-0">
              <Mail size={20} className="sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                Email Us
              </h3>
              <p className="text-[#34A99D] font-bold text-xs sm:text-sm my-0.5 sm:my-1 truncate">
                ishika.travels4379@gmail.com
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">
                Click to send email
              </p>
            </div>
          </a>

          {/* Card 3 - WhatsApp Direct Chat Trigger */}
          <a
            href="https://wa.me/917891604638?text=Hello%20Ishika%20Tour%20%26%20Travels%2C%20I%20want%20to%20inquire%20about%20a%20tour%20package."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm sm:shadow-md border border-[#34A99D]/20 flex items-center sm:items-start space-x-3.5 sm:space-x-4 active:scale-95 sm:active:scale-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            <div className="bg-green-50 text-green-600 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl group-hover:bg-green-600 group-hover:text-white transition duration-300 flex-shrink-0">
              <MessageCircle size={20} className="sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                WhatsApp Us
              </h3>
              <p className="text-green-600 font-black text-xs sm:text-sm my-0.5 sm:my-1 truncate">
                +91 7891604638
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">
                Chat with Admin
              </p>
            </div>
          </a>

          {/* Card 4 - Office Location */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm sm:shadow-md border border-[#34A99D]/20 flex items-center sm:items-start space-x-3.5 sm:space-x-4 group">
            <div className="bg-[#FFF3C8] text-[#458393] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl group-hover:bg-[#34A99D] group-hover:text-white transition duration-300 flex-shrink-0">
              <MapPin size={20} className="sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                Visit Office
              </h3>
              <p className="text-slate-800 font-bold text-xs sm:text-sm my-0.5 sm:my-1 truncate">
                25-h Dharam Nagar <br /> hirapura badarwas Jaipur{" "}
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">
                Ishika Tour & Travels
              </p>
            </div>
          </div>
        </div>

        {/* 3. FORM & MAP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-12 sm:mb-20">
          {/* Left: Contact Form */}
          <div className="lg:col-span-6 bg-white p-5 sm:p-8 md:p-10 rounded-3xl border border-[#34A99D]/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 bg-[#FFF3C8] border border-[#E5CB90]/50 px-3 py-1 rounded-full text-[#458393] text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase mb-3 shadow-xs">
                <Sparkles size={12} className="text-[#34A99D]" />
                <span>GET IN TOUCH</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6 leading-relaxed font-medium">
                Have questions or need help customizing your itinerary? Fill out
                the form below.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-3.5 sm:space-y-4"
              >
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#34A99D] focus:bg-white transition pr-10"
                  />
                  <User
                    size={18}
                    className="absolute right-3.5 top-3.5 text-slate-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#34A99D] focus:bg-white transition pr-10"
                    />
                    <Mail
                      size={18}
                      className="absolute right-3.5 top-3.5 text-slate-400"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#34A99D] focus:bg-white transition pr-10"
                    />
                    <Phone
                      size={18}
                      className="absolute right-3.5 top-3.5 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-700 font-medium focus:outline-none focus:border-[#34A99D] focus:bg-white transition"
                  >
                    <option value="">Select Subject</option>
                    <option value="booking">Tour Booking Inquiry</option>
                    <option value="custom">Custom Package Request</option>
                    <option value="general">General Support</option>
                  </select>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us about your trip plans or requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl p-4 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#34A99D] focus:bg-white transition"
                  ></textarea>
                  <MessageSquare
                    size={18}
                    className="absolute right-3.5 top-3.5 text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#458393] hover:bg-[#34A99D] active:scale-95 text-white font-extrabold px-8 py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-md cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-6 min-h-[300px] sm:min-h-[420px] rounded-3xl overflow-hidden shadow-sm border border-[#34A99D]/20 relative">
            <iframe
              title="Jaipur Location Map"
              src="https://maps.google.com/maps?q=25-h%20Dharam%20Nagar%20hirapura%20badarwas%20Jaipur%20near%20Siddhi%20homes%20302020&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* 4. WHY CONNECT WITH US */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#FFF3C8] border border-[#E5CB90]/50 px-3.5 py-1.5 rounded-full text-[#458393] text-[10px] sm:text-xs font-extrabold tracking-widest uppercase mb-3 shadow-xs">
            <Sparkles size={14} className="text-[#34A99D]" />
            <span>WHY CONNECT WITH US</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
            We're Here to Make Your Journey{" "}
            <span className="text-[#34A99D]">Amazing!</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#34A99D]/20 text-center flex flex-col items-center">
              <div className="bg-[#FFF3C8] text-[#458393] w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3">
                <Clock size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-1">
                Quick Response
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                Prompt support always.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#34A99D]/20 text-center flex flex-col items-center">
              <div className="bg-[#FFF3C8] text-[#458393] w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3">
                <User size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-1">
                Travel Experts
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                Tailored itineraries.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#34A99D]/20 text-center flex flex-col items-center">
              <div className="bg-[#FFF3C8] text-[#458393] w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3">
                <ShieldCheck size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-1">
                Trusted Service
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                Zero hidden charges.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#34A99D]/20 text-center flex flex-col items-center">
              <div className="bg-[#FFF3C8] text-[#458393] w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3">
                <ThumbsUp size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-1">
                Top Choice
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                Happy travelers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;