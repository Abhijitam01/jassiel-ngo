"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useBrailleMode } from "@/components/shared/BrailleModeProvider";
import { socialLinks } from "@/lib/social";
import NewsletterForm from "@/components/shared/NewsletterForm";

export default function Footer() {
  const { isBrailleMode } = useBrailleMode();
  
  // Hide footer in braille mode for cleaner experience
  if (isBrailleMode) {
    return null;
  }

  return (
    <>
      {/* Sidebar Content - Before Footer */}
      <section className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container mx-auto px-1 max-w-[95rem]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-secondary mb-4">Jaasiel Foundation</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our journey began in <span className="underline-important font-semibold">March 2014</span> when a group of youngsters volunteered their time to ignite the minds of those underprivileged kids who were struggling hard every day for their living and could not afford their school fees.
            </p>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold mb-2 text-secondary">Email Us</h3>
              <a href="mailto:info@jaasielfoundation.com" className="text-primary hover:underline font-semibold underline-important">
                info@jaasielfoundation.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-white border-t border-gray-200 pt-16 pb-16">
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-secondary">Contact info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 flex-shrink-0 text-primary" size={20} />
                <div>
                  <h4 className="font-bold mb-1 text-secondary">Location</h4>
                  <p className="text-gray-600">B-19, Dwarka, New Delhi,<br />India - 110045</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 flex-shrink-0 text-primary" size={20} />
                <div>
                  <h4 className="font-bold mb-1 text-secondary">Call Us</h4>
                  <a href="tel:+987-0986-0987" className="text-gray-600 hover:text-primary transition-colors font-semibold underline-important">
                    987-0986-0987
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 flex-shrink-0 text-primary" size={20} />
                <div>
                  <h4 className="font-bold mb-1 text-secondary">Email Us</h4>
                  <a href="mailto:support@jaasielfoundation.com" className="text-gray-600 hover:text-primary transition-colors font-semibold underline-important">
                    support@jaasielfoundation.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Our Support */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-secondary">Our Support</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors font-medium">Private Policies</Link></li>
              <li><Link href="/donate" className="text-gray-600 hover:text-primary transition-colors font-medium">Donate Now</Link></li>
              <li><Link href="/volunteer" className="text-gray-600 hover:text-primary transition-colors font-medium">Become a Volunteer</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-primary transition-colors font-medium">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-primary transition-colors font-medium">Contact Us</Link></li>
              <li><Link href="/programs" className="text-gray-600 hover:text-primary transition-colors font-medium">Paid programs</Link></li>
              <li><Link href="/partnership" className="text-gray-600 hover:text-primary transition-colors font-medium">Partnership</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-secondary">Our Services</h3>
            <ul className="space-y-2">
              <li><Link href="/donate" className="text-gray-600 hover:text-primary transition-colors font-medium">Donate</Link></li>
              <li><Link href="/sponsor" className="text-gray-600 hover:text-primary transition-colors font-medium">Sponsor</Link></li>
              <li><Link href="/fundraise" className="text-gray-600 hover:text-primary transition-colors font-medium">Fundraise</Link></li>
              <li><Link href="/volunteer" className="text-gray-600 hover:text-primary transition-colors font-medium">Volunteer</Link></li>
              <li><Link href="/partner" className="text-gray-600 hover:text-primary transition-colors font-medium">Partner</Link></li>
              <li><Link href="/jobs" className="text-gray-600 hover:text-primary transition-colors font-medium">Jobs</Link></li>
              <li><Link href="/forms" className="text-gray-600 hover:text-primary transition-colors font-medium">Form</Link></li>
            </ul>
          </div>

          {/* Recent News */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-secondary">Recent News</h3>
            <div className="space-y-4">
              <Link href="/blog/support-about-poverty-to-poor-family" className="flex gap-3 group">
                <Image
                  src="/assets/img/footer-news/1.jpg"
                  alt="News"
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div>
                  <h4 className="font-bold text-secondary group-hover:text-primary transition-colors mb-1">
                    Support about poverty to poor family
                  </h4>
                  <p className="text-sm text-gray-600">Poor, 22 January</p>
                </div>
              </Link>
              <Link href="/blog/mostly-suffered-school-boys-care" className="flex gap-3 group">
                <Image
                  src="/assets/img/footer-news/2.jpg"
                  alt="News"
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div>
                  <h4 className="font-bold text-secondary group-hover:text-primary transition-colors mb-1">
                    Mostly suffered school Boys care
                  </h4>
                  <p className="text-sm text-gray-600">Health, 24 February</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center text-secondary">
              <span className="underline-important">Subscribe to Our Newsletter</span>
            </h3>
            <NewsletterForm variant="compact" />
          </div>
        </div>

        {/* Social Links */}
        {(socialLinks.facebook !== "#" || socialLinks.twitter !== "#" || socialLinks.instagram !== "#" || socialLinks.linkedin !== "#") && (
          <div className="border-t border-gray-200 pt-8 mb-8">
            <div className="flex justify-center gap-4">
              {socialLinks.facebook !== "#" && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary hover:scale-110 transition-all"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook size={24} />
                </a>
              )}
              {socialLinks.twitter !== "#" && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary hover:scale-110 transition-all"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter size={24} />
                </a>
              )}
              {socialLinks.instagram !== "#" && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary hover:scale-110 transition-all"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={24} />
                </a>
              )}
              {socialLinks.linkedin !== "#" && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary hover:scale-110 transition-all"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-[#DC2626] font-extrabold text-xl tracking-tight">
                JAASIEL FOUNDATION
              </span>
            </div>
            <div className="text-gray-600 text-sm text-center font-semibold">
              © 2024 <span className="underline-important">Jaasiel Foundation</span>. All Rights Reserved
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

