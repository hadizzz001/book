"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const reviews = [
  {
    name: "Karim El Khoury",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
    text: "Excellent service! Highly recommended.",
  },
  {
    name: "Nour Hamdan",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    stars: 4,
    text: "Great experience, but there’s room for improvement.",
  },
  {
    name: "Jad Hobeika",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    stars: 5,
    text: "The best experience I’ve had so far!",
  },
  {
    name: "Layal Chidiac",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    stars: 4,
    text: "Very professional and friendly team!",
  },
  {
    name: "Ziad Moussawi",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    stars: 3,
    text: "Good service but took a bit longer than expected.",
  },
  {
    name: "Rita Saliba",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    stars: 5,
    text: "I loved every part of the process. Thank you!",
  },
  {
    name: "Elie Karam",
    image: "https://randomuser.me/api/portraits/men/37.jpg",
    stars: 4,
    text: "Friendly staff and great results!",
  },
  {
    name: "Maya Fares",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    stars: 5,
    text: "Smooth and easy process. Would do it again!",
  },
  {
    name: "George Maalouf",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    stars: 4,
    text: "Satisfied with the service. Thank you!",
  },
  {
    name: "Sara Bou Nassif",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    stars: 5,
    text: "Exceptional service, exceeded my expectations!",
  },
];

const ReviewsSwiper = () => {
  return (
    <div className="max-w-2xl mx-auto my-10"> 
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay , Navigation]}
        className="rounded-xl shadow-lg"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="bg-white p-5 rounded-lg   text-center">
            <img
              src={review.image}
              alt={review.name}
              className="w-16 h-16 mx-auto rounded-full mb-3"
            />
            <h3 className="font-semibold text-lg myGray">{review.name}</h3>
            <div className="flex justify-center my-2 myBB text-[20px]"  >
              {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
            </div>
            <p className=" myGray">{review.text}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsSwiper;
