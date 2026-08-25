import React, { useState, useEffect } from 'react';
import { 
  Star, MapPin, Heart, Quote, Compass, 
  CheckCircle2, Camera, ShieldCheck, ThumbsUp, Sparkles,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [cardsPerPage, setCardsPerPage] = useState(3);

  // Dynamic cards per screen size (Mobile: 1, Tablet: 2, Desktop: 3)
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  // 18 Rajasthan Local Travelers
  const allReviews = [
    {
      name: "Ghanshyam Sharma",
      location: "Mansarovar, Jaipur",
      review: "Booked Ertiga cab for family trip to Khatu Shyam Ji & Jeen Mata. Chauffeur arrived on time, vehicle was neat and driving was very safe.",
      rating: 5,
      category: "spiritual",
      tag: "Khatu Shyam Ji",
      date: "Family Trip",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Pooja Shekhawat",
      location: "Vaishali Nagar, Jaipur",
      review: "Clean AC Dzire taxi for 2-day Jaipur local sightseeing. Driver guided us well at Amer Fort and Jal Mahal without rushing.",
      rating: 5,
      category: "leisure",
      tag: "Jaipur Sightseeing",
      date: "Weekend Tour",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Mahaveer Prasad Jain",
      location: "Fatehpur Road, Sikar",
      review: "We regularly hire cabs from Ishika Travels for Salasar Balaji and Jaipur trips. Fair rates and verified polite drivers.",
      rating: 5,
      category: "outstation",
      tag: "Sikar to Jaipur",
      date: "Frequent User",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Dr. Arvind Menaria",
      location: "Hiran Magri, Udaipur",
      review: "Booked Innova Crysta for Udaipur to Nathdwara and Kumbhalgarh trip. Comfortable seats, chilling AC and honest pricing.",
      rating: 5,
      category: "spiritual",
      tag: "Nathdwara Darshan",
      date: "Family Pilgrimage",
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Suresh Rathore",
      location: "Ratanada, Jodhpur",
      review: "Took outstation cab from Jodhpur to Ramdevra temple. Punctual pickup at 5 AM and zero toll/parking confusion at the end.",
      rating: 5,
      category: "spiritual",
      tag: "Ramdevra Yatra",
      date: "Group Travel",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Sunita Choudhary",
      location: "Talwandi, Kota",
      review: "Travelled from Kota to Jaipur airport with my daughter. Felt completely safe throughout the journey. Very respectful driver.",
      rating: 5,
      category: "outstation",
      tag: "Airport Drop",
      date: "Safe Travel",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Vikram Singh Bhati",
      location: "Sadul Ganj, Bikaner",
      review: "Booked for Bikaner to Khatu Shyam Ji overnight trip. Driver was active, vigilant on highway and car was well maintained.",
      rating: 5,
      tag: "Khatu Shyam Ji",
      category: "spiritual",
      date: "Night Journey",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Anjali Mathur",
      location: "Civil Lines, Ajmer",
      review: "Best taxi package for Pushkar desert safari and Brahma temple. Fast booking confirmation on WhatsApp within 5 minutes.",
      rating: 5,
      category: "leisure",
      tag: "Pushkar Safari",
      date: "Family Outing",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Mukesh Khandelwal",
      location: "Khatipura, Jaipur",
      review: "Took a Tempo Traveller for 12 family members to Ranthambore Safari. Driver handled the forest routes effortlessly.",
      rating: 5,
      category: "leisure",
      tag: "Ranthambore Tour",
      date: "Family Reunion",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Deepak Saini",
      location: "Neem Ka Thana, Sikar",
      review: "Very reasonable tariff compared to local taxi stands. Driver stopped at good hygienic dhabas for tea breaks.",
      rating: 5,
      category: "outstation",
      tag: "Highway Cab",
      date: "Business Trip",
      img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Kavita Agarwal",
      location: "Shastri Nagar, Bhilwara",
      review: "Hired Sedan for Udaipur lake tour & shopping. Driver was polite and assisted senior citizens with temple stairs.",
      rating: 5,
      category: "leisure",
      tag: "Udaipur Tour",
      date: "Holiday Trip",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Rajendra Meena",
      location: "Malviya Nagar, Jaipur",
      review: "Transparent bill with proper receipt for office tour. No hidden charges for parking or night driver allowances.",
      rating: 5,
      category: "outstation",
      tag: "Official Travel",
      date: "Corporate Ride",
      img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Meena Kumawat",
      location: "Moti Doongri, Alwar",
      review: "Took Jaipur to Sariska tiger reserve round trip cab. Smooth driving on mountain turns. Highly recommended service!",
      rating: 5,
      category: "leisure",
      tag: "Sariska Tour",
      date: "Weekend Getaway",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Dharmendra Goyal",
      location: "Gudha Gorji, Jhunjhunu",
      review: "Booked Khatu Shyam Ji + Salasar Balaji one day combined trip. Clean vehicle and driver was devotional and humble.",
      rating: 5,
      category: "spiritual",
      tag: "Khatu-Salasar",
      date: "Devotee Darshan",
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Nirmala Vyas",
      location: "Sojat City, Pali",
      review: "Travelled Jodhpur to Mount Abu with family. The car was spotless and the driver knew all sunset viewpoints.",
      rating: 5,
      category: "leisure",
      tag: "Mount Abu Tour",
      date: "Summer Trip",
      img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Hemant Rawat",
      location: "Panchwati, Udaipur",
      review: "Affordable cab service for Udaipur to Chittorgarh Fort trip. Driver waited patiently while we explored the grand fort.",
      rating: 5,
      category: "leisure",
      tag: "Chittorgarh Fort",
      date: "Heritage Tour",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Kamlesh Sharma",
      location: "Dadi Ka Phatak, Jaipur",
      review: "Booked wedding guest pickup and drops for 3 days across Jaipur hotels. All 4 cabs were on time and clean.",
      rating: 5,
      category: "outstation",
      tag: "Event Cabs",
      date: "Wedding Event",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Priyanka Soni",
      location: "Kishangarh, Ajmer",
      review: "Smooth airport drop from Kishangarh to Jaipur Airport at 4:00 AM. Driver was punctual and very professional.",
      rating: 5,
      category: "outstation",
      tag: "Airport Drop",
      date: "Early Morning",
      img: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=200&auto=format&fit=crop&q=80"
    }
  ];

  const travelerMemories = [
    {
      title: "Hawa Mahal Morning",
      location: "Jaipur",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&auto=format&fit=crop&q=80"
    },
    {
      title: "Lake Pichola Sunset",
      location: "Udaipur",
      image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=500&auto=format&fit=crop&q=80"
    },
    {
      title: "Khatu Shyam Ji Toran Dwar",
      location: "Sikar",
      image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=500&auto=format&fit=crop&q=80"
    },
    {
      title: "Mehrangarh Fort Top",
      location: "Jodhpur",
      image: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=500&auto=format&fit=crop&q=80"
    }
  ];

  const filteredReviews = activeFilter === 'all' 
    ? allReviews 
    : allReviews.filter(r => r.category === activeFilter);

  const maxIndex = Math.max(0, filteredReviews.length - cardsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-12 sm:py-20 bg-[#F8FAFC] relative overflow-hidden font-sans">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-5 w-60 sm:w-96 h-60 sm:h-96 bg-[#34A99D]/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-5 w-60 sm:w-80 h-60 sm:h-80 bg-[#E5CB90]/15 rounded-full blur-[80px] sm:blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 relative">
          <div className="inline-flex items-center space-x-2 bg-[#FFF3C8] border border-[#E5CB90]/50 px-3.5 py-1.5 rounded-full text-[#458393] text-[10px] sm:text-xs font-black tracking-widest uppercase mb-3 shadow-xs">
            <Sparkles size={13} className="text-[#34A99D]" />
            <span>REAL RAJASTHAN EXPERIENCES</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2.5 sm:mb-3 leading-tight">
            Loved By <span className="text-[#34A99D]">Local Guests</span>
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-medium px-2">
            Real feedback from devotees, families, and travelers across Jaipur, Sikar, Udaipur & Jodhpur.
          </p>
        </div>

        {/* ------------------- TRUST HIGHLIGHTS BAR ------------------- */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#34A99D]/20 shadow-xs mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6">
          
          <div className="flex items-center space-x-3 border-b sm:border-b-0 sm:border-r border-slate-100 pb-3 sm:pb-0 sm:justify-center">
            <div className="bg-[#FFF3C8] text-[#a88a42] p-2.5 rounded-2xl flex-shrink-0">
              <Star size={18} fill="currentColor" stroke="none" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-slate-900">4.9 / 5.0 Rating</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium">1,500+ Verified Rides</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 border-b sm:border-b-0 sm:border-r border-slate-100 pb-3 sm:pb-0 sm:justify-center">
            <div className="bg-[#34A99D]/10 text-[#34A99D] p-2.5 rounded-2xl flex-shrink-0">
              <ThumbsUp size={18} />
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-slate-900">99% Recommend</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Safe Local Drivers</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:justify-center">
            <div className="bg-[#458393]/10 text-[#458393] p-2.5 rounded-2xl flex-shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-slate-900">Fixed Clear Pricing</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Zero Extra Charges</p>
            </div>
          </div>

        </div>

        {/* ------------------- FILTER TABS + NAVIGATION (MOBILE FRIENDLY) ------------------- */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          
          {/* Scrollable Filter Chips on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'all', label: 'All (18)' },
              { id: 'spiritual', label: 'Spiritual Yatra' },
              { id: 'leisure', label: 'Sightseeing' },
              { id: 'outstation', label: 'Outstation Cabs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 py-1.5 sm:py-2 rounded-2xl text-[11px] sm:text-xs font-black transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-[#34A99D] text-white shadow-xs scale-102'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#34A99D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
            <span className="text-[11px] font-bold text-slate-400">
              {currentIndex + 1} - {Math.min(currentIndex + cardsPerPage, filteredReviews.length)} of {filteredReviews.length}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevSlide}
                aria-label="Previous Review"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-[#34A99D]/30 text-slate-700 hover:bg-[#34A99D] hover:text-white flex items-center justify-center transition shadow-xs active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={nextSlide}
                aria-label="Next Review"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-[#34A99D]/30 text-slate-700 hover:bg-[#34A99D] hover:text-white flex items-center justify-center transition shadow-xs active:scale-95 cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* ------------------- REVIEW CARDS SLIDER ------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {filteredReviews.slice(currentIndex, currentIndex + cardsPerPage).map((rev, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#34A99D]/25 shadow-xs hover:shadow-lg hover:border-[#34A99D] transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Quote Badge */}
              <div className="absolute top-5 right-5 bg-[#FFF3C8] text-[#458393] p-2 rounded-xl shadow-xs">
                <Quote size={13} className="transform rotate-180" />
              </div>

              <div>
                {/* Category & Status */}
                <div className="flex items-center gap-1.5 mb-3 flex-wrap pr-6">
                  <span className="inline-flex items-center space-x-1 bg-[#FFF3C8]/70 text-[#458393] px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wide border border-[#E5CB90]/40">
                    <CheckCircle2 size={11} className="text-[#34A99D]" />
                    <span>{rev.tag}</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    • {rev.date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-5 font-medium italic min-h-[55px]">
                  "{rev.review}"
                </p>
              </div>

              {/* Profile Bar */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center space-x-3">
                <div className="relative flex-shrink-0">
                  <img 
                    src={rev.img} 
                    alt={rev.name} 
                    className="w-10 h-10 rounded-full object-cover shadow-xs ring-2 ring-[#34A99D]/30" 
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 bg-[#34A99D] text-white rounded-full p-0.5 border-2 border-white">
                    <CheckCircle2 size={7} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-0.5 truncate">
                    {rev.name}
                  </h3>
                  
                  <div className="flex items-center text-[10px] sm:text-[11px] text-slate-500 mb-0.5 font-medium truncate">
                    <MapPin size={10} className="text-[#34A99D] mr-1 shrink-0" />
                    <span className="truncate">{rev.location}</span>
                  </div>

                  <div className="flex text-[#a88a42] space-x-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ------------------- TRAVEL MEMORIES PHOTO STRIP ------------------- */}
        <div className="mb-10 sm:mb-14">
          <div className="text-center max-w-lg mx-auto mb-5 sm:mb-7">
            <div className="inline-flex items-center space-x-1.5 bg-[#FFF3C8] text-[#458393] px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1.5 border border-[#E5CB90]/40">
              <Camera size={12} className="text-[#34A99D]" />
              <span>PHOTO MOMENTS</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900">Snaps From Rajasthan Trips</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {travelerMemories.map((mem, idx) => (
              <div key={idx} className="group relative rounded-2xl sm:rounded-3xl overflow-hidden h-32 sm:h-48 shadow-xs border border-[#34A99D]/20">
                <img 
                  src={mem.image} 
                  alt={mem.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-white">
                  <p className="text-[10px] sm:text-xs font-bold truncate">{mem.title}</p>
                  <p className="text-[8px] sm:text-[10px] text-slate-300 flex items-center gap-1 font-medium truncate">
                    <MapPin size={8} className="text-[#34A99D] shrink-0" /> <span className="truncate">{mem.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM HANDWRITTEN TAGLINE */}
        <div className="text-center relative z-10">
          <div className="inline-block relative">
            <span className="font-serif italic text-[#34A99D] font-bold text-sm sm:text-2xl tracking-wide">
              Trusted by 1,500+ families across Rajasthan. ♡
            </span>
            <svg className="w-full h-2 sm:h-2.5 text-[#E5CB90] absolute -bottom-1.5 left-0" viewBox="0 0 300 12" fill="none">
              <path d="M2 8 C 80 2, 220 12, 298 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;