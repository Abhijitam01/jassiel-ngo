"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/shared/Button";
import NormalLandingPage from "@/components/home/NormalLandingPage";
import { Heart, Users, Building2, TrendingUp, ArrowRight, HandHeart } from "lucide-react";
import { textToBraille } from "@/lib/braille";

export default function BrailleLandingPage() {
  const [showNormal, setShowNormal] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stats = [
    { value: "1.6M+", label: "Donations", icon: Heart },
    { value: "4,000+", label: "Verified NGOs", icon: Building2 },
    { value: "50K+", label: "Lives Impacted", icon: Users },
    { value: "20+", label: "Years of Service", icon: TrendingUp },
  ];

  const missions = [
    "No Child Orphaned",
    "Protect Abandoned Elders",
    "Safe Water for All",
    "Feed the Hungry",
    "Every Girl in School",
  ];

  // Handle mouse enter - show overlay immediately
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setShowNormal(true);
  };

  // Handle mouse leave - hide overlay with delay to prevent flickering
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowNormal(false);
    }, 100); // Small delay to allow mouse to move to overlay
  };

  // Set body attribute for braille mode styling
  useEffect(() => {
    document.body.setAttribute("data-braille-mode", "true");
    return () => {
      document.body.removeAttribute("data-braille-mode");
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-secondary via-secondary-dark to-primary relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-braille-page="true"
    >
      {/* Normal Website Overlay - Reveals on Hover */}
      <div
        className={`fixed inset-0 bg-white z-[100] transition-opacity duration-500 ease-in-out overflow-y-auto ${
          showNormal 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ visibility: showNormal ? 'visible' : 'hidden' }}
      >
        <div className="min-h-screen pt-20">
          <NormalLandingPage />
        </div>
      </div>

      {/* Braille Landing Page Content */}
      <div className={`relative z-10 container mx-auto px-4 py-16 md:py-24 transition-opacity duration-500 ${
        showNormal ? "opacity-0" : "opacity-100"
      }`}>
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white braille-text-element" data-braille-skip style={{ fontFamily: "Courier New, monospace", letterSpacing: "0.15em" }}>
            {textToBraille("Jaasiel Foundation")}
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 braille-text-element" data-braille-skip style={{ fontFamily: "Courier New, monospace", letterSpacing: "0.15em" }}>
            {textToBraille("Helping the Underprivileged Since 2014")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              href="/donate"
              className="bg-white text-primary hover:bg-white/90 shadow-2xl"
            >
              <span data-braille-skip>{textToBraille("Donate Now")}</span>
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/volunteer"
              className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              <span data-braille-skip>{textToBraille("Become Volunteer")}</span>
            </Button>
          </div>
        </header>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                >
                  <IconComponent className="text-white mx-auto mb-4" size={40} />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 braille-text-element" data-braille-skip>
                    {textToBraille(stat.value)}
                  </div>
                  <p className="text-white/90 braille-text-element" data-braille-skip>
                    {textToBraille(stat.label)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Missions Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center braille-text-element" data-braille-skip>
            {textToBraille("Our Monthly Missions")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {missions.map((mission, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-colors"
              >
                <HandHeart className="text-white mb-4" size={32} />
                <h3 className="text-xl font-semibold text-white mb-2 braille-text-element" data-braille-skip>
                  {textToBraille(mission)}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  href={`/donate?mission=${mission.toLowerCase().replace(/\s+/g, "-")}`}
                  className="mt-4 bg-white/10 border-white text-white hover:bg-white hover:text-primary"
                >
                  <span data-braille-skip>{textToBraille("Support")}</span>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16 text-center">
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 braille-text-element" data-braille-skip>
              {textToBraille("About Us")}
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 braille-text-element" data-braille-skip>
              {textToBraille(
                "Jaasiel Foundation is a registered voluntary organisation working with the most vulnerable groups of children, especially street and working children since 2014. We believe in creating sustained impact through verified projects and transparent operations."
              )}
            </p>
            <Button
              variant="primary"
              size="lg"
              href="/about"
              className="bg-white text-primary hover:bg-white/90"
            >
              <span data-braille-skip>{textToBraille("Learn More")}</span>
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </section>

        {/* Quick Links */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 braille-text-element" data-braille-skip>
            {textToBraille("Quick Links")}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/causes"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors braille-text-element"
              data-braille-skip
            >
              {textToBraille("Our Causes")}
            </Link>
            <Link
              href="/events"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors braille-text-element"
              data-braille-skip
            >
              {textToBraille("Events")}
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors braille-text-element"
              data-braille-skip
            >
              {textToBraille("Contact Us")}
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors braille-text-element"
              data-braille-skip
            >
              {textToBraille("Blog")}
            </Link>
          </div>
        </section>

        {/* Hover Hint */}
        <div 
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/30 transition-opacity duration-300 max-w-md ${
            showNormal ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-white text-sm md:text-base text-center braille-text-element font-medium" data-braille-skip>
            {textToBraille("Hover to see the normal website. This is how blind users navigate - through touch and sound, not sight.")}
          </p>
        </div>
      </div>
    </div>
  );
}

