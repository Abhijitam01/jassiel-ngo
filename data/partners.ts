export interface Partner {
  id: string;
  name: string;
  logo: string;
  verified: boolean;
  category?: string;
}

export const partners: Partner[] = [
  {
    id: "1",
    name: "Charutar Arogya Mandal",
    logo: "/assets/img/logo.png", // Using placeholder - replace with actual logos
    verified: true,
    category: "Healthcare",
  },
  {
    id: "2",
    name: "The Umoya Foundation",
    logo: "/assets/img/logo.png",
    verified: true,
    category: "Sports",
  },
  {
    id: "3",
    name: "Winner with You",
    logo: "/assets/img/logo.png",
    verified: true,
    category: "Arts",
  },
  {
    id: "4",
    name: "Toy Bank Charitable Trust",
    logo: "/assets/img/logo.png",
    verified: true,
    category: "Children",
  },
  {
    id: "5",
    name: "Prathana Foundation",
    logo: "/assets/img/logo.png",
    verified: true,
    category: "Care",
  },
  {
    id: "6",
    name: "Education for All",
    logo: "/assets/img/logo.png",
    verified: true,
    category: "Education",
  },
  {
    id: "7",
    name: "Health First Initiative",
    logo: "/assets/img/logo.png",
    verified: true,
    category: "Healthcare",
  },
  {
    id: "8",
    name: "Women Empowerment Network",
    logo: "/assets/img/logo.png",
    verified: true,
    category: "Empowerment",
  },
];

