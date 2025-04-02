"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dxlfxsimy/image/upload/v1742419658/czmy8ckxnvor07xgln0x.webp",
    topLine: "Twisted BookEnds by Nature: Pure Beauty",
    bottomLine: "Experience the power of nature with our all-natural",
    link: "/shop",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dxlfxsimy/image/upload/v1742419658/lhgh74uf9jtbm7seay3h.webp",
    topLine: "Embrace the Essence of Nature",
    bottomLine: "chemical-free formulations designed to bring balance",
    link: "/shop",
  },
];

const MyCarousel = () => {
  return (
    <div className="relative w-full mb-20">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1000}
        className="h-screen"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative overflow-hidden">
              <img
                src={slide.image}
                alt={slide.topLine}
                className="w-full h-screen object-cover transition-transform duration-[4000ms] ease-in-out scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-center p-4 text-black text-left">
                <h1 className="text-black text-5xl font-bold uppercase animate-slideInLeft myGray">
                  {slide.topLine}
                </h1>
                <p className="text-3xl mt-2 uppercase animate-slideInLeft delay-200 myBB font-bold">
                  {slide.bottomLine}
                </p>
                <a
                  href={slide.link}
                  style={{ padding: "1em" }}
                  className="mt-10 px-6 py-2 bg-[#ef0f87] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Shop Now!
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default MyCarousel;
