import React, { useState, useEffect } from "react";

const QuantitySelector = ({ initialQty = 1, productId, onChange }) => {
  const [qty, setQty] = useState(initialQty);
  const [maxStock, setMaxStock] = useState(null); // Store max stock

  useEffect(() => {
    // Fetch max stock from API
    const fetchStock = async () => {
      try {
        const response = await fetch(`/api/stock/${productId}`);
        const data = await response.json();

        if (response.ok && data.stock) {
          setMaxStock(parseInt(data.stock, 10)); // Ensure stock is a number
        } else {
          console.error("Failed to fetch stock:", data.error);
        }
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };

    fetchStock();
  }, [productId]); // Fetch stock when productId changes

  const handleIncrement = () => {
    if (maxStock !== null && qty < maxStock) { // Prevent exceeding max stock
      setQty(qty + 1);
      onChange(qty + 1);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
      onChange(qty - 1);
    }
  };

  return (
    <div className="quantity-selector">
      <button 
        className="myNewC" 
        type="button" 
        onClick={handleDecrement} 
        style={{ width: "20px", backgroundColor: "initial", marginRight: "5px", fontWeight: "900" }}
      >
        -
      </button>
      <input 
        type="number" 
        value={qty} 
        readOnly 
        style={{ width: "30px", color: "initial" }} 
      />
      <button 
        className="myNewC" 
        type="button" 
        onClick={handleIncrement} 
        style={{ width: "20px", backgroundColor: "initial", marginLeft: "5px", fontWeight: "900" }}
        disabled={maxStock !== null && qty >= maxStock} // Disable if at max stock
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
