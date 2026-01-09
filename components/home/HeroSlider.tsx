"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/shared/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Help Raising Poor Childrens of India",
    description: "Registered voluntary organisation working with the most vulnerable groups of children, especially street and working children since 2014",
    image: "/assets/img/main-banner1.jpg",
    buttonText: "Donate Now",
    secondaryButtonText: "Become Member",
  },
  {
    id: 2,
    title: "They wait for your help & Support",
    description: "Join hands to hands and contribute to their health, food and education",
    image: "/assets/img/main-banner2.jpg",
    buttonText: "Donate Now",
    secondaryButtonText: "Become Member",
  },
  {
    id: 3,
    title: "Save the Kindness",
    description: "HELPING POORS BRINGS PEACE IN YOU AND PROVIDE SATISFACTION IN YOUR LIFETIME. LETS FEEL FREE TO HELP THE PEOPLE WHO ARE NOT HAVING ANYTHING EXCEPT YOUR HELP.",
    image: "/assets/img/main-banner3.jpg",
    buttonText: "Donate Now",
    secondaryButtonText: "Become Member",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover w-full h-full"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-1 max-w-[95rem] text-center text-white z-20">
                <div className="max-w-full mx-auto">
                  <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in leading-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                    {slide.title}
                    <span className="text-[#DC2626]">.</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-fade-in-delay text-white/95 leading-relaxed font-medium">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
                    <Button variant="primary" size="lg" href="/donate" className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 shadow-2xl hover:shadow-3xl transition-all px-8 py-4 text-lg font-bold">
                      {slide.buttonText} →
                    </Button>
                    <Button variant="outline" size="lg" href="/volunteer" className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-[#DC2626] shadow-xl hover:shadow-2xl transition-all px-8 py-4 text-lg font-bold">
                      {slide.secondaryButtonText} →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-4 rounded-full transition-all z-20 shadow-xl hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-4 rounded-full transition-all z-20 shadow-xl hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all shadow-lg ${
              index === currentSlide ? "bg-white w-10 h-3" : "bg-white/50 w-3 h-3 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

