"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/shared/Button";

const slides = [
  {
    id: 1,
    title: "Can they count on you every month?",
    description: "Your monthly gift = a whole year of impact. Help transform lives of vulnerable children and families across India. Registered NGO working since 2014.",
    image: "/assets/img/main-banner1.jpg",
    buttonText: "Give Monthly Now",
    secondaryButtonText: "Learn More",
  },
  {
    id: 2,
    title: "They wait for your help & Support",
    description: "Join thousands of monthly supporters creating sustained change. Your recurring gift provides families with essential resources year-round.",
    image: "/assets/img/main-banner2.jpg",
    buttonText: "Start Monthly Giving",
    secondaryButtonText: "Become Volunteer",
  },
  {
    id: 3,
    title: "Can you help transform a life today?",
    description: "Act now and your first three months of monthly giving can be 2X matched! Every rupee goes directly to programs serving India's most vulnerable communities.",
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
              <div className="container mx-auto px-4 sm:px-6 max-w-[95rem] text-center text-white z-20">
                <div className="max-w-full mx-auto px-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-5 md:mb-6 animate-fade-in leading-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                    {slide.title}
                    <span className="text-primary">.</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto animate-fade-in-delay text-white/95 leading-relaxed font-medium px-2">
                    {slide.description}
                  </p>
                  {index === 2 && (
                    <div className="mb-4 sm:mb-5 md:mb-6 animate-fade-in-delay-2">
                      <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                        <span className="text-sm sm:text-base font-bold">✨ First 3 months 2X matched!</span>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-delay-2 px-4">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      href="/donate" 
                      className="bg-primary hover:bg-primary-dark text-white border-0 shadow-2xl hover:shadow-3xl transition-all px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold w-full sm:w-auto"
                      aria-label={slide.buttonText}
                    >
                      {slide.buttonText} →
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      href={slide.secondaryButtonText === "Learn More" ? "/about" : slide.secondaryButtonText === "Become Volunteer" ? "/volunteer" : "/signup"} 
                      className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-primary shadow-xl hover:shadow-2xl transition-all px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold w-full sm:w-auto"
                      aria-label={slide.secondaryButtonText}
                    >
                      {slide.secondaryButtonText} →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

