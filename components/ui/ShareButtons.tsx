"use client";

import { Facebook, Twitter, Linkedin, Share2, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export default function ShareButtons({
  url,
  title,
  description = "",
  className = "",
}: ShareButtonsProps) {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const fullUrl = typeof window !== "undefined" ? window.location.origin + url : url;

  const shareData = {
    title,
    text: description || title,
    url: fullUrl,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setShowCopySuccess(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + fullUrl)}`,
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-600 mr-2">Share:</span>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-600 hover:text-[#DC2626] hover:bg-red-50 rounded-full transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook size={20} />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-600 hover:text-[#DC2626] hover:bg-red-50 rounded-full transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter size={20} />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-600 hover:text-[#DC2626] hover:bg-red-50 rounded-full transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
        aria-label="Share on WhatsApp"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
      <button
        onClick={handleShare}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share using native share"
      >
        <Share2 size={20} />
      </button>
      <button
        onClick={handleCopyLink}
        className={`p-2 rounded-full transition-colors ${
          showCopySuccess
            ? "text-green-600 bg-green-50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
        aria-label="Copy link"
      >
        <LinkIcon size={20} />
      </button>
    </div>
  );
}

