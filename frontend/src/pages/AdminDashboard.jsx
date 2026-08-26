import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Compass,
  CalendarCheck,
  PlusCircle,
  Trash2,
  X,
  Users,
  Upload,
  Lock,
  LogOut,
  Heart,
  ExternalLink,
  Filter,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("adminActiveTab") || "bookings";
  });

  const [selectedAdminCity, setSelectedAdminCity] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    duration: "",
    city: "Jaipur",
    image: "",
    description: "",
    inclusions: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("adminActiveTab", tab);
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      
      const res = await axios.post("https://ishikatours-1.onrender.com/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        setIsAuthenticated(true);
        fetchData();
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || "Invalid Credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminActiveTab");
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    try {
      const tourRes = await axios.get("https://ishikatours-1.onrender.com/api/tours");
      const bookingRes = await axios.get("https://ishikatours-1.onrender.com/api/bookings");
      setTours(tourRes.data);
      setBookings(bookingRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`https://ishikatours-1.onrender.com/api/bookings/${id}/status`, {
        status,
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTour = async (id) => {
    if (window.confirm("Are you sure you want to delete this tour package?")) {
      try {
        await axios.delete(`https://ishikatours-1.onrender.com/api/tours/${id}`);
        fetchData();
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  const handleAddTourSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Please select or paste tour image");

    try {
      const payload = {
        ...formData,
        inclusions: formData.inclusions
          ? formData.inclusions.split(",").map((item) => item.trim())
          : [],
      };
      await axios.post("https://ishikatours-1.onrender.com/api/tours", payload);
      alert("Tour package created successfully!");
      setShowAddModal(false);
      setFormData({
        title: "",
        location: "",
        duration: "",
        city: "Jaipur",
        image: "",
        description: "",
        inclusions: "",
      });
      fetchData();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const filteredAdminTours =
    selectedAdminCity === "All"
      ? tours
      : tours.filter((t) => (t.city || "Jaipur") === selectedAdminCity);

  // 1. ADMIN LOGIN VIEW
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-between font-sans px-4">
        <header className="py-4 border-b border-white/10 flex justify-between items-center max-w-5xl w-full mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#34A99D] flex items-center justify-center text-white font-black text-sm">
              I
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-white tracking-wide">
              Ishika Travels
            </span>
          </div>
          <Link
            to="/"
            className="text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1 transition"
          >
            <span>View Site</span>
            <ExternalLink size={12} />
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center py-12 sm:py-16">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 max-w-sm w-full shadow-[0_25px_80px_rgba(0,0,0,0.28)] border border-white/60">
            <div className="w-12 h-12 bg-[#FFF3C8]/20 text-[#34A99D] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Lock size={22} />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-center text-[#458393] mb-1">
              Admin Portal
            </h2>
            <p className="text-[11px] text-center text-slate-400 mb-5 font-semibold">
              Enter credentials to unlock dashboard
            </p>

            {loginError && (
              <div className="bg-red-50 text-red-600 text-[11px] p-2.5 rounded-xl mb-4 font-semibold text-center border border-red-200">
                {loginError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@ishikatravels.com"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:border-[#34A99D]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:border-[#34A99D]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#458393] hover:bg-[#34A99D] text-white font-extrabold py-3 rounded-xl text-xs transition cursor-pointer shadow-md"
              >
                Sign In 🚀
              </button>
            </form>
          </div>
        </div>

        <footer className="py-4 text-center border-t border-slate-900/80 flex flex-col items-center gap-2">
          <p className="text-[11px] text-slate-500 font-medium">
            Ishika Tour & Travels • Admin Control Gateway
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Crafted with</span>
            <Heart size={12} className="text-red-500 fill-red-500 inline" />
            <span>by</span>
            <a
              href="https://rp-iota-olive.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-[#34A99D] font-bold underline decoration-dotted hover:text-[#FFF3C8] transition"
            >
              Developer Portfolio
            </a>
          </div>
        </footer>
      </div>
    );
  }

  // 2. RESPONSIVE LOGGED IN DASHBOARD
  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col justify-between font-sans">
      <div>
        {/* RESPONSIVE TOP APPBAR */}
        <header className="bg-[#0f172a]/95 backdrop-blur-xl text-white px-4 sm:px-6 lg:px-8 py-3.5 border-b border-white/10 flex justify-between items-center sticky top-0 z-40 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden flex items-center justify-center bg-white">
              <img
                src={logo}
                alt="Ishika"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="font-black text-xs sm:text-sm tracking-wide">
              Ishika Admin
            </span>

            <span className="bg-[#FFF3C8] text-[#458393] text-[9px] font-black px-1.5 py-0.5 rounded uppercase border border-[#FFF3C8]/50">
              Active
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white bg-white/5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border border-white/10 transition"
            >
              <span>Site</span>
              <ExternalLink size={12} />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-400/30 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer"
            >
              <LogOut size={12} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* MAIN BODY WRAPPER */}
        <div className="flex flex-1 min-h-0">
          {/* Desktop Sidebar (Hidden on Mobile) */}
          <aside className="w-64 xl:w-72 bg-[#0f172a] text-slate-300 p-5 lg:p-6 hidden md:flex flex-col justify-between border-r border-white/10 min-h-[calc(100vh-53px)] sticky top-[53px] h-[calc(100vh-53px)]">
            <nav className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 px-3 mb-1">
                Menu
              </span>
              <button
                onClick={() => handleTabChange("bookings")}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs w-full text-left transition cursor-pointer ${
                  activeTab === "bookings"
                    ? "bg-[#34A99D] text-white shadow-md"
                    : "hover:bg-white/5 text-slate-400"
                }`}
              >
                <CalendarCheck size={16} /> Leads ({bookings.length})
              </button>
              <button
                onClick={() => handleTabChange("tours")}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs w-full text-left transition cursor-pointer ${
                  activeTab === "tours"
                    ? "bg-[#34A99D] text-white shadow-md"
                    : "hover:bg-white/5 text-slate-400"
                }`}
              >
                <Compass size={16} /> City Tours ({tours.length})
              </button>
            </nav>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10/60 text-[11px] text-slate-400">
              <p className="font-bold text-slate-300">Admin Account</p>
              <p className="truncate text-[10px] text-slate-400">
                admin@ishikatravels.com
              </p>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1500px] w-full mx-auto">
            {/* Mobile View Tab Selector Pills */}
            <div className="flex md:hidden gap-1.5 mb-4 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={() => handleTabChange("bookings")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${activeTab === "bookings" ? "bg-[#34A99D] text-white shadow-sm" : "text-slate-600"}`}
              >
                Customer Leads ({bookings.length})
              </button>
              <button
                onClick={() => handleTabChange("tours")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${activeTab === "tours" ? "bg-[#34A99D] text-white shadow-sm" : "text-slate-600"}`}
              >
                Tour Packages ({tours.length})
              </button>
            </div>

            {/* Header & Add Button */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:block w-1 h-8 rounded-full bg-gradient-to-b from-[#34A99D] to-[#FFF3C8]"></span>
                  <h1 className="text-base sm:text-xl font-black text-[#458393]">
                    {activeTab === "bookings"
                      ? "Customer Quote Inquiries"
                      : "Manage Destination Tours"}
                  </h1>
                  <p className="text-[11px] text-slate-500 hidden sm:block ml-4">
                    Real-time database sync for Ishika Travels
                  </p>
                </div>
              </div>

              {activeTab === "tours" && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#34A99D] hover:bg-[#2c8d83] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <PlusCircle size={14} /> <span>Add Tour</span>
                </button>
              )}
            </div>

            {/* TAB 1: BOOKINGS / LEADS */}
            {activeTab === "bookings" && (
              <div>
                {bookings.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
                    <p className="text-slate-400 text-xs font-medium">
                      No booking inquiries received yet.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* A. MOBILE VIEW: TOUCH CARDS (NO HORIZONTAL OVERFLOW) */}
                    <div className="grid grid-cols-1 gap-3 sm:hidden">
                      {bookings.map((b) => (
                        <div
                          key={b._id}
                          className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-[0_8px_30px_rgba(23,26,43,0.06)] space-y-3"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h3 className="font-black text-[#458393] text-xs">
                                {b.tourName}
                              </h3>
                              <p className="text-[11px] font-bold text-slate-600 mt-0.5">
                                {b.customerName}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                                b.status === "Confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : b.status === "Cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 bg-[#f8fafc] p-2.5 rounded-xl border border-[#f1f5f9]">
                            <div className="flex items-center gap-1 truncate">
                              <Phone
                                size={11}
                                className="text-[#34A99D] shrink-0"
                              />
                              <span className="font-bold">{b.phone}</span>
                            </div>
                            <div className="flex items-center gap-1 truncate">
                              <Calendar
                                size={11}
                                className="text-[#34A99D] shrink-0"
                              />
                              <span>{b.travelDate}</span>
                            </div>
                            <div className="flex items-center gap-1 truncate col-span-2">
                              <Mail
                                size={11}
                                className="text-[#34A99D] shrink-0"
                              />
                              <span className="truncate">{b.email}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-[#f1f5f9]">
                            <span className="inline-flex items-center gap-1 bg-[#FFF3C8] text-[#458393] px-2 py-0.5 rounded text-[10px] font-black">
                              <Users size={10} /> {b.guests || 1} Person
                              {(b.guests || 1) > 1 ? "s" : ""}
                            </span>

                            <div className="flex gap-1.5">
                              {b.status !== "Confirmed" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(b._id, "Confirmed")
                                  }
                                  className="bg-green-600 text-white text-[10px] px-3 py-1 rounded-lg font-bold"
                                >
                                  Confirm
                                </button>
                              )}
                              {b.status !== "Cancelled" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(b._id, "Cancelled")
                                  }
                                  className="bg-[#f1f5f9] text-slate-600 text-[10px] px-3 py-1 rounded-lg font-bold"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* B. TABLET & DESKTOP VIEW: CLEAN TABLE */}
                    <div className="hidden sm:block bg-white rounded-2xl border border-slate-200/80 p-4 shadow-[0_8px_30px_rgba(23,26,43,0.06)] overflow-x-auto">
                      <table className="w-full text-left text-xs min-w-[760px]">
                        <thead className="bg-[#f8fafc] text-slate-600 uppercase text-[10px] font-black border-b border-[#f1f5f9]">
                          <tr>
                            <th className="p-2.5">Tour Destination</th>
                            <th className="p-2.5">Customer</th>
                            <th className="p-2.5">Contact</th>
                            <th className="p-2.5">Date</th>
                            <th className="p-2.5">Members</th>
                            <th className="p-2.5">Status</th>
                            <th className="p-2.5">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f1f5f9]">
                          {bookings.map((b) => (
                            <tr key={b._id} className="hover:bg-[#f8fafc]">
                              <td className="p-2.5 font-bold text-[#1e293b]">
                                {b.tourName}
                              </td>
                              <td className="p-2.5 font-medium text-[#475569]">
                                {b.customerName}
                              </td>
                              <td className="p-2.5">
                                <div className="font-bold text-[#1e293b]">
                                  {b.phone}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {b.email}
                                </div>
                              </td>
                              <td className="p-2.5 text-slate-600">
                                {b.travelDate}
                              </td>
                              <td className="p-2.5">
                                <span className="inline-flex items-center gap-1 bg-[#FFF3C8] text-[#458393] px-2 py-0.5 rounded text-[10px] font-black">
                                  <Users size={10} /> {b.guests || 1}
                                </span>
                              </td>
                              <td className="p-2.5">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                    b.status === "Confirmed"
                                      ? "bg-green-100 text-green-700"
                                      : b.status === "Cancelled"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-amber-50 text-amber-700"
                                  }`}
                                >
                                  {b.status}
                                </span>
                              </td>
                              <td className="p-2.5">
                                <div className="flex gap-1">
                                  {b.status !== "Confirmed" && (
                                    <button
                                      onClick={() =>
                                        handleStatusChange(b._id, "Confirmed")
                                      }
                                      className="bg-green-600 hover:bg-green-700 text-white text-[10px] px-2.5 py-1 rounded font-bold cursor-pointer"
                                    >
                                      Confirm
                                    </button>
                                  )}
                                  {b.status !== "Cancelled" && (
                                    <button
                                      onClick={() =>
                                        handleStatusChange(b._id, "Cancelled")
                                      }
                                      className="bg-[#f1f5f9] hover:bg-red-50 hover:text-red-700 text-slate-600 text-[10px] px-2.5 py-1 rounded font-bold cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* TAB 2: TOURS MANAGER */}
            {activeTab === "tours" && (
              <div>
                {/* Region Filter Buttons */}
                <div className="flex flex-wrap items-center gap-2 mb-6 p-2 bg-white/70 rounded-2xl border border-slate-200/80 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
                    <Filter size={12} /> City:
                  </span>
                  {[
                    "All",
                    "Jaipur",
                    "Sikar",
                    "Udaipur",
                    "Jodhpur",
                    "Pushkar",
                  ].map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedAdminCity(city)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-bold shrink-0 transition cursor-pointer ${
                        selectedAdminCity === city
                          ? "bg-[#34A99D] text-white"
                          : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>

                {/* Tours Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5 xl:gap-6 items-stretch">
                  {filteredAdminTours.map((tour) => (
                    <div
                      key={tour._id}
                      className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(23,26,43,0.07)] flex flex-col justify-between"
                    >
                      <div className="relative h-40 sm:h-44 w-full bg-[#f1f5f9]">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <span className="absolute top-2 right-2 bg-[#FFF3C8] text-[#458393] text-[9px] font-black px-2 py-0.5 rounded uppercase border border-[#FFF3C8]/50">
                          {tour.city || "Jaipur"}
                        </span>
                      </div>
                      <div className="p-3.5 sm:p-4">
                        <h3 className="font-black text-[#1e293b] text-xs sm:text-sm mb-1">
                          {tour.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 mb-1 line-clamp-1">
                          <strong>Spots:</strong> {tour.location}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Duration: {tour.duration}
                        </p>
                      </div>
                      <div className="p-2.5 border-t border-[#f1f5f9] bg-[#f8fafc] flex justify-end">
                        <button
                          onClick={() => handleDeleteTour(tour._id)}
                          className="text-red-500 hover:text-red-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODAL: FULL MOBILE RESPONSIVE ADD TOUR POPUP */}
            {showAddModal && (
              <div className="fixed inset-0 bg-[#020617]/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
                <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 max-h-[90vh] overflow-y-auto shadow-[0_25px_90px_rgba(0,0,0,0.3)] border border-slate-200/80">
                  <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <h2 className="text-sm sm:text-base font-black text-[#458393]">
                      Add Destination Tour
                    </h2>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="text-slate-400 hover:text-[#475569] p-1"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleAddTourSubmit} className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600">
                        Tour Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full border border-slate-200 p-2.5 rounded-xl text-xs mt-1"
                        placeholder="e.g. Khatu Shyam Ji & Jeen Mata Tour"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[10px] font-bold text-slate-600">
                          City / Region
                        </label>
                        <select
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="w-full border border-slate-200 p-2.5 rounded-xl text-xs mt-1 bg-white font-medium"
                        >
                          <option value="Jaipur">Jaipur (Pink City)</option>
                          <option value="Sikar">Sikar & Shekhawati</option>
                          <option value="Udaipur">Udaipur (Lake City)</option>
                          <option value="Jodhpur">Jodhpur (Blue City)</option>
                          <option value="Pushkar">Pushkar & Ajmer</option>
                          <option value="Other">Other Rajasthan</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-600">
                          Duration
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              duration: e.target.value,
                            })
                          }
                          className="w-full border border-slate-200 p-2.5 rounded-xl text-xs mt-1"
                          placeholder="e.g. 1 Full Day / 5-6 Hrs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600">
                        Spots Covered
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full border border-slate-200 p-2.5 rounded-xl text-xs mt-1"
                        placeholder="e.g. Hawa Mahal, Jal Mahal, Amer Fort"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600 block mb-1">
                        Tour Image
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center justify-center gap-2 border border-dashed border-[#D8DAE5] hover:border-[#34A99D] bg-[#f8fafc] p-2 rounded-xl cursor-pointer text-[11px] font-bold text-slate-600">
                          <Upload size={14} className="text-[#34A99D]" />
                          <span>Choose from Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <input
                          type="url"
                          value={
                            formData.image.startsWith("data:image")
                              ? ""
                              : formData.image
                          }
                          onChange={(e) =>
                            setFormData({ ...formData, image: e.target.value })
                          }
                          className="w-full border border-slate-200 p-2 rounded-xl text-xs"
                          placeholder="Or paste online image URL..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600">
                        Description
                      </label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full border border-slate-200 p-2 rounded-xl text-xs mt-1 h-16"
                        placeholder="Tour highlights & itinerary..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600">
                        Inclusions (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.inclusions}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            inclusions: e.target.value,
                          })
                        }
                        className="w-full border border-slate-200 p-2 rounded-xl text-xs mt-1"
                        placeholder="AC Cab, Toll, Parking, Driver Allowance"
                      />
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="w-1/2 bg-[#f1f5f9] py-2.5 rounded-xl font-bold text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-1/2 bg-[#34A99D] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#2c8d83] cursor-pointer"
                      >
                        Save Tour
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ADMIN BOTTOM FOOTER WITH PORTFOLIO */}
      <footer className="bg-[#0f172a] border-t border-white/10 py-3 px-4 text-center text-slate-400 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Ishika Tour & Travels Admin Panel</p>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart size={12} className="text-red-500 fill-red-500 inline" />
          <span>by</span>
          <a
            href="https://rahulrp.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-[#34A99D] hover:text-[#FFF3C8] font-bold flex items-center gap-1 underline decoration-dotted transition"
          >
            <span>Developer Portfolio</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
