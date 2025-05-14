"use client";

import { useEffect, useState } from "react";

const PriceConverter = ({ priceInUSD }) => {
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Arabic country currency mapping
  const arabicCountryCurrency = {
    AE: "AED", SA: "SAR", QA: "QAR", KW: "KWD", BH: "BHD",
    OM: "OMR", JO: "JOD", EG: "EGP", MA: "MAD", DZ: "DZD",
    TN: "TND", LY: "LYD", IQ: "IQD", YE: "YER",
    SY: "SYP", SD: "SDG", SO: "SOS", PS: "ILS"  
  };

  // Get user location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipinfo.io/json?token=15ba98f7f74d02");
        if (!res.ok) throw new Error("Failed to fetch location.");
        const data = await res.json();
        setCountry(data.country); // e.g., "SA" for Saudi Arabia
      } catch (err) {
        setError("Error fetching location.");
      }
    };

    // Check localStorage first
    const cachedCountry = localStorage.getItem("userCountry");
    if (cachedCountry) {
      setCountry(cachedCountry);
    } else {
      fetchLocation().then((newCountry) => {
        if (newCountry) localStorage.setItem("userCountry", newCountry);
      });
    }
  }, []);

  // Fetch exchange rate
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

        // Set the exchange rate using the 'mid' value from the API response
        if (data.data.mid) {
          setExchangeRate(data.data.mid);

        } else {
          setError("Exchange rate unavailable.");
        }
      } catch (err) {
        setError("Error fetching exchange rate.");
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [country]);

  // Function to format number with commas
  const formatNumber = (num) => {
    return Number(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Convert price
  const convertPrice = (usdPrice) => formatNumber(usdPrice * exchangeRate);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>{convertPrice(priceInUSD)} {currency}</>
      )}
    </>
  );
};

export default PriceConverter;
