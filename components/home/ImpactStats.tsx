"use client";

import { useState, useEffect, useRef } from "react";
import Skeleton from "@/components/ui/Skeleton";
import { Users, Heart, Building2, TrendingUp } from "lucide-react";

interface Stat {
  id: string;
  value: number;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  suffix?: string;
  prefix?: string;
}

const stats: Stat[] = [
  {
    id: "1",
    value: 1600000,
    label: "Donations",
    icon: Heart,
    suffix: "+",
  },
  {
    id: "2",
    value: 4000,
    label: "Verified Non-Profits",
    icon: Building2,
    suffix: "+",
  },
  {
    id: "3",
    value: 50000,
    label: "Lives Impacted",
    icon: Users,
    suffix: "+",
  },
  {
    id: "4",
    value: 20,
    label: "Years of Service",
    icon: TrendingUp,
    suffix: "+",
  },
];

function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef<number>();

  useEffect(() => {
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = start;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (end - startValue) * easeOut);

      setCount(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, start]);

  return { count, isAnimating };
}

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix?: string; prefix?: string }) {
  const { count } = useCountUp(value);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#DC2626]">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export default function ImpactStats() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setIsLoading(false), 500);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-secondary">
            India's Most Trusted Online Donation Platform
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-semibold">
            <span className="underline-important">Witness the positive change we've made!</span>
          </p>
        </div>

        {/* Stats Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton variant="rectangular" height={60} className="w-full mb-4 md:hidden" />
                <Skeleton variant="rectangular" height={80} className="w-full mb-4 hidden md:block" />
                <Skeleton variant="text" width="60%" height={20} className="mx-auto md:h-6" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full mb-4 md:mb-6 hover:bg-primary/20 transition-colors">
                    <IconComponent className="text-primary" size={32} />
                  </div>
                  {isVisible && (
                    <div className="mb-2 md:mb-4">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                    </div>
                  )}
                  <p className="text-base md:text-lg lg:text-xl font-bold text-secondary">
                    <span className="underline-important">{stat.label}</span>
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/impact-stories"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors underline-important"
          >
            Read about our Impact
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

