"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ArrowUp,
  Heart,
  Shield,
  Award,
  FileText,
  Users,
  Calendar,
  HelpCircle
} from "lucide-react";
import { useBrailleMode } from "@/components/shared/BrailleModeProvider";
import { socialLinks } from "@/lib/social";
import NewsletterForm from "@/components/shared/NewsletterForm";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export default function Footer() {
  const { isBrailleMode } = useBrailleMode();
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Back to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get recent blog posts
  const recentPosts = blogPosts.slice(0, 3);
  
  // Hide footer in braille mode for cleaner experience
  if (isBrailleMode) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Pre-Footer CTA Section */}
      <section className="bg-white py-16 w-full">
        <div className="px-4 mx-auto max-w-[95rem]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <Heart className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-secondary">Make a Difference</h3>
              <p className="text-black mb-4">Your donation can change lives</p>
              <Link 
                href="/donate" 
                className="bg-white text-primary border-2 border-primary px-6 py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                aria-label="Donate now"
              >
                Donate Now
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-secondary">Join Our Mission</h3>
              <p className="text-black mb-4">Become a volunteer today</p>
              <Link 
                href="/volunteer" 
                className="bg-white text-primary border-2 border-primary px-6 py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                aria-label="Become a volunteer"
              >
                Volunteer
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <Mail className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-secondary">Stay Connected</h3>
              <p className="text-black mb-4">Get updates on our work</p>
              <Link 
                href="#newsletter" 
                className="bg-white text-primary border-2 border-primary px-6 py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="relative bg-gray-900 text-gray-300 w-full">
        <div className="px-4 mx-auto max-w-[95rem] pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* About Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4">Jaasiel Foundation</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  A registered voluntary organisation working with the most vulnerable groups of children, especially street and working children since <span className="text-white font-semibold">2014</span>.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Shield className="text-primary" size={16} />
                  <span>Registered NGO • Trusted Since 2014</span>
                </div>
              </div>
              
              {/* Social Media */}
              {(socialLinks.facebook !== "#" || socialLinks.twitter !== "#" || socialLinks.instagram !== "#" || socialLinks.linkedin !== "#") && (
                <div>
                  <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                  <div className="flex gap-3">
                    {socialLinks.facebook !== "#" && (
                      <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-primary text-gray-300 hover:text-white rounded-lg p-2.5 transition-all duration-300"
                        aria-label="Follow us on Facebook"
                      >
                        <Facebook size={20} />
                      </a>
                    )}
                    {socialLinks.twitter !== "#" && (
                      <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-primary text-gray-300 hover:text-white rounded-lg p-2.5 transition-all duration-300"
                        aria-label="Follow us on Twitter"
                      >
                        <Twitter size={20} />
                      </a>
                    )}
                    {socialLinks.instagram !== "#" && (
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-primary text-gray-300 hover:text-white rounded-lg p-2.5 transition-all duration-300"
                        aria-label="Follow us on Instagram"
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                    {socialLinks.linkedin !== "#" && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-primary text-gray-300 hover:text-white rounded-lg p-2.5 transition-all duration-300"
                        aria-label="Follow us on LinkedIn"
                      >
                        <Linkedin size={20} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/causes" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    Our Causes
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    Blog & News
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/impact-stories" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    Impact Stories
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary">
                Get Involved
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/donate" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    Donate Now
                  </Link>
                </li>
                <li>
                  <Link href="/volunteer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    Become a Volunteer
                  </Link>
                </li>
                <li>
                  <Link href="/causes" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    Support a Cause
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    Partner With Us
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    Annual Reports
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-primary transition-colors"></span>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Recent News */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary">
                Contact Info
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 flex-shrink-0 text-primary" size={18} />
                  <div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      B-19, Dwarka, New Delhi,<br />India - 110045
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 flex-shrink-0 text-primary" size={18} />
                  <div>
                    <a href="tel:+987-0986-0987" className="text-gray-400 hover:text-white transition-colors text-sm">
                      +91 987-0986-0987
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 flex-shrink-0 text-primary" size={18} />
                  <div>
                    <a href="mailto:info@jaasielfoundation.com" className="text-gray-400 hover:text-white transition-colors text-sm break-all">
                      info@jaasielfoundation.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Recent News */}
              <div>
                <h4 className="text-white font-semibold mb-5 text-base">Recent News</h4>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Link 
                      key={post.id} 
                      href={`/blog/${post.slug}`} 
                      className="flex gap-4 group"
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={72}
                        height={72}
                        className="rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-gray-400 group-hover:text-white transition-colors text-base font-medium line-clamp-2 mb-1.5">
                          {post.title}
                        </h5>
                        <p className="text-gray-500 text-sm">{formatDate(post.date)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div id="newsletter" className="border-t border-gray-800 pt-12 mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Stay Updated</h3>
                <p className="text-gray-400 mb-4">Subscribe to our newsletter and get the latest updates on our programs and impact</p>
                <p className="text-sm text-gray-500">
                  <span className="text-white font-semibold">Text CARE to 227387</span> to stay connected
                </p>
              </div>
              <NewsletterForm variant="compact" />
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="text-primary" size={20} />
                <span className="text-sm">80G Tax Benefits</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-primary" size={20} />
                <span className="text-sm">Registered NGO</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="text-primary" size={20} />
                <span className="text-sm">10+ Years of Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-primary" size={20} />
                <span className="text-sm">1.6M+ Lives Impacted</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} <span className="text-white font-semibold">Jaasiel Foundation</span>. All Rights Reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Registered under the Indian Trusts Act, 1882
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                  <HelpCircle size={14} />
                  Help
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-primary hover:bg-primary-dark text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        )}
      </footer>
    </>
  );
}

