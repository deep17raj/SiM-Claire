"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

// --- Validation Schema for Add/Edit Form ---
const pricingSchema = z.object({
  typeId: z.string().min(2, "Type ID is required (e.g., 'type1')").trim(),
  name: z.string().min(2, "Display name is required").trim(),
  multiplier: z.coerce.number().min(1, "Multiplier must be at least 1.0").max(10, "Multiplier too high"),
});

export default function AdminPricingPanel() {
  const [simTypes, setSimTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null means "Adding New", object means "Editing"
  const [actionError, setActionError] = useState("");

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(pricingSchema),
  });

  // --- 1. Fetch Existing Multipliers ---
  useEffect(() => {
    fetchPricingData();
  }, []);

  const fetchPricingData = async () => {
    try {
      // TODO: Replace with your actual admin API endpoint
      // const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/pricing`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      // });
      // setSimTypes(res.data);

      // --- MOCK DATA FOR UI TESTING ---
      setTimeout(() => {
        setSimTypes([
          { id: 1, typeId: "local_data", name: "Local Data Only", multiplier: 1.3 },
          { id: 2, typeId: "regional_data", name: "Regional Data", multiplier: 1.4 },
          { id: 3, typeId: "global_data_voice", name: "Global (Data + Voice)", multiplier: 1.5 },
        ]);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error("Failed to fetch pricing", err);
      setLoading(false);
    }
  };

  // --- 2. Handle Add / Edit Submission ---
  const onSubmit = async (data) => {
    setActionError("");
    try {
      /* // REAL API CALL
      const endpoint = editingItem 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pricing/${editingItem.id}` 
        : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pricing`;
      const method = editingItem ? "PUT" : "POST";
      
      await axios({
        method,
        url: endpoint,
        data,
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      */

      // MOCK UPDATE UI
      if (editingItem) {
        setSimTypes(simTypes.map(sim => sim.id === editingItem.id ? { ...sim, ...data } : sim));
      } else {
        setSimTypes([...simTypes, { id: Date.now(), ...data }]);
      }

      closeModal();
    } catch (err) {
      setActionError(err.response?.data?.message || "Failed to save pricing rules.");
    }
  };

  // --- 3. Handle Delete ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pricing rule?")) return;
    try {
      // await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/pricing/${id}`);
      setSimTypes(simTypes.filter(sim => sim.id !== id));
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  // --- Modal Helpers ---
  const openModal = (item = null) => {
    setActionError("");
    if (item) {
      setEditingItem(item);
      setValue("typeId", item.typeId);
      setValue("name", item.name);
      setValue("multiplier", item.multiplier);
    } else {
      setEditingItem(null);
      reset({ typeId: "", name: "", multiplier: 1.2 }); // Default starting multiplier
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    reset();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading Admin...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="text-[#ec5b13]" /> Pricing & Margins
            </h1>
            <p className="text-slate-500 mt-1">Manage commission multipliers for upstream eSIM providers.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="bg-[#3a7d71] hover:bg-[#2b6157] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus size={18} /> Add SIM Type
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 border-b border-gray-200 text-sm uppercase tracking-wider">
                  <th className="p-5 font-semibold">Upstream ID</th>
                  <th className="p-5 font-semibold">Display Name</th>
                  <th className="p-5 font-semibold">Multiplier</th>
                  <th className="p-5 font-semibold">Retail Example (Base $10)</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {simTypes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-gray-500">No pricing rules found. Add one above.</td>
                  </tr>
                ) : (
                  simTypes.map((sim) => (
                    <tr key={sim.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-5 font-mono text-sm text-slate-600 bg-gray-50/50">{sim.typeId}</td>
                      <td className="p-5 font-medium text-slate-900">{sim.name}</td>
                      <td className="p-5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-bold bg-[#e8f4f1] text-[#3a7d71]">
                          {sim.multiplier}x
                        </span>
                      </td>
                      <td className="p-5 text-slate-600 font-medium">
                        $10.00 <span className="text-gray-400 mx-2">➔</span> <span className="text-[#ec5b13]">${(10 * sim.multiplier).toFixed(2)}</span>
                      </td>
                      <td className="p-5 flex justify-end gap-3">
                        <button onClick={() => openModal(sim)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(sim.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-slate-800">
                {editingItem ? "Edit Pricing Rule" : "Add New SIM Type"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              
              {actionError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5" /> {actionError}
                </div>
              )}

              {/* Upstream Type ID */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Upstream API Type ID</label>
                <input
                  {...register("typeId")}
                  placeholder="e.g., local_data_only"
                  className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-[#3a7d71] transition-all ${errors.typeId ? "border-red-500" : "border-gray-200"}`}
                />
                <p className="text-xs text-gray-500 mt-1.5">The exact ID code provided by the upstream eSIM API.</p>
                {errors.typeId && <p className="text-red-500 text-xs mt-1">{errors.typeId.message}</p>}
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Display Name</label>
                <input
                  {...register("name")}
                  placeholder="e.g., Local Data"
                  className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-[#3a7d71] transition-all ${errors.name ? "border-red-500" : "border-gray-200"}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Multiplier */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price Multiplier</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-bold">x</span>
                  </div>
                  <input
                    {...register("multiplier")}
                    type="number"
                    step="0.01"
                    placeholder="1.2"
                    className={`w-full pl-8 pr-4 py-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-[#3a7d71] transition-all ${errors.multiplier ? "border-red-500" : "border-gray-200"}`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Example: 1.5 multiplier on a $10 base cost = $15 user price.</p>
                {errors.multiplier && <p className="text-red-500 text-xs mt-1">{errors.multiplier.message}</p>}
              </div>

              {/* Form Actions */}
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-slate-700 rounded-lg font-semibold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-[#ec5b13] hover:bg-[#d94a0e] text-white rounded-lg font-semibold transition-colors disabled:opacity-50">
                  {isSubmitting ? "Saving..." : "Save Rule"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}