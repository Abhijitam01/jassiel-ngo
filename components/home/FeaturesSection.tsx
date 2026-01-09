import Image from "next/image";
import Link from "next/link";
import { Users, DollarSign, Heart, UserPlus, ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Become A Volunteer",
    description: "You may choose to be a volunteer for our daily food Programme. It takes just an hour to feed some 100-200 persons daily.",
    icon: Users,
    link: "/volunteer",
    buttonText: "Join now",
    image: "/assets/img/icon/1.png",
    size: "large", // spans 2 columns
    gradient: "from-red-500 to-red-700",
  },
  {
    id: 2,
    title: "Quick Fundraiser",
    description: "Help our foundation to achieve very sensitive and complicated tasks for poor childrens in terms of health, food or education.",
    icon: DollarSign,
    link: "/donate",
    buttonText: "Give now",
    image: "/assets/img/icon/2.png",
    size: "medium",
    gradient: "from-red-600 to-red-800",
  },
  {
    id: 3,
    title: "Give Donation",
    description: "Donate any amount as you wish to spent on the needy ones. Send a cheque/Draft in favour of Jaasiel foundation.",
    icon: Heart,
    link: "/donate",
    buttonText: "Donate now",
    image: "/assets/img/icon/3.png",
    size: "tall", // spans 2 rows
    gradient: "from-red-500 to-red-700",
  },
  {
    id: 4,
    title: "Join as a member",
    description: "Suggest innovation and adoption of new helpful services to the poor women and childrens who need our help very badly.",
    icon: UserPlus,
    link: "/signup",
    buttonText: "Be Member",
    image: "/assets/img/icon/4.png",
    size: "medium",
    gradient: "from-red-600 to-red-800",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#DC2626] via-[#B91C1C] to-[#991b1b] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 md:px-6 max-w-[95rem]">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Sparkles className="text-white" size={18} />
            <span className="text-white font-semibold text-sm uppercase tracking-wide">
              Ways to Help
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
            How You Can Help
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Join us in making a difference through various ways
          </p>
        </div>
        
        {/* Modern Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            const isLarge = feature.size === "large";
            const isTall = feature.size === "tall";
            const isMedium = feature.size === "medium";

            return (
              <Link
                key={feature.id}
                href={feature.link}
                className={`
                  group relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl
                  bg-white/95 backdrop-blur-sm
                  shadow-xl hover:shadow-2xl
                  transition-all duration-500
                  hover:scale-[1.02]
                  ${isLarge ? "md:col-span-2" : ""}
                  ${isTall ? "md:row-span-2 md:col-span-1" : ""}
                  ${isMedium ? "" : ""}
                  border border-white/20
                  min-h-[240px] sm:min-h-[280px] md:min-h-[320px]
                  ${isTall ? "md:min-h-[640px]" : ""}
                `}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className={`relative h-full p-4 sm:p-5 md:p-8 lg:p-10 flex flex-col ${isTall ? "justify-between" : ""}`}>
                  {/* Icon and Image */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-6">
                    <div className={`
                      p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-lg sm:rounded-xl md:rounded-2xl
                      bg-gradient-to-br ${feature.gradient}
                      shadow-lg group-hover:shadow-xl
                      transition-all duration-300
                      group-hover:scale-110
                    `}>
                      <IconComponent className="text-white" size={isLarge || isTall ? 24 : 20} />
                    </div>
                    {feature.image && (
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 opacity-20 group-hover:opacity-30 transition-opacity">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={`
                    font-extrabold text-gray-900 mb-2 sm:mb-3 md:mb-4
                    group-hover:text-[#DC2626] transition-colors duration-300
                    ${isLarge ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl" : isTall ? "text-lg sm:text-xl md:text-2xl lg:text-3xl" : "text-lg sm:text-xl md:text-2xl"}
                  `}>
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`
                    text-gray-600 leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm
                    ${isLarge ? "sm:text-base md:text-lg" : isTall ? "sm:text-base md:text-lg flex-grow" : "md:text-base"}
                  `}>
                    {feature.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className="mt-auto">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[#DC2626] font-bold group-hover:gap-2 sm:group-hover:gap-3 transition-all duration-300">
                      <span className={`text-sm sm:text-base ${isLarge || isTall ? "md:text-lg lg:text-xl" : "md:text-lg"}`}>
                        {feature.buttonText}
                      </span>
                      <ArrowRight 
                        size={16} 
                        className="group-hover:translate-x-1 transition-transform duration-300" 
                      />
                    </div>
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#DC2626]/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16">
          <p className="text-white/80 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 px-4">
            Every contribution makes a difference
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#DC2626] rounded-full font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <span>Explore All Ways to Help</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

