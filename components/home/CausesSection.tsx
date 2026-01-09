import { causes } from "@/data/causes";
import FundraiserCard from "@/components/shared/FundraiserCard";
import Button from "@/components/shared/Button";
import { Ribbon } from "lucide-react";

export default function CausesSection() {
  const featuredCauses = causes.slice(0, 3);

  return (
    <section className="relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background with Pattern - give.do style: clean white */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-pattern opacity-5" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-[95rem]">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-primary/10 rounded-full">
            <Ribbon className="text-primary" size={20} />
            <span className="text-primary font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wide">Support a Fundraiser</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 text-secondary px-2">
            Pick a cause close to your heart
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed px-4">
            We believe that everything in this world is inter-dependent, and if we wish to live in a better world then it is important to care for it and protect it on every ground. So reach out and give a hand…
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12">
          {featuredCauses.map((cause) => (
            <FundraiserCard
              key={cause.id}
              id={cause.id}
              title={cause.title}
              description={cause.description}
              image={cause.image}
              goal={cause.goal ?? 0}
              raised={cause.raised ?? 0}
              donations={Math.floor((cause.raised ?? 0) / 100)} // Mock donation count
              daysLeft={30} // Mock days left
              slug={cause.slug}
              organization="Jaasiel Foundation"
            />
          ))}
        </div>

        <div className="text-center">
          <Button variant="primary" size="lg" href="/causes" className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 shadow-lg hover:shadow-xl transition-shadow px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg w-full sm:w-auto">
            See More Fundraisers
          </Button>
        </div>
      </div>
    </section>
  );
}

