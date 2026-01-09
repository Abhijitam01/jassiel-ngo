/**
 * Social media URLs configuration
 * Set these in your .env.local file:
 * NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/jaasielfoundation
 * NEXT_PUBLIC_TWITTER_URL=https://twitter.com/jaasielfoundation
 * NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/jaasielfoundation
 * NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/jaasielfoundation
 */

export const socialLinks = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#",
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "#",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
};

export const hasValidSocialLinks = () => {
  return Object.values(socialLinks).some((url) => url !== "#");
};

