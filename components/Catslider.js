"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ResponsiveVideo = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        const data = await response.json();
        setCategories(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const renderMedia = (category) => {
    if (category.img[0].endsWith(".mp4")) {
      return (
        <video className="pic-bubble" autoPlay loop muted playsInline>
          <source src={category.img[0]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    return <img className="pic-bubble" src={category.img[0]} alt={category.name} />;
  };

  return (
    <>
      <h1 className="uppercase text-center myBB">Our Collections</h1>
      <div className="odd-container">
        {categories.length > 0 && (
          <motion.div
            id="vid-jump"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
          >
            {renderMedia(categories[0])}
            <h3 className="pic-tagline" style={{ bottom: "15%" }}>
              {categories[0].name}
            </h3>
            <button
              onClick={() => router.push("/search?cat=" + categories[0].name)}
              className="pic-button-splash"
            >
              Shop Now
            </button>
          </motion.div>
        )}

        <div id="pic-portal">
          {categories.slice(1).map((category, index) => (
            <motion.div
              key={index}
              className="pic-dream"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            >
              {renderMedia(category)}
              <h3 className="pic-tagline">{category.name}</h3>
              <button
                onClick={() => router.push("/search?cat=" + category.name)}
                className="pic-button-splash"
              >
                Shop Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResponsiveVideo;
