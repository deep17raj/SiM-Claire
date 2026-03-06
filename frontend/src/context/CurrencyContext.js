"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("US");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectLocation = async () => {
      console.log("1. Starting location detection...");

      try {
        const savedDataString = localStorage.getItem("userCurrency");
        
        if (savedDataString) {
          console.log("2. Found existing data in Local Storage:", savedDataString);
          const savedData = JSON.parse(savedDataString);
          const currentTime = new Date().getTime();

          if (currentTime < savedData.expiry) {
            console.log("3. Data is still valid! Skipping API call. Using:", savedData.value);
            setCurrency(savedData.value);
            setLoading(false);
            return; // 🛑 This is why it wasn't printing before!
          } else {
            console.log("3. Data expired. Removing old data...");
            localStorage.removeItem("userCurrency");
          }
        } else {
          console.log("2. No data found in Local Storage. Making API call...");
        }

        // Fetch location using GeoJS
        console.log("4. Calling GeoJS API...");
        const res = await axios.get("https://get.geojs.io/v1/ip/country.json");
        
        console.log("5. API Success! Location Data:", res.data); 
        const countryCode = res.data.country;

        const expirationTime = new Date().getTime() + 30 * 60 * 1000;
        const dataToSave = {
          value: countryCode,
          expiry: expirationTime,
        };

        console.log("6. Saving new data to Local Storage:", dataToSave);
        setCurrency(countryCode);
        localStorage.setItem("userCurrency", JSON.stringify(dataToSave));

      } catch (err) {
        console.error("❌ ERROR: Location detection failed. Defaulting to US.", err.message);
        setCurrency("US"); 
      } finally {
        setLoading(false);
        console.log("7. Detection process finished.");
      }
    };

    detectLocation();
  }, []);

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
      return `${displayCurrencyCode} ${Number(price).toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);