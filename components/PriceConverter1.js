"use client";

import { useEffect, useState } from "react";

const PriceConverter = ({ priceInUSD, onConvert }) => {
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Arabic country currency mapping
  const arabicCountryCurrency = {
    AE: "AED", SA: "SAR", QA: "QAR", KW: "KWD", BH: "BHD",
    OM: "OMR", JO: "JOD", EG: "EGP", MA: "MAD", DZ: "DZD",
    TN: "TND", LY: "LYD", LB: "LBP", IQ: "IQD", YE: "YER",
    SY: "SYP", SD: "SDG", SO: "SOS", PS: "ILS"
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipinfo.io/json?token=75ca8d7e3de900");
        if (!res.ok) throw new Error("Failed to fetch location.");
        const data = await res.json();
        setCountry(data.country);
        localStorage.setItem("userCountry", data.country);
      } catch (err) {
        setError("Error fetching location.");
      }
    };

    const cachedCountry = localStorage.getItem("userCountry");
    if (cachedCountry) {
      setCountry(cachedCountry);
    } else {
      fetchLocation();
    }
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (!country) return;
      try {
        // Determine the currency based on the country
        const selectedCurrency = arabicCountryCurrency[country] || "USD";
        setCurrency(selectedCurrency);

        // Fetch exchange rate using the selected country's currency as the target
        const res = await fetch(`https://hexarate.paikama.co/api/rates/latest/USD?target=${selectedCurrency}`);
        if (!res.ok) throw new Error("Failed to fetch exchange rates.");
        const data = await res.json();
 
        
        // Set the exchange rate using data.data.mid
        const rate = data.data?.mid || 1; // Assuming the exchange rate is in data.data.mid
        setExchangeRate(rate);
        setLoading(false);
      } catch (err) {
        setError("Error fetching exchange rate.");
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [country]);

  useEffect(() => {
    if (onConvert && exchangeRate && currency) {
      onConvert(exchangeRate, currency);
    }
  }, [exchangeRate, currency]);

  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p className="text-red-500">{error}</p>
  ) : (
    <>
      {formatNumber(exchangeRate * priceInUSD)} {currency}
    </>
  );
};

export default PriceConverter;
