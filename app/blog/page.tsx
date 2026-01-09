import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import Card from "@/components/shared/Card";
import { BookOpen, Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog - Jaasiel Foundation",
  description: "Read our latest news, updates, and stories from Jaasiel Foundation.",
};

// Cache blog page for 1 hour
export const revalidate = 3600;

export default function BlogPage() {
  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="text-white" size={32} />
            <span className="text-lg font-semibold">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Stories, updates, and insights from our work
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} hover className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-2"
                  >
                    Read More
                    <span>→</span>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

