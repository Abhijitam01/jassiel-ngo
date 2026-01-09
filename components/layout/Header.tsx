"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Facebook, Twitter, Instagram, Linkedin, User, LogOut, LayoutDashboard, Globe, Eye, EyeOff, ChevronDown } from "lucide-react";
import Navigation from "./Navigation";
import { useSession, signOut } from "next-auth/react";
import { useBrailleMode } from "@/components/shared/BrailleModeProvider";
import { useLanguage } from "@/components/shared/LanguageProvider";
import Button from "@/components/shared/Button";
import { socialLinks } from "@/lib/social";
import SearchBar from "@/components/shared/SearchBar";
import { t } from "@/lib/translations";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const { isBrailleMode, toggleBrailleMode } = useBrailleMode();
  const { language, setLanguage } = useLanguage();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleLanguageChange = (lang: "en" | "hi") => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation - give.do style: clean and simple, absolutely positioned over hero */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center" aria-label="Jaasiel Foundation Home">
              <span className="text-[#DC2626] font-extrabold text-2xl md:text-[28px] tracking-tight hover:text-[#B91C1C] transition-colors">
                JAASIEL FOUNDATION
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              <Navigation />
              
              {/* Search */}
              <SearchBar variant="compact" className="w-64" />
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Select language"
                  aria-expanded={isLanguageMenuOpen}
                >
                  <Globe size={18} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {language === "en" ? "English" : "हिंदी"}
                  </span>
                  <ChevronDown size={16} className="text-gray-600" />
                </button>
                
                {isLanguageMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsLanguageMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                          language === "en" ? "text-primary font-semibold" : "text-gray-700"
                        }`}
                      >
                        <span>English</span>
                        {language === "en" && <span className="ml-auto">✓</span>}
                      </button>
                      <button
                        onClick={() => handleLanguageChange("hi")}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                          language === "hi" ? "text-primary font-semibold" : "text-gray-700"
                        }`}
                      >
                        <span>हिंदी</span>
                        {language === "hi" && <span className="ml-auto">✓</span>}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Braille Toggle */}
              <button
                onClick={toggleBrailleMode}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isBrailleMode
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                aria-label={isBrailleMode ? "Disable braille mode" : "Enable braille mode"}
                title={isBrailleMode ? t("braille.disable", language) : t("braille.enable", language)}
              >
                {isBrailleMode ? <EyeOff size={18} /> : <Eye size={18} />}
                <span className="text-sm font-medium hidden xl:inline">
                  {isBrailleMode ? t("braille.mode", language) : t("braille.mode", language)}
                </span>
              </button>
              
              {/* User Menu */}
              {status === "loading" ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm shadow-sm">
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="hidden xl:block text-sm font-semibold text-gray-700">
                      {session.user?.name || "User"}
                    </span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LayoutDashboard size={16} />
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User size={16} />
                          Profile
                        </Link>
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" href="/login" className="hidden md:flex">
                    Login
                  </Button>
                  <Button variant="primary" size="sm" href="/login" className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 font-semibold">
                    Login
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Search and Menu */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Language & Braille Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Select language"
                >
                  <Globe size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={toggleBrailleMode}
                  className={`p-2 rounded-lg transition-colors ${
                    isBrailleMode
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                  aria-label={isBrailleMode ? "Disable braille mode" : "Enable braille mode"}
                >
                  {isBrailleMode ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {isLanguageMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLanguageMenuOpen(false)}
                  />
                  <div className="fixed top-16 right-4 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => handleLanguageChange("en")}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                        language === "en" ? "text-primary font-semibold" : "text-gray-700"
                      }`}
                    >
                      <span>English</span>
                      {language === "en" && <span className="ml-auto">✓</span>}
                    </button>
                    <button
                      onClick={() => handleLanguageChange("hi")}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                        language === "hi" ? "text-primary font-semibold" : "text-gray-700"
                      }`}
                    >
                      <span>हिंदी</span>
                      {language === "hi" && <span className="ml-auto">✓</span>}
                    </button>
                  </div>
                </>
              )}
              
              <SearchBar variant="compact" className="w-32" />
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Sidebar Toggle */}
            <button
              className="hidden lg:block p-2 ml-4"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <Navigation mobile />
              <div className="mt-4 pt-4 border-t">
                {/* Mobile Language & Braille Controls */}
                <div className="px-4 mb-4 flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Language:</span>
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`px-3 py-1 rounded text-sm ${
                      language === "en"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange("hi")}
                    className={`px-3 py-1 rounded text-sm ${
                      language === "hi"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    हिंदी
                  </button>
                </div>
                <div className="px-4 mb-4">
                  <button
                    onClick={toggleBrailleMode}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
                      isBrailleMode
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {isBrailleMode ? <EyeOff size={18} /> : <Eye size={18} />}
                    <span>{isBrailleMode ? t("braille.disable", language) : t("braille.enable", language)}</span>
                  </button>
                </div>
                {session ? (
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 px-4">
                    <Button variant="outline" size="sm" href="/login" className="w-full">
                      Login
                    </Button>
                    <Button variant="primary" size="sm" href="/login" className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 font-semibold">
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Modal */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50" onClick={() => setIsSidebarOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold text-secondary">Jaasiel Foundation</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-600 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>
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
      )}
    </>
  );
}

