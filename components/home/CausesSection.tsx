import { causes } from "@/data/causes";
import FundraiserCard from "@/components/shared/FundraiserCard";
import Button from "@/components/shared/Button";
import { Ribbon } from "lucide-react";

export default function CausesSection() {
  const featuredCauses = causes.slice(0, 3);

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background with Pattern - give.do style: clean white */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-pattern opacity-5" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-primary/10 rounded-full">
            <Ribbon className="text-primary" size={28} />
            <span className="text-primary font-semibold text-base uppercase tracking-wide">Support a Fundraiser</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-secondary">
            Pick a cause close to your heart
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">
            We believe that everything in this world is inter-dependent, and if we wish to live in a better world then it is important to care for it and protect it on every ground. So reach out and give a hand…
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {featuredCauses.map((cause) => (
            <FundraiserCard
              key={cause.id}
              id={cause.id}
              title={cause.title}
              description={cause.description}
              image={cause.image}
              goal={cause.goal}
              raised={cause.raised}
              donations={Math.floor(cause.raised / 100)} // Mock donation count
              daysLeft={30} // Mock days left
              slug={cause.slug}
              organization="Jaasiel Foundation"
            />
          ))}
        </div>

        <div className="text-center">
          <Button variant="primary" size="lg" href="/causes" className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 shadow-lg hover:shadow-xl transition-shadow px-8 py-4 font-bold text-lg">
            See More Fundraisers
          </Button>
        </div>
      </div>
    </section>
  );
}

