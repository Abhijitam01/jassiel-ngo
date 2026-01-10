import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isDatabaseConnectionError, getDatabaseErrorMessage } from "@/lib/db-error-handler";

/**
 * GET /api/blog
 * Fetch blog posts with optional filtering
 */
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const featured = searchParams.get("featured") === "true";
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const publishedOnly = searchParams.get("published") !== "false"; // Default to published only

    const where: any = {};

    if (publishedOnly) {
      where.status = "PUBLISHED";
      where.publishedAt = { lte: new Date() };
    }

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = { has: tag };
    }

    if (featured) {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { tags: { hasSome: [search] } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: [
          { featured: "desc" },
          { publishedAt: "desc" },
          { createdAt: "desc" },
        ],
        take: limit,
        skip: offset,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    type PostWithAuthor = (typeof posts)[0];
    const formattedPosts = posts.map((post: PostWithAuthor) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: {
        id: post.author.id,
        name: post.author.name,
        email: post.author.email,
        avatar: post.author.avatar,
      },
      date: post.date.toISOString(),
      publishedAt: post.publishedAt?.toISOString() || null,
      status: post.status,
      category: post.category,
      tags: post.tags,
      viewCount: post.viewCount,
      likeCount: post.likeCount,
      featured: post.featured,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    // Add caching headers
    const response = NextResponse.json({
      posts: formattedPosts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });

    // Cache for 5 minutes
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (error) {
    // Handle database connection errors gracefully
    if (isDatabaseConnectionError(error)) {
      if (process.env.NODE_ENV === "development") {
        console.error("Database connection error:", getDatabaseErrorMessage(error));
      }
      
      // Return empty results instead of error for GET requests
      return NextResponse.json(
        {
          posts: [],
          pagination: {
            total: 0,
            limit: parseInt(request.nextUrl.searchParams.get("limit") || "10"),
            offset: parseInt(request.nextUrl.searchParams.get("offset") || "0"),
            hasMore: false,
          },
        },
        { status: 200 }
      );
    }

    // Log other errors only in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching blog posts:", error);
    }
    
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

