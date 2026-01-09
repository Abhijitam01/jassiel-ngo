import Image from "next/image";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { Heart } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
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
      
      <div className="relative z-10 container mx-auto px-1 max-w-[95rem]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/img/about/11.jpg"
                  alt="About Us"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden lg:block">
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
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
                <Heart className="text-primary" size={24} />
                <span className="text-primary font-semibold text-sm uppercase tracking-wide">About Jaasiel foundation</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-secondary">
            An registered voluntary organisation
          </h2>
              <p className="text-primary text-2xl md:text-3xl font-bold mb-8 underline-important">
            Your support will help us to make life better living for poor vulnerable children.
          </p>
              <p className="text-gray-700 mb-10 leading-relaxed text-xl md:text-2xl">
            <strong className="text-secondary underline-important">Jaasiel Foundation</strong> is a registered voluntary organisation working with the most vulnerable groups of children, especially street and working children <span className="underline-important font-semibold">since 2014</span>. With a rights based, non-institutional approach the organisation endeavours to educate and impart life skills to vulnerable children so that they become self reliant. Over the years jaasiel has initiated a number of innovative interventions in the field and partnered with various government and non-government agencies to garner support for children.
          </p>
              <Button variant="primary" size="lg" href="/about" className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 shadow-lg hover:shadow-xl transition-shadow font-bold text-lg px-8 py-4">
            More about us
          </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

