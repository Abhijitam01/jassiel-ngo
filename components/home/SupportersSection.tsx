"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, Heart, Award, TrendingUp } from "lucide-react";
import Card from "@/components/shared/Card";
import Skeleton from "@/components/ui/Skeleton";

interface Supporter {
  id: string;
  name: string;
  role: string;
  image: string;
  contribution: string;
  verified?: boolean;
}

// Mock supporters data
const supporters: Supporter[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    role: "Monthly Supporter",
    image: "/assets/img/team/1.png",
    contribution: "₹5,000/month",
    verified: true,
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Impact Partner",
    image: "/assets/img/team/2.png",
    contribution: "₹10,000/month",
    verified: true,
  },
  {
    id: "3",
    name: "Amit Patel",
    role: "Champion Supporter",
    image: "/assets/img/team/3.png",
    contribution: "₹25,000/month",
    verified: true,
  },
  {
    id: "4",
    name: "Sneha Reddy",
    role: "Monthly Supporter",
    image: "/assets/img/team/4.png",
    contribution: "₹3,000/month",
    verified: true,
  },
  {
    id: "5",
    name: "Vikram Singh",
    role: "Impact Partner",
    image: "/assets/img/team/5.png",
    contribution: "₹15,000/month",
    verified: true,
  },
  {
    id: "6",
    name: "Anjali Mehta",
    role: "Monthly Supporter",
    image: "/assets/img/team/6.png",
    contribution: "₹7,500/month",
    verified: true,
  },
  {
    id: "7",
    name: "Rohit Verma",
    role: "Champion Supporter",
    image: "/assets/img/team/7.png",
    contribution: "₹50,000/month",
    verified: true,
  },
  {
    id: "8",
    name: "Kavita Nair",
    role: "Monthly Supporter",
    image: "/assets/img/team/8.png",
    contribution: "₹4,000/month",
    verified: true,
  },
];

export default function SupportersSection() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="relative py-20 md:py-32 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Users className="text-primary" size={20} />
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">
              Our Supporters
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-secondary">
            Join Our Community of Changemakers
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            Meet the dedicated individuals and organizations making a lasting impact through monthly support
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <Card className="p-4 md:p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="text-primary" size={24} />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">2,500+</div>
            <div className="text-sm text-gray-600">Active Supporters</div>
          </Card>
          <Card className="p-4 md:p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Heart className="text-primary" size={24} />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">₹15L+</div>
            <div className="text-sm text-gray-600">Monthly Impact</div>
          </Card>
          <Card className="p-4 md:p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Award className="text-primary" size={24} />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">150+</div>
            <div className="text-sm text-gray-600">Champion Supporters</div>
          </Card>
          <Card className="p-4 md:p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <TrendingUp className="text-primary" size={24} />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">95%</div>
            <div className="text-sm text-gray-600">Retention Rate</div>
          </Card>
        </div>

        {/* Supporters Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="p-4">
                <Skeleton variant="circular" width={80} height={80} className="mx-auto mb-3" />
                <Skeleton variant="text" width="80%" height={20} className="mx-auto mb-2" />
                <Skeleton variant="text" width="60%" height={16} className="mx-auto mb-2" />
                <Skeleton variant="text" width="70%" height={16} className="mx-auto" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {supporters.map((supporter) => (
              <Card
                key={supporter.id}
                hover
                variant="elevated"
                className="group text-center p-4 md:p-6 border border-gray-100"
              >
                <div className="relative mb-4">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary/30 transition-colors">
                    <Image
                      src={supporter.image}
                      alt={supporter.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {supporter.verified && (
                    <div className="absolute bottom-0 right-1/4 bg-primary text-white rounded-full p-1">
                      <Award size={16} />
                    </div>
                  )}
                </div>
                <h3 className="text-base md:text-lg font-bold text-secondary mb-1 group-hover:text-primary transition-colors">
                  {supporter.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2">{supporter.role}</p>
                <p className="text-sm md:text-base font-semibold text-primary">
                  {supporter.contribution}
                </p>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-6 text-lg">
            Become a monthly supporter and join thousands making a difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
            >
              Start Supporting Monthly
            </a>
            <a
              href="/volunteer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

