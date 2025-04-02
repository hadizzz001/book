import { useEffect, useState } from "react";
import { sendEmail } from '../app/api/sendEmail/sendEmail';

export default function OfferPopup() {
  const [offer, setOffer] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Default closed

  useEffect(() => {
    if (window.location.hostname === "localhost" || window.location.hostname === "Twisted BookEnds1.netlify.app" || window.location.hostname === "Twisted BookEnds.com") {
      const hasSeenPopup = localStorage.getItem("hasSeenOfferPopup");
      if (!hasSeenPopup) {
        setIsOpen(true); // Show popup only if not seen before
      }
    }
  
    fetch("/api/offer")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setOffer(data[0].name);
      })
      .catch((err) => console.error("Error fetching offer:", err));
  }, []);
  

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenOfferPopup", "true"); // Store flag
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendEmail(new FormData(e.target));
    setEmail("");
    handleClose();
  };

  return isOpen ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(13, 13, 13, 0.8)",
          color: "white",
          padding: "50px",
          borderRadius: "12px",
          width: "600px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
          >
            <rect width={44} height={44} />
            <path
              d="M7 17L16.8995 7.10051"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 7.00001L16.8995 16.8995"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Offer Text */}
        <h2>GET 10% OFF
          YOUR FIRST
          ORDER NOW!</h2>
          <h6 className="mt-10"> 
          Tell us where to send your exclusive code.
          </h6>

        {/* Email Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email:"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "25px",
              borderRadius: "6px",
              border: "none",
              color: "#222",
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: "25px",
              backgroundColor: "#ef0f87",
              color: "white",
              padding: "12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              width: "50%",
              fontWeight: "bold",
              fontSize: "26px",
            }}
          >
            CLAIM MY CODE
          </button>
          <p className="mt-10 font-bold cursor-pointer" onClick={handleClose}>No thanks, I will pay full price.</p>
        </form>
      </div>
    </div>
  ) : null;
}
