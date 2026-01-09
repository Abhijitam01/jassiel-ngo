export interface MonthlyMission {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  featured?: boolean;
  image?: string;
}

export const monthlyMissions: MonthlyMission[] = [
  {
    id: "1",
    title: "No Child Orphaned",
    description: "Support orphaned children with education, healthcare, and a loving home environment.",
    icon: "heart",
    slug: "no-child-orphaned",
    featured: true,
    image: "/assets/img/causes/1.jpg",
  },
  {
    id: "2",
    title: "Protect Abandoned Elders",
    description: "Provide care, shelter, and dignity to abandoned elderly individuals.",
    icon: "shield",
    slug: "protect-abandoned-elders",
    featured: true,
    image: "/assets/img/about/11.jpg",
  },
  {
    id: "3",
    title: "Safe Water for All",
    description: "Ensure access to clean, safe drinking water for underprivileged communities.",
    icon: "droplet",
    slug: "safe-water-for-all",
    featured: true,
    image: "/assets/img/causes/2.jpg",
  },
  {
    id: "4",
    title: "End Period Poverty",
    description: "Provide menstrual hygiene products and education to girls and women in need.",
    icon: "circle",
    slug: "end-period-poverty",
    image: "/assets/img/causes/3.jpg",
  },
  {
    id: "5",
    title: "Stop Animal Cruelty",
    description: "Rescue, rehabilitate, and protect animals from cruelty and neglect.",
    icon: "paw",
    slug: "stop-animal-cruelty",
    image: "/assets/img/causes/4.jpg",
  },
  {
    id: "6",
    title: "Feed the Hungry",
    description: "Provide nutritious meals to those facing food insecurity and hunger.",
    icon: "utensils",
    slug: "feed-the-hungry",
    featured: true,
    image: "/assets/img/causes/5.jpg",
  },
  {
    id: "7",
    title: "Right to Clean Air",
    description: "Promote environmental awareness and initiatives for cleaner air quality.",
    icon: "wind",
    slug: "right-to-clean-air",
    image: "/assets/img/causes/6.jpg",
  },
  {
    id: "8",
    title: "Manage India's Waste",
    description: "Support waste management initiatives and recycling programs across India.",
    icon: "recycle",
    slug: "manage-india-waste",
    image: "/assets/img/causes/1.jpg",
  },
  {
    id: "9",
    title: "Every Girl in School",
    description: "Ensure every girl has access to quality education and stays in school.",
    icon: "graduation-cap",
    slug: "every-girl-in-school",
    featured: true,
    image: "/assets/img/causes/11.jpg",
  },
];

