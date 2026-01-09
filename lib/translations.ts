/**
 * Translation system for multi-language support
 * Supports English (en) and Hindi (hi)
 */

type TranslationKey = string;
type Translations = Record<string, Record<string, string>>;

const translations: Translations = {
  en: {
    // Navigation
    "nav.donate": "Donate",
    "nav.impact": "Our Impact",
    "nav.about": "About",
    "nav.aboutUs": "About Us",
    "nav.team": "Our Team",
    "nav.causes": "Our Causes",
    "nav.more": "More",
    "nav.blog": "Blog",
    "nav.events": "Events",
    "nav.volunteer": "Volunteer",
    "nav.contact": "Contact",
    "nav.faq": "FAQ",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.profile": "Profile",
    "nav.logout": "Logout",

    // Hero Section
    "hero.slide1.title": "Help Raising Poor Childrens of India",
    "hero.slide1.description": "Registered voluntary organisation working with the most vulnerable groups of children, especially street and working children since 2014",
    "hero.slide2.title": "They wait for your help & Support",
    "hero.slide2.description": "Join hands to hands and contribute to their health, food and education",
    "hero.slide3.title": "Save the Kindness",
    "hero.slide3.description": "HELPING POORS BRINGS PEACE IN YOU AND PROVIDE SATISFACTION IN YOUR LIFETIME. LETS FEEL FREE TO HELP THE PEOPLE WHO ARE NOT HAVING ANYTHING EXCEPT YOUR HELP.",
    "hero.donateNow": "Donate Now",
    "hero.becomeMember": "Become Member",
    "hero.becomeVolunteer": "Become Volunteer",

    // About Section
    "about.title": "About Jaasiel foundation",
    "about.heading": "An registered voluntary organisation",
    "about.subheading": "Your support will help us to make life better living for poor vulnerable children.",
    "about.description": "Jaasiel Foundation is a registered voluntary organisation working with the most vulnerable groups of children, especially street and working children since 2014. With a rights based, non-institutional approach the organisation endeavours to educate and impart life skills to vulnerable children so that they become self reliant. Over the years jaasiel has initiated a number of innovative interventions in the field and partnered with various government and non-government agencies to garner support for children.",
    "about.more": "More about us",

    // Common Buttons
    "button.donate": "Donate Now",
    "button.volunteer": "Become Volunteer",
    "button.learnMore": "Learn More",
    "button.support": "Support",
    "button.readMore": "Read More",
    "button.contact": "Contact Us",
    "button.submit": "Submit",
    "button.send": "Send",

    // Footer
    "footer.about": "About",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.followUs": "Follow Us",
    "footer.copyright": "All rights reserved",

    // Language & Braille
    "lang.english": "English",
    "lang.hindi": "हिंदी",
    "lang.braille": "Braille",
    "lang.select": "Select Language",
    "braille.mode": "Braille Mode",
    "braille.enable": "Enable Braille",
    "braille.disable": "Disable Braille",
    "braille.hoverHint": "Hover anywhere to see normal website",

    // Stats
    "stats.donations": "Donations",
    "stats.ngos": "Verified NGOs",
    "stats.lives": "Lives Impacted",
    "stats.years": "Years of Service",

    // Missions
    "mission.noOrphan": "No Child Orphaned",
    "mission.protectElders": "Protect Abandoned Elders",
    "mission.safeWater": "Safe Water for All",
    "mission.feedHungry": "Feed the Hungry",
    "mission.girlsSchool": "Every Girl in School",

    // Quick Links
    "links.ourCauses": "Our Causes",
    "links.events": "Events",
    "links.contact": "Contact Us",
    "links.blog": "Blog",
  },
  hi: {
    // Navigation
    "nav.donate": "दान करें",
    "nav.impact": "हमारा प्रभाव",
    "nav.about": "के बारे में",
    "nav.aboutUs": "हमारे बारे में",
    "nav.team": "हमारी टीम",
    "nav.causes": "हमारे कारण",
    "nav.more": "अधिक",
    "nav.blog": "ब्लॉग",
    "nav.events": "कार्यक्रम",
    "nav.volunteer": "स्वयंसेवक",
    "nav.contact": "संपर्क करें",
    "nav.faq": "सामान्य प्रश्न",
    "nav.login": "लॉग इन",
    "nav.signup": "साइन अप",
    "nav.dashboard": "डैशबोर्ड",
    "nav.profile": "प्रोफ़ाइल",
    "nav.logout": "लॉग आउट",

    // Hero Section
    "hero.slide1.title": "भारत के गरीब बच्चों की मदद करें",
    "hero.slide1.description": "2014 से विशेष रूप से सड़क और काम करने वाले बच्चों सहित सबसे कमजोर समूहों के साथ काम करने वाला पंजीकृत स्वैच्छिक संगठन",
    "hero.slide2.title": "वे आपकी मदद और समर्थन की प्रतीक्षा कर रहे हैं",
    "hero.slide2.description": "हाथ मिलाएं और उनके स्वास्थ्य, भोजन और शिक्षा में योगदान दें",
    "hero.slide3.title": "दया बचाएं",
    "hero.slide3.description": "गरीबों की मदद करने से आपको शांति मिलती है और आपके जीवन में संतुष्टि मिलती है। आइए उन लोगों की मदद करने के लिए स्वतंत्र महसूस करें जिनके पास आपकी मदद के अलावा कुछ नहीं है।",
    "hero.donateNow": "अभी दान करें",
    "hero.becomeMember": "सदस्य बनें",
    "hero.becomeVolunteer": "स्वयंसेवक बनें",

    // About Section
    "about.title": "जासिएल फाउंडेशन के बारे में",
    "about.heading": "एक पंजीकृत स्वैच्छिक संगठन",
    "about.subheading": "आपका समर्थन हमें गरीब कमजोर बच्चों के लिए बेहतर जीवन जीने में मदद करेगा।",
    "about.description": "जासिएल फाउंडेशन 2014 से बच्चों के सबसे कमजोर समूहों, विशेष रूप से सड़क और काम करने वाले बच्चों के साथ काम करने वाला एक पंजीकृत स्वैच्छिक संगठन है। अधिकार-आधारित, गैर-संस्थागत दृष्टिकोण के साथ संगठन कमजोर बच्चों को शिक्षित करने और जीवन कौशल प्रदान करने का प्रयास करता है ताकि वे आत्मनिर्भर बन सकें। वर्षों से जासिएल ने क्षेत्र में कई नवाचारी हस्तक्षेप शुरू किए हैं और बच्चों के लिए समर्थन जुटाने के लिए विभिन्न सरकारी और गैर-सरकारी एजेंसियों के साथ साझेदारी की है।",
    "about.more": "हमारे बारे में अधिक",

    // Common Buttons
    "button.donate": "अभी दान करें",
    "button.volunteer": "स्वयंसेवक बनें",
    "button.learnMore": "अधिक जानें",
    "button.support": "समर्थन करें",
    "button.readMore": "अधिक पढ़ें",
    "button.contact": "संपर्क करें",
    "button.submit": "जमा करें",
    "button.send": "भेजें",

    // Footer
    "footer.about": "के बारे में",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.contact": "संपर्क",
    "footer.followUs": "हमें फॉलो करें",
    "footer.copyright": "सभी अधिकार सुरक्षित",

    // Language & Braille
    "lang.english": "English",
    "lang.hindi": "हिंदी",
    "lang.braille": "Braille",
    "lang.select": "भाषा चुनें",
    "braille.mode": "ब्रेल मोड",
    "braille.enable": "ब्रेल सक्षम करें",
    "braille.disable": "ब्रेल अक्षम करें",
    "braille.hoverHint": "सामान्य वेबसाइट देखने के लिए कहीं भी होवर करें",

    // Stats
    "stats.donations": "दान",
    "stats.ngos": "सत्यापित एनजीओ",
    "stats.lives": "प्रभावित जीवन",
    "stats.years": "सेवा के वर्ष",

    // Missions
    "mission.noOrphan": "कोई बच्चा अनाथ नहीं",
    "mission.protectElders": "परित्यक्त बुजुर्गों की रक्षा करें",
    "mission.safeWater": "सभी के लिए सुरक्षित पानी",
    "mission.feedHungry": "भूखे को खाना खिलाएं",
    "mission.girlsSchool": "हर लड़की स्कूल में",

    // Quick Links
    "links.ourCauses": "हमारे कारण",
    "links.events": "कार्यक्रम",
    "links.contact": "संपर्क करें",
    "links.blog": "ब्लॉग",
  },
};

/**
 * Get translated text for a given key
 * @param key - Translation key (e.g., "nav.home")
 * @param lang - Language code ("en" | "hi")
 * @returns Translated text or the key if translation not found
 */
export function t(key: TranslationKey, lang: "en" | "hi" = "en"): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}

/**
 * Get all translations for a language
 * @param lang - Language code
 * @returns Object with all translations for the language
 */
export function getTranslations(lang: "en" | "hi" = "en"): Record<string, string> {
  return translations[lang] || translations.en;
}

export default translations;

