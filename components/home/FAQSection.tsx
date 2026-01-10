"use client";

import { useState } from "react";
import { faqs } from "@/data/faq";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Get the first 7 FAQs for homepage display (matching the image)
const homepageFAQs = faqs.slice(0, 7);

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Left Section - Introduction */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4 sm:mb-5 md:mb-6">
              <HelpCircle className="text-primary" size={24} />
              <span className="text-primary font-semibold text-sm sm:text-base uppercase tracking-wide">
                FAQs
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-5 md:mb-6 text-secondary leading-tight">
              FAQs
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-5 md:mb-6 leading-relaxed max-w-lg">
              Everything you need to know about our initiatives, if you have any other questions please reach out to us at:
            </p>
            <Link
              href="mailto:support@jaasielfoundation.com"
              className="text-primary hover:text-primary-dark font-semibold text-lg sm:text-xl md:text-2xl transition-colors inline-block"
            >
              support@jaasielfoundation.com
            </Link>
          </div>

          {/* Right Section - FAQ List */}
          <div className="space-y-3 sm:space-y-4">
            {homepageFAQs.map((faq) => {
              const isOpen = openFAQ === faq.id;
              return (
                <div
                  key={faq.id}
                  className={cn(
                    "bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300",
                    "hover:border-gray-300 hover:shadow-sm",
                    isOpen && "shadow-sm border-gray-300"
                  )}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-base sm:text-lg text-secondary pr-4 flex-1">
                      {faq.question}
                    </span>
                    <div
                      className={cn(
                        "flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300",
                        isOpen
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                      )}
                    >
                      {isOpen ? (
                        <Minus className="transition-transform duration-300" size={18} />
                      ) : (
                        <Plus className="transition-transform duration-300" size={18} />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-0 border-t border-gray-100 animate-fade-in">
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* View All Link */}
            <div className="pt-4 sm:pt-6">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors text-sm sm:text-base group"
              >
                <span>View All FAQs</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

