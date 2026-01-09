import Image from "next/image";
import Link from "next/link";
import { Users, DollarSign, Heart, UserPlus } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Become A Volunteer",
    description: "You may choose to be a volunteer for our daily food Programme. It takes just an hour to feed some 100-200 persons daily.",
    icon: Users,
    link: "/volunteer",
    buttonText: "Join now +",
    image: "/assets/img/icon/1.png",
    whiteImage: "/assets/img/icon/white-1.png",
  },
  {
    id: 2,
    title: "Quick Fundraiser",
    description: "Help our foundation to achieve very sensitive and complicated tasks for poor childrens in terms of health, food or education.",
    icon: DollarSign,
    link: "/donate",
    buttonText: "Give now +",
    image: "/assets/img/icon/2.png",
    whiteImage: "/assets/img/icon/white-2.png",
  },
  {
    id: 3,
    title: "Give Donation",
    description: "Donate any amount as you wish to spent on the needy ones. Send a cheque/Draft in favour of Jaasiel foundation.",
    icon: Heart,
    link: "/donate",
    buttonText: "Donate now +",
    image: "/assets/img/icon/3.png",
    whiteImage: "/assets/img/icon/white-3.png",
  },
  {
    id: 4,
    title: "Join as a member",
    description: "Suggest innovation and adoption of new helpful services to the poor women and childrens who need our help very badly.",
    icon: UserPlus,
    link: "/signup",
    buttonText: "Be Member +",
    image: "/assets/img/icon/4.png",
    whiteImage: "/assets/img/icon/white-4.png",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">How You Can Help</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-semibold">
            <span className="underline-important">Join us in making a difference through various ways</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="relative group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="mb-6">
                <div className="relative w-20 h-20 mb-6 mx-auto">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={64}
                      height={64}
                      className="object-contain opacity-100 group-hover:opacity-0 transition-opacity"
                    />
                    <Image
                      src={feature.whiteImage}
                      alt={feature.title}
                      width={64}
                      height={64}
                      className="object-contain opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-white text-center">{feature.title}</h3>
                <p className="text-white/90 mb-6 text-center text-sm leading-relaxed">{feature.description}</p>
                <Link
                  href={feature.link}
                  className="block text-center text-white font-semibold hover:text-primary-light group-hover:translate-x-1 transition-transform inline-flex items-center justify-center gap-2 w-full"
                >
                  {feature.buttonText}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

