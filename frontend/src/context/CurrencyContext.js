"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// 1. Define our supported currencies and fallback exchange rates
// In a real app, you might fetch live exchange rates from your backend!
const exchangeRates = {
  USD: { symbol: "$", rate: 1 },       // Base currency (e.g., $1.00)
  INR: { symbol: "₹", rate: 83.0 },    // 1 USD = 83 INR
  EUR: { symbol: "€", rate: 0.92 },    // 1 USD = 0.92 EUR
  GBP: { symbol: "£", rate: 0.79 },    // 1 USD = 0.79 GBP
  CAD: { symbol: "C$", rate: 1.35 },   // 1 USD = 1.35 CAD
  AUD: { symbol: "A$", rate: 1.52 },   // 1 USD = 1.52 AUD
};

// Map country codes to currencies
const countryToCurrency = {
  US: "USD", IN: "INR", GB: "GBP", CA: "CAD", AU: "AUD",
  // Eurozone countries
  FR: "EUR", DE: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", IE: "EUR" 
};

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  // Default to USD if we can't find them
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // We check localStorage first so we don't hit the IP API on every page reload
        const savedCurrency = localStorage.getItem("userCurrency");
        if (savedCurrency && exchangeRates[savedCurrency]) {
          setCurrency(savedCurrency);
          setLoading(false);
          return;
        }

        // Fetch location from a free IP Geolocation service
        const res = await axios.get("https://ipapi.co/json/");
        const countryCode = res.data.country_code; // e.g., "US", "IN"

        // Find the matching currency, or default to USD
        
        setCurrency(countryCode);
        localStorage.setItem("userCurrency", countryCode); // Save for next time
      } catch (err) {
        console.error("Failed to detect location, defaulting to USD", err);
        setCurrency("US"); // Fallback
      } finally {
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  // Format Helper Function: Takes a base USD price and returns the localized string
  const formatPrice = (basePriceInUSD) => {
    const rateInfo = exchangeRates[currency] || exchangeRates.USD;
    const convertedPrice = basePriceInUSD * rateInfo.rate;
    
    return `${rateInfo.symbol}${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook to use the context easily
export const useCurrency = () => useContext(CurrencyContext);