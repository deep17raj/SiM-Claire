"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  // Default to US (or whatever default country code your backend expects)
  const [currency, setCurrency] = useState("US");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // 1. Check local storage first
        const savedDataString = localStorage.getItem("userCurrency");

        if (savedDataString) {
          const savedData = JSON.parse(savedDataString);
          const currentTime = new Date().getTime();

          // 2. Check if it's been less than 30 minutes
          if (currentTime < savedData.expiry) {
            setCurrency(savedData.value);
            setLoading(false);
            return;
          } else {
            // Expired, delete it to fetch fresh data
            localStorage.removeItem("userCurrency");
          }
        }

        // 3. Fetch location from a free IP Geolocation service
        const res = await axios.get("https://ipapi.co/json/");
        const countryCode = res.data.country_code; // e.g., "US", "IN"

        // 4. Calculate 30 min expiration (30 mins * 60 seconds * 1000 ms)
        const expirationTime = new Date().getTime() + 30 * 60 * 1000;

        const dataToSave = {
          value: countryCode,
          expiry: expirationTime,
        };

        // 5. Update state and save to local storage
        setCurrency(countryCode);
        localStorage.setItem("userCurrency", JSON.stringify(dataToSave));

      } catch (err) {
        console.error("Failed to detect location, defaulting to US", err);
        setCurrency("US"); // Fallback
      } finally {
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  // Format Helper Function: 
  // Now it just takes the price and the currency code (e.g. "INR", "USD") from your backend
  // and formats it nicely with the correct symbol. No math required!
  const formatPrice = (price, displayCurrencyCode = "USD") => {
    if (price === undefined || price === null) return "N/A";
    
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: displayCurrencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    } catch (e) {
      // Fallback if an invalid currency code is passed
      return `${displayCurrencyCode} ${Number(price).toFixed(2)}`; 
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook to use the context easily
export const useCurrency = () => useContext(CurrencyContext);