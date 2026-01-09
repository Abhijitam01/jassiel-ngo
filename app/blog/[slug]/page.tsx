import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import ShareButtons from "@/components/ui/ShareButtons";
import { getBlogPostSchema } from "@/lib/structured-data";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: `${post.title} - Jaasiel Foundation`,
    description: post.excerpt,
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const blogPostSchema = getBlogPostSchema(post);

  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="relative h-96">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Calendar size={18} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <User size={18} />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          <div className="prose max-w-none">
            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="text-gray-700 leading-relaxed text-lg">
              <p className="text-xl font-semibold mb-6 text-gray-900">{post.excerpt}</p>
              <div className="whitespace-pre-line">{post.content}</div>
            </div>
          </div>

          {/* Social Sharing */}
          <div className="mt-8 pt-8 border-t">
            <ShareButtons
              url={`/blog/${post.slug}`}
              title={post.title}
              description={post.excerpt}
            />
          </div>
        </div>
      </article>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
    </div>
  );
}

