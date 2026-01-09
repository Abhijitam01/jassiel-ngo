"use client";

import Image from "next/image";
import { useState } from "react";
import { Target } from "lucide-react";
import Button from "@/components/shared/Button";

const tabs = [
  {
    id: "mission",
    label: "Our Mission",
    content: {
      title: "Health, Education & Community Development",
      paragraphs: [
        "Our mission is to empower needy children and communities to break the Vicious Cycle of Poverty where poverty spawns problems of malnourishment and mortality while lack of education ensures children follow in their parents' footsteps scraping a daily existence as manual labor or ragpickers.",
        "Our several projects in Health, Education and Community Development are inter-related and together provide a once-forgotten child or community a comprehensive road from poverty to prosperity.",
      ],
    },
  },
  {
    id: "focus",
    label: "Our Focus",
    content: {
      title: "Health, Education & Community Development",
      paragraphs: [
        "Early Childhood Care and Development Centres (ECCD) Our several Education projects cover the spectrum of ages and development needs.",
        "Per the Government of India and UNICEF, only half the government primary schools have safe drinking water and only 1 in 10 has sanitation facilities. So we make efforts so that the people drink safe water and there would be sanitization facilities avialble to anyone.",
        "Through door to door drives, street plays etc, we educate parents in these communities about the advantages of education and convinces them to send their children especially girls to school.",
      ],
    },
  },
];

export default function MissionSection() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img/home-three/bg.jpg"
          alt="Mission Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/90 to-secondary/95" />
      </div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <div className="relative h-96 lg:h-full min-h-[500px] order-2 lg:order-1">
          <div className="absolute inset-0 p-8">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/img/mission.png"
                alt="Our Mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-center order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full w-fit">
            <Target className="text-primary" size={24} />
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">Our Mission</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-secondary">
            Health, Education & Community Development
          </h2>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex gap-6 border-b-2 border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 font-semibold text-lg transition-all relative ${
                    activeTab === tab.id
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8 min-h-[200px]">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={activeTab === tab.id ? "block animate-fade-in" : "hidden"}
              >
                {tab.content.paragraphs.map((paragraph, index) => {
                  // Add underline to important phrases
                  const parts: (string | JSX.Element)[] = [];
                  let remainingText = paragraph;
                  
                  // Check for "Early Childhood Care and Development Centres (ECCD)"
                  if (remainingText.includes("Early Childhood Care and Development Centres (ECCD)")) {
                    const before = remainingText.split("Early Childhood Care and Development Centres (ECCD)")[0];
                    const after = remainingText.split("Early Childhood Care and Development Centres (ECCD)")[1] || "";
                    if (before) parts.push(before);
                    parts.push(
                      <span key="eccd" className="underline-important font-semibold">
                        Early Childhood Care and Development Centres (ECCD)
                      </span>
                    );
                    remainingText = after;
                  }
                  
                  // Check for "Government of India and UNICEF"
                  if (remainingText.includes("Government of India and UNICEF")) {
                    const before = remainingText.split("Government of India and UNICEF")[0];
                    const after = remainingText.split("Government of India and UNICEF")[1] || "";
                    if (before) parts.push(before);
                    parts.push(
                      <span key="govt" className="underline-important font-semibold">
                        Government of India and UNICEF
                      </span>
                    );
                    remainingText = after;
                  }
                  
                  if (remainingText) parts.push(remainingText);
                  
                  return (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed text-lg">
                      {parts.length > 0 ? parts : paragraph}
                    </p>
                  );
                })}
              </div>
            ))}
          </div>

          <Button variant="primary" size="lg" href="/about" className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 shadow-lg hover:shadow-xl transition-shadow w-fit font-bold">
            Know More
          </Button>
        </div>
      </div>
    </section>
  );
}

