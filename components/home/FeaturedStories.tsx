"use client";

import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import Card from "@/components/shared/Card";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

// Get featured stories (first 3-4 blog posts)
const featuredPosts = blogPosts.slice(0, 4);

// Get unique categories
const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

export default function FeaturedStories() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 md:mb-6 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary/10 rounded-full">
            <BookOpen className="text-primary" size={20} />
            <span className="text-primary font-semibold text-sm sm:text-base uppercase tracking-wide">
              Stories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-secondary px-2">
            Stories that matter
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium px-4">
            Read about our programs, people, and communities making a difference
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          {featuredPosts.map((post) => (
            <Card
              key={post.id}
              hover
              variant="elevated"
              className="group overflow-hidden border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Image */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-secondary group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm sm:text-base">Read More</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>See All Stories</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

