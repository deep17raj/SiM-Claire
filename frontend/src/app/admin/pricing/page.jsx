"use client";

import { useState, useEffect } from "react";
import { Edit2, TrendingUp, AlertCircle, Globe, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { allDestinations } from "@/data/destinationData"; 

// --- Validation Schema for Edit Form ---
const pricingSchema = z.object({
  name: z.string().min(2, "Display name is required").trim(),
  globalMultiplier: z.coerce.number().min(1, "Multiplier must be at least 1.0").max(10, "Multiplier too high"),
});

export default function AdminPricingPanel() {
  const [simTypes, setSimTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); 
  const [actionError, setActionError] = useState("");

  // --- States for Country Overrides in the Modal ---
  const [countryOverrides, setCountryOverrides] = useState({});
  const [removedOverrides, setRemovedOverrides] = useState([]); // Tracks deleted countries to send is_active: false
  const [selectedOverrideCountry, setSelectedOverrideCountry] = useState("");
  const [overrideValue, setOverrideValue] = useState("");

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(pricingSchema),
  });

  // --- 1. Fetch Existing Data ---
  useEffect(() => {
    fetchPricingData();
  }, []);

  const fetchPricingData = async () => {
    try {
      // NOTE: For a real app, you would fetch this from your backend and map it into this structure.
      
      // --- MOCK DATA FOR THE 4 FIXED TYPES ---
      setTimeout(() => {
        setSimTypes([
          { id: 1, typeId: "type1", name: "Type1 Esim", globalMultiplier: 1.2, countryMultipliers: {} },
          { id: 2, typeId: "type2", name: "Type2 Esim", globalMultiplier: 1.3, countryMultipliers: {} },
          { id: 3, typeId: "type3", name: "Type3 Esim", globalMultiplier: 1.5, countryMultipliers: {} },
          { id: 4, typeId: "type4", name: "Type4 Esim", globalMultiplier: 1.4, countryMultipliers: {} },
        ]);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error("Failed to fetch pricing", err);
      setLoading(false);
    }
  };

  // --- 2. Handle Edit Submission (Batching Requests for the Backend) ---
  const onSubmit = async (data) => {
    setActionError("");
    
    // NOTE: Update this URL to match your exact backend route!
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/sim-multiplier/update`; 
    const headers = { Authorization: `Bearer ${localStorage.getItem("adminToken")}` };

    try {
      const requests = [];

      // A. Queue the Global Multiplier update
      requests.push(
        axios.post(API_URL, {
          sim_type: editingItem.typeId,
          country_code: "GLOBAL",
          multiplier: data.globalMultiplier,
          is_active: true
        }, { headers })
      );

      // B. Queue all Active Country Overrides
      Object.entries(countryOverrides).forEach(([countryCode, multiplierValue]) => {
        requests.push(
          axios.post(API_URL, {
            sim_type: editingItem.typeId,
            country_code: countryCode, // e.g., JYN-1
            multiplier: multiplierValue,
            is_active: true
          }, { headers })
        );
      });

      // C. Queue Deletions (Set is_active: false for removed overrides)
      removedOverrides.forEach((countryCode) => {
        requests.push(
          axios.post(API_URL, {
            sim_type: editingItem.typeId,
            country_code: countryCode,
            multiplier: 1, // Backend requires > 0, so we send a dummy 1, but deactivate it.
            is_active: false 
          }, { headers })
        );
      });

      // Execute all requests simultaneously
      // await Promise.all(requests);

      // MOCK UPDATE UI (Reflecting what just saved to the database)
      const finalData = {
        typeId: editingItem.typeId,
        name: data.name,
        globalMultiplier: data.globalMultiplier,
        countryMultipliers: countryOverrides
      };

      setSimTypes(simTypes.map(sim => sim.id === editingItem.id ? { ...sim, ...finalData } : sim));
      closeModal();
      
    } catch (err) {
      console.error(err);
      setActionError(err.response?.data?.message || "Failed to update pricing rules. Please check backend connection.");
    }
  };

  // --- 3. Override UI Helpers ---
  const handleAddOverride = () => {
    if (!selectedOverrideCountry || !overrideValue) return;
    
    setCountryOverrides(prev => ({
      ...prev,
      [selectedOverrideCountry]: parseFloat(overrideValue)
    }));
    
    // If it was previously marked for removal, unmark it
    setRemovedOverrides(prev => prev.filter(code => code !== selectedOverrideCountry));
    
    setSelectedOverrideCountry("");
    setOverrideValue("");
  };

  const handleRemoveOverride = (countryId) => {
    // Add to removed tracker so we can tell the backend to disable it
    setRemovedOverrides(prev => [...prev, countryId]);
    
    // Remove from active UI state
    setCountryOverrides(prev => {
      const newOverrides = { ...prev };
      delete newOverrides[countryId];
      return newOverrides;
    });
  };

  // --- Modal Helpers ---
  const openModal = (item) => {
    setActionError("");
    setSelectedOverrideCountry("");
    setOverrideValue("");
    setRemovedOverrides([]); // Reset deletions list
    setEditingItem(item);
    
    // Populate form fields
    setValue("name", item.name);
    setValue("globalMultiplier", item.globalMultiplier);
    setCountryOverrides(item.countryMultipliers || {});
    
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
            <p className="text-slate-500 mt-1">Manage global multipliers and country-specific overrides for the 4 core SIM types.</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 border-b border-gray-200 text-sm uppercase tracking-wider">
                  <th className="p-5 font-semibold">Type ID</th>
                  <th className="p-5 font-semibold">Display Name</th>
                  <th className="p-5 font-semibold">Global Multiplier</th>
                  <th className="p-5 font-semibold">Custom Overrides</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {simTypes.map((sim) => {
                  const overrideCount = Object.keys(sim.countryMultipliers || {}).length;
                  return (
                    <tr key={sim.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-5">
                        <span className="font-mono text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                          {sim.typeId}
                        </span>
                      </td>
                      <td className="p-5">
                        <p className="font-bold text-slate-900">{sim.name}</p>
                      </td>
                      <td className="p-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-[#e8f4f1] text-[#3a7d71]">
                          {sim.globalMultiplier}x
                        </span>
                      </td>
                      <td className="p-5">
                        {overrideCount > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-[#ec5b13]">
                            <Globe size={14} /> {overrideCount} Countr{overrideCount === 1 ? 'y' : 'ies'}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm font-medium">None</span>
                        )}
                      </td>
                      <td className="p-5 flex justify-end">
                        <button onClick={() => openModal(sim)} className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2">
                          <Edit2 size={16} /> Edit Margin
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Edit Pricing Rule</h2>
                <p className="text-sm text-slate-500 font-mono mt-1">Editing: {editingItem.typeId}</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer">&times;</button>
            </div>

            {/* Scrollable form body */}
            <div className="p-6 overflow-y-auto">
              <form id="pricing-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {actionError && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2">
                    <AlertCircle size={16} className="mt-0.5" /> {actionError}
                  </div>
                )}

                {/* Display Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Display Name</label>
                  <input
                    {...register("name")}
                    placeholder="e.g., Standard Data"
                    className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-[#3a7d71] transition-all ${errors.name ? "border-red-500" : "border-gray-200"}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Global Multiplier */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Global Multiplier</label>
                  <div className="relative w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 font-bold">x</span>
                    </div>
                    <input
                      {...register("globalMultiplier")}
                      type="number"
                      step="0.01"
                      className={`w-full pl-8 pr-4 py-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-[#3a7d71] transition-all ${errors.globalMultiplier ? "border-red-500" : "border-gray-200"}`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">This base margin is applied to all countries for <b>{editingItem.typeId}</b> by default.</p>
                  {errors.globalMultiplier && <p className="text-red-500 text-xs mt-1">{errors.globalMultiplier.message}</p>}
                </div>

                {/* --- COUNTRY OVERRIDES SECTION --- */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <Globe size={16} className="text-[#ec5b13]"/> Country Overrides
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">Set specific multipliers for individual countries.</p>
                  
                  {/* Add Override Inputs */}
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <select
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#3a7d71]"
                      value={selectedOverrideCountry}
                      onChange={(e) => setSelectedOverrideCountry(e.target.value)}
                    >
                      <option value="">Select Country...</option>
                      {allDestinations.map(country => (
                        <option key={country.destinationID} value={country.destinationID}>
                          {country.destinationName}
                        </option>
                      ))}
                    </select>
                    
                    <div className="flex gap-2">
                      <div className="relative w-24">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <span className="text-gray-400 font-bold text-xs">x</span>
                        </div>
                        <input
                          type="number" 
                          step="0.01"
                          min="1"
                          placeholder="1.5"
                          value={overrideValue}
                          onChange={(e) => setOverrideValue(e.target.value)}
                          className="w-full pl-6 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#3a7d71]"
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={handleAddOverride} 
                        disabled={!selectedOverrideCountry || !overrideValue}
                        className="px-4 bg-slate-800 disabled:bg-slate-300 text-white rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* List of active overrides */}
                  {Object.entries(countryOverrides).length > 0 ? (
                    <ul className="space-y-2 border border-gray-100 rounded-xl p-2 bg-gray-50/50 max-h-40 overflow-y-auto">
                      {Object.entries(countryOverrides).map(([countryId, val]) => {
                        const cName = allDestinations.find(c => c.destinationID === countryId)?.destinationName || countryId;
                        return (
                          <li key={countryId} className="flex justify-between items-center bg-white border border-gray-100 px-3 py-2 rounded-lg text-sm shadow-sm">
                            <span className="font-medium text-slate-700">{cName}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-[#ec5b13] font-bold bg-orange-50 px-2 py-0.5 rounded">{val}x</span>
                              <button type="button" onClick={() => handleRemoveOverride(countryId)} className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer text-[10px] bg-gray-100 px-2 py-1 rounded">
                                Remove
                              </button>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <div className="text-center p-4 border border-dashed border-gray-200 rounded-xl text-sm text-gray-400">
                      No country overrides set.
                    </div>
                  )}
                </div>

              </form>
            </div>

            {/* Modal Footer / Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3 shrink-0">
              <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-100 text-slate-700 rounded-lg font-semibold transition-colors cursor-pointer">
                Cancel
              </button>
              <button form="pricing-form" type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-[#ec5b13] hover:bg-[#d94a0e] text-white rounded-lg font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-sm">
                {isSubmitting ? "Saving..." : "Update Pricing"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}