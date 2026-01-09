import Image from "next/image";
import Link from "next/link";
import { Users, DollarSign, Heart, UserPlus, ArrowRight } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Become A Volunteer",
    description: "You may choose to be a volunteer for our daily food Programme. It takes just an hour to feed some 100-200 persons daily.",
    icon: Users,
    link: "/volunteer",
    buttonText: "Join now +",
    image: "/assets/img/icon/1.png",
  },
  {
    id: 2,
    title: "Quick Fundraiser",
    description: "Help our foundation to achieve very sensitive and complicated tasks for poor childrens in terms of health, food or education.",
    icon: DollarSign,
    link: "/donate",
    buttonText: "Give now +",
    image: "/assets/img/icon/2.png",
  },
  {
    id: 3,
    title: "Give Donation",
    description: "Donate any amount as you wish to spent on the needy ones. Send a cheque/Draft in favour of Jaasiel foundation.",
    icon: Heart,
    link: "/donate",
    buttonText: "Donate now +",
    image: "/assets/img/icon/3.png",
    showArrow: true,
  },
  {
    id: 4,
    title: "Join as a member",
    description: "Suggest innovation and adoption of new helpful services to the poor women and childrens who need our help very badly.",
    icon: UserPlus,
    link: "/signup",
    buttonText: "Be Member +",
    image: "/assets/img/icon/4.png",
    showArrow: true,
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-32 md:py-40 bg-[#1e40af] overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            How You Can Help
          </h2>
          <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto font-normal">
            Join us in making a difference through various ways
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="relative w-24 h-24">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-8 text-center leading-relaxed text-base">
                {feature.description}
              </p>
              
              {/* Action Button */}
              <Link
                href={feature.link}
                className="block text-center text-gray-800 font-semibold hover:text-[#DC2626] transition-colors group"
              >
                <span className="inline-flex items-center gap-2">
                  {feature.buttonText}
                  {feature.showArrow && (
                    <ArrowRight size={18} className="text-[#DC2626] group-hover:translate-x-1 transition-transform" />
                  )}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

