"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { 
  User, Mail, Phone, Calendar, 
  Wifi, Clock, Activity, LogOut, Settings, ChevronRight
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  
  // States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // Fetch User Data and Order History
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // In a real app, you would get the token from localStorage or cookies
        const token = localStorage.getItem("jwt");
        
        if (!token) {
         
          router.push("/login");
          return;
        }

        /* // --- REAL API CALL (Uncomment when backend is ready) ---
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
        setOrders(response.data.orders);
        */

        // --- MOCK DATA (For UI testing right now) ---
        setTimeout(() => {
          setUser({
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+91 98765 43210",
            joined: "February 2026",
          });
          
          setOrders([
            {
              id: "ORD-987123",
              country: "Japan",
              flag: "🇯🇵",
              plan: "10GB Data",
              validity: "30 Days",
              status: "ACTIVE", // ACTIVE, EXPIRED, PENDING
              purchaseDate: "Feb 18, 2026",
              dataUsed: "2.4",
            },
            {
              id: "ORD-456789",
              country: "Europe Regional",
              flag: "🇪🇺",
              plan: "5GB Data",
              validity: "15 Days",
              status: "EXPIRED",
              purchaseDate: "Jan 05, 2026",
              dataUsed: "5.0",
            },
            {
              id: "ORD-112233",
              country: "United States",
              flag: "🇺🇸",
              plan: "Unlimited Data",
              validity: "7 Days",
              status: "PENDING", // Bought but not installed
              purchaseDate: "Feb 21, 2026",
              dataUsed: "0",
            }
          ]);
          setLoading(false);
        }, 1000); // 1 second fake loading delay

      } catch (err) {
        setError("Failed to load profile data.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Helper function for status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "ACTIVE":
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">ACTIVE</span>;
      case "PENDING":
        return <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">NOT INSTALLED</span>;
      case "EXPIRED":
        return <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">EXPIRED</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3a7d71]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">My Account</h1>
          <p className="text-slate-500 mt-2">Manage your personal information and eSIM history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ========================================= */}
          {/* LEFT COLUMN: User Profile Card            */}
          {/* ========================================= */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              
              {/* Avatar / Name */}
              <div className="flex flex-col items-center text-center border-b border-gray-100 pb-6 mb-6">
                <div className="w-24 h-24 bg-[#e8f4f1] rounded-full flex items-center justify-center text-[#3a7d71] text-3xl font-bold mb-4">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{user?.name}</h2>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                <div className="flex items-center text-slate-600">
                  <Mail className="w-5 h-5 mr-3 text-[#3a7d71]" />
                  <span className="truncate">{user?.email}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Phone className="w-5 h-5 mr-3 text-[#3a7d71]" />
                  <span>{user?.phone}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Calendar className="w-5 h-5 mr-3 text-[#3a7d71]" />
                  <span>Joined {user?.joined}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button className="w-full flex items-center justify-center py-3 px-4 bg-gray-50 hover:bg-gray-100 text-slate-700 rounded-xl font-medium transition-colors border border-gray-200">
                  <Settings className="w-4 h-4 mr-2" /> Account Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium transition-colors border border-red-100"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Log Out
                </button>
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* RIGHT COLUMN: Order History               */}
          {/* ========================================= */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 h-full">
              
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800">My eSIMs</h2>
                <button className="text-[#ec5b13] hover:text-[#d94a0e] font-semibold text-sm transition-colors">
                  View All Orders
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <Wifi className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-700">No eSIMs found</h3>
                  <p className="text-gray-500 mt-1 mb-4">You haven't purchased any eSIMs yet.</p>
                  <button onClick={() => router.push('/destinations')} className="bg-[#ec5b13] text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all">
                    Explore Destinations
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="group border border-gray-100 hover:border-[#3a7d71]/30 rounded-2xl p-5 transition-all hover:shadow-md bg-white">
                      
                      {/* Order Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl bg-gray-50 p-2 rounded-lg">{order.flag}</div>
                          <div>
                            <h3 className="font-bold text-lg text-slate-800">{order.country}</h3>
                            <p className="text-sm text-slate-500 font-medium">Order #{order.id}</p>
                          </div>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      {/* Order Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-50">
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Plan</p>
                          <p className="font-semibold text-slate-700">{order.plan}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Validity</p>
                          <p className="font-semibold text-slate-700 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#3a7d71]" /> {order.validity}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Data Used</p>
                          <p className="font-semibold text-slate-700 flex items-center gap-1">
                            <Activity className="w-3 h-3 text-[#ec5b13]" /> {order.dataUsed} GB
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Purchased</p>
                          <p className="font-semibold text-slate-700">{order.purchaseDate}</p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-4 flex justify-end">
                        <button className="text-[#3a7d71] font-semibold text-sm flex items-center hover:text-[#2a5c53] transition-colors group-hover:translate-x-1 duration-300">
                          {order.status === "PENDING" ? "Install eSIM" : "View Details"} 
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}