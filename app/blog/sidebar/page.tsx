import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import Card from "@/components/shared/Card";
import { BookOpen, Calendar, User, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog - Jaasiel Foundation",
  description: "Read our latest news, updates, and stories from Jaasiel Foundation.",
};

export default function BlogSidebarPage() {
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  const recentPosts = blogPosts.slice(0, 3);

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

      {/* Blog with Sidebar */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <Card key={post.id} hover className="overflow-hidden">
                    <div className="relative h-64">
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
                      <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
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

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Categories */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Tag size={20} />
                      Categories
                    </h3>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category}>
                          <Link
                            href={`/blog?category=${category}`}
                            className="text-gray-700 hover:text-primary transition-colors"
                          >
                            {category}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>

                {/* Recent Posts */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                    <div className="space-y-4">
                      {recentPosts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="flex gap-3 group"
                        >
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {formatDate(post.date)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

