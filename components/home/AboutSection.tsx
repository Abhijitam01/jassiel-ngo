import Image from "next/image";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { Heart } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img/about/about-image.jpg"
          alt="About Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/95" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-[95rem]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/img/about/11.jpg"
                  alt="About Us"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden lg:block">
                <Image
                  src="/assets/img/about/22.jpg"
                  alt="Our Work"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full">
                <Heart className="text-primary" size={18} />
                <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wide">About Jaasiel foundation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 md:mb-8 text-secondary px-2">
            An registered voluntary organisation
          </h2>
              <p className="text-primary text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 underline-important px-4 lg:px-0">
            Your support will help us to make life better living for poor vulnerable children.
          </p>
              <p className="text-gray-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl px-4 lg:px-0">
            <strong className="text-secondary underline-important">Jaasiel Foundation</strong> is a registered voluntary organisation working with the most vulnerable groups of children, especially street and working children <span className="underline-important font-semibold">since 2014</span>. With a rights based, non-institutional approach the organisation endeavours to educate and impart life skills to vulnerable children so that they become self reliant. Over the years jaasiel has initiated a number of innovative interventions in the field and partnered with various government and non-government agencies to garner support for children.
          </p>
              <Button variant="primary" size="lg" href="/about" className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 shadow-lg hover:shadow-xl transition-shadow font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
            More about us
          </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

