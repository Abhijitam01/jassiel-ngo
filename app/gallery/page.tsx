"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { Images } from "lucide-react";

// Gallery images - using existing images from assets
const galleryImages = [
  { id: 1, src: "/assets/img/gallery/1.jpg", category: "Events" },
  { id: 2, src: "/assets/img/gallery/2.jpg", category: "Education" },
  { id: 3, src: "/assets/img/gallery/3.jpg", category: "Events" },
  { id: 4, src: "/assets/img/gallery/4.jpg", category: "Health" },
  { id: 5, src: "/assets/img/gallery/5.jpg", category: "Education" },
  { id: 6, src: "/assets/img/gallery/6.jpg", category: "Events" },
  { id: 7, src: "/assets/img/gallery/7.jpg", category: "Health" },
  { id: 8, src: "/assets/img/gallery/8.jpg", category: "Education" },
  { id: 9, src: "/assets/img/about/1.jpg", category: "Events" },
  { id: 10, src: "/assets/img/about/2.jpg", category: "Health" },
  { id: 11, src: "/assets/img/causes/1.jpg", category: "Education" },
  { id: 12, src: "/assets/img/causes/2.jpg", category: "Events" },
];

const categories = ["All", "Events", "Education", "Health"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Images className="text-white" size={32} />
            <span className="text-lg font-semibold">Gallery</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Moments captured from our programs and events
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative h-64 cursor-pointer overflow-hidden rounded-lg group"
                onClick={() => setSelectedImage(image.id)}
              >
                <Image
                  src={image.src}
                  alt={`Gallery image ${image.id}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="relative max-w-5xl max-h-[90vh]">
            <Image
              src={galleryImages.find(img => img.id === selectedImage)?.src || ""}
              alt="Gallery image"
              width={1200}
              height={800}
              className="object-contain max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

