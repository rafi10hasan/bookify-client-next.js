"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";



const slides = [
  {
    title: "Rooms&Suites",
    description:
      "our hotels have wide range of rooms,standard room,deluxe rooms,two-bed room apartment at our hotels you will for sure find what suits you best.All apartment have modern design,all needed amenities and perfact view from windows",
    image: "/hotel-with-tv-cabinet_105762-2276.jpg"
  },
  {
    title: "Happy Tour",
    description:
      "our hotels have wide range of rooms,standard room,deluxe rooms,two-bed room apartment at our hotels you will for sure find what suits you best.All apartment have modern design.",
    image: "/hotel-with-tv_105762-2301.jpg"
  },
  {
    title: "Relax and Chill",
    description:
      "our hotels have wide range of rooms,standard room,deluxe rooms,two-bed room apartment at our hotels you will for sure find what suits you best.Find the perfect getaway to relax and recharge.",
    image:"/hotel-with-tv-couch_105762-2269.jpg"
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    setCurrentIndex(isFirstSlide ? slides.length - 1 : currentIndex - 1);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
  },[currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setTimeout(nextSlide, 3000);
    return () => clearTimeout(intervalId);
  }, [currentIndex,nextSlide]);

  return (
    <div className="relative w-full h-[650px] ">
      {/* Slide Image */}
      <div
        className="w-full h-full relative bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      {/* Slide Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center p-10 ">
        <div className="space-y-4 w-full max-w-5xl">
          <h2 className="text-4xl font-bold text-white">{slides[currentIndex].title}</h2>
          <p className="block md:hidden text-white">
            {`${slides[currentIndex].description.substring(0, 50)}...`} {/* Mobile view */}
          </p>
          <p className="hidden md:block text-white">
            {slides[currentIndex].description} {/* Desktop view */}
          </p>
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 p-3 bg-midnight text-white rounded-full hover:bg-gray-600"
      >
        <ArrowLeft className="size-3 md:size-4"/>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 p-3 bg-midnight text-white rounded-full hover:bg-gray-600"
      >
        <ArrowRight className="size-3 md:size-4"/>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`size-2 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
