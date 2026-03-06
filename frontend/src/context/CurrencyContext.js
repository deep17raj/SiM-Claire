"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [countryCode, setCountryCode] = useState("US");
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectLocationAndRates = async () => {
      try {
        // We use a new key to avoid conflicts with your previous tests
        const savedDataString = localStorage.getItem("app-Currency-Data");
        
        if (savedDataString) {
          const savedData = JSON.parse(savedDataString);
          const currentTime = new Date().getTime();

          if (currentTime < savedData.expiry) {
            setCountryCode(savedData.countryCode);
            setCurrencyCode(savedData.currencyCode);
            setExchangeRate(savedData.exchangeRate);
            setLoading(false);
            return; 
          } else {
            localStorage.removeItem("app-Currency-Data");
          }
        }

        // 1. Get Country Code (e.g., "IN", "FR", "GB")
        const geoRes = await axios.get("https://get.geojs.io/v1/ip/country.json");
        console.log(geoRes.data)
        const detectedCountry = geoRes.data.country;

        // 2. Get Currency Code from Country Code (e.g., "IN" -> "INR")
        const countryRes = await axios.get(`https://restcountries.com/v3.1/alpha/${detectedCountry}`);
        console.log(countryRes.data)
        const detectedCurrency = Object.keys(countryRes.data[0].currencies)[0];

        // 3. Get Real-Time Exchange Rate (Base: USD)
        const ratesRes = await axios.get("https://open.er-api.com/v6/latest/USD");
        const rate = ratesRes.data.rates[detectedCurrency] || 1;

        const expirationTime = new Date().getTime() + 30 * 60 * 1000;
        const dataToSave = {
          countryCode: detectedCountry,
          currencyCode: detectedCurrency,
          exchangeRate: rate,
          expiry: expirationTime,
        };

        setCountryCode(detectedCountry);
        setCurrencyCode(detectedCurrency);
        setExchangeRate(rate);
        localStorage.setItem("app-Currency-Data", JSON.stringify(dataToSave));

      } catch (err) {
        console.error("❌ ERROR: Location or rates detection failed. Defaulting to USD.", err.message);
        setCountryCode("US"); 
        setCurrencyCode("USD");
        setExchangeRate(1);
      } finally {
        setLoading(false);
      }
    };

    detectLocationAndRates();
  }, []);

  // Now defaults to the newly fetched currencyCode automatically
  const formatPrice = (price, overrideCurrencyCode = null) => {
    if (price === undefined || price === null) return "N/A";
    const codeToUse = overrideCurrencyCode || currencyCode;
    
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: codeToUse,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price);
    } catch (e) {
      return `${codeToUse} ${Number(price).toFixed(0)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ 
        currency: countryCode, // Kept as "currency" so it doesn't break your other pages!
        currencyCode,          // E.g., "INR"
        exchangeRate,          // E.g., 83.5
        formatPrice, 
        loading 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);