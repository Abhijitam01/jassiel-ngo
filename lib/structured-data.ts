/**
 * Structured data (JSON-LD) utilities for SEO
 */

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    "@type": string;
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs: string[];
}

export function getOrganizationSchema(): OrganizationSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jaasielfoundation.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Jaasiel Foundation",
    url: baseUrl,
    logo: `${baseUrl}/assets/img/logo.png`,
    description: "A registered voluntary organisation working with the most vulnerable groups of children, especially street and working children since 2014.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B-19, Dwarka",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110045",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+987-0986-0987",
      contactType: "Customer Service",
      email: "support@jaasielfoundation.com",
    },
    sameAs: [
      process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
      process.env.NEXT_PUBLIC_TWITTER_URL || "",
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
      process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    ].filter(Boolean),
  };
}

export interface BlogPostSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": string;
    name: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
}

export function getBlogPostSchema(post: {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  slug: string;
}): BlogPostSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jaasielfoundation.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Jaasiel Foundation",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/img/logo.png`,
      },
    },
  };
}

export interface EventSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  startDate: string;
  location: {
    "@type": string;
    name: string;
  };
  image: string;
  organizer: {
    "@type": string;
    name: string;
  };
}

export function getEventSchema(event: {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}): EventSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jaasielfoundation.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    location: {
      "@type": "Place",
      name: event.location,
    },
    image: `${baseUrl}${event.image}`,
    organizer: {
      "@type": "Organization",
      name: "Jaasiel Foundation",
    },
  };
}

