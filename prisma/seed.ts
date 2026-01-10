/**
 * Prisma seed script
 * Migrates static data files to database
 */

import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/password";
import { causes } from "../data/causes";
import { blogPosts } from "../data/blog";
import { events } from "../data/events";
import { teamMembers } from "../data/team";
import { faqs } from "../data/faq";
import { monthlyMissions } from "../data/monthlyMissions";
import { partners } from "../data/partners";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create default admin user
  const adminPassword = await hashPassword("admin123");
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@jaasielfoundation.com" },
    update: {},
    create: {
      email: "admin@jaasielfoundation.com",
      phone: "9876543210",
      password: adminPassword,
      name: "Admin User",
      role: "ADMIN",
      emailVerified: true,
      phoneVerified: true,
    },
  });
  console.log("✅ Created admin user");

  // Create author user for blog posts
  const authorPassword = await hashPassword("author123");
  const authorUser = await prisma.user.upsert({
    where: { email: "author@jaasielfoundation.com" },
    update: {},
    create: {
      email: "author@jaasielfoundation.com",
      password: authorPassword,
      name: "Jaasiel Foundation",
      role: "USER",
      emailVerified: true,
    },
  });
  console.log("✅ Created author user");

  // Seed Causes
  console.log("📊 Seeding causes...");
  for (const cause of causes) {
    await prisma.cause.upsert({
      where: { slug: cause.slug },
      update: {
        title: cause.title,
        description: cause.description,
        fullDescription: cause.fullDescription,
        image: cause.image,
        category: cause.category,
        goal: cause.goal ? cause.goal : null,
        raised: cause.raised ? cause.raised : 0,
      },
      create: {
        slug: cause.slug,
        title: cause.title,
        description: cause.description,
        fullDescription: cause.fullDescription,
        image: cause.image,
        category: cause.category,
        status: "ACTIVE",
        goal: cause.goal ? cause.goal : null,
        raised: cause.raised ? cause.raised : 0,
        donorsCount: 0,
      },
    });
  }
  console.log(`✅ Seeded ${causes.length} causes`);

  // Seed Blog Posts
  console.log("📝 Seeding blog posts...");
  for (const post of blogPosts) {
    const publishedDate = new Date(post.date);
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        date: publishedDate,
        publishedAt: publishedDate,
        category: post.category,
        tags: post.tags || [],
        status: "PUBLISHED",
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        authorId: authorUser.id,
        date: publishedDate,
        publishedAt: publishedDate,
        category: post.category,
        tags: post.tags || [],
        status: "PUBLISHED",
      },
    });
  }
  console.log(`✅ Seeded ${blogPosts.length} blog posts`);

  // Seed Events
  console.log("📅 Seeding events...");
  for (const event of events) {
    const eventDate = new Date(event.date);
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {
        title: event.title,
        description: event.description,
        fullDescription: event.fullDescription,
        image: event.image,
        date: eventDate,
        location: event.location,
        time: event.time || null,
        category: event.category,
      },
      create: {
        slug: event.slug,
        title: event.title,
        description: event.description,
        fullDescription: event.fullDescription,
        image: event.image,
        date: eventDate,
        location: event.location,
        time: event.time || null,
        category: event.category,
        status: eventDate > new Date() ? "UPCOMING" : "COMPLETED",
        organizerId: adminUser.id,
      },
    });
  }
  console.log(`✅ Seeded ${events.length} events`);

  // Seed Team Members
  console.log("👥 Seeding team members...");
  for (let i = 0; i < teamMembers.length; i++) {
    const member = teamMembers[i];
    await prisma.teamMember.upsert({
      where: { id: `team-${member.id}` },
      update: {
        name: member.name,
        role: member.role,
        image: member.image,
        bio: member.bio || null,
        socialLinks: member.social ? {
          facebook: member.social.facebook || null,
          twitter: member.social.twitter || null,
          linkedin: member.social.linkedin || null,
          instagram: member.social.instagram || null,
        } : null,
      },
      create: {
        id: `team-${member.id}`,
        name: member.name,
        role: member.role,
        image: member.image,
        bio: member.bio || null,
        socialLinks: member.social ? {
          facebook: member.social.facebook || null,
          twitter: member.social.twitter || null,
          linkedin: member.social.linkedin || null,
          instagram: member.social.instagram || null,
        } : null,
      },
    });
  }
  console.log(`✅ Seeded ${teamMembers.length} team members`);

  // Seed FAQs
  console.log("❓ Seeding FAQs...");
  for (let i = 0; i < faqs.length; i++) {
    const faq = faqs[i];
    await prisma.fAQ.upsert({
      where: { id: `faq-${faq.id}` },
      update: {
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: i,
      },
      create: {
        id: `faq-${faq.id}`,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: i,
      },
    });
  }
  console.log(`✅ Seeded ${faqs.length} FAQs`);

  // Seed Monthly Missions
  console.log("🎯 Seeding monthly missions...");
  for (let i = 0; i < monthlyMissions.length; i++) {
    const mission = monthlyMissions[i];
    await prisma.monthlyMission.upsert({
      where: { slug: mission.slug },
      update: {
        title: mission.title,
        description: mission.description,
        icon: mission.icon,
        featured: mission.featured || false,
        image: mission.image || null,
        order: i,
      },
      create: {
        slug: mission.slug,
        title: mission.title,
        description: mission.description,
        icon: mission.icon,
        featured: mission.featured || false,
        image: mission.image || null,
        order: i,
      },
    });
  }
  console.log(`✅ Seeded ${monthlyMissions.length} monthly missions`);

  // Seed Partners
  console.log("🤝 Seeding partners...");
  for (let i = 0; i < partners.length; i++) {
    const partner = partners[i];
    await prisma.partner.upsert({
      where: { id: `partner-${partner.id}` },
      update: {
        name: partner.name,
        logo: partner.logo,
        verified: partner.verified,
        category: partner.category || null,
      },
      create: {
        id: `partner-${partner.id}`,
        name: partner.name,
        logo: partner.logo,
        verified: partner.verified,
        category: partner.category || null,
      },
    });
  }
  console.log(`✅ Seeded ${partners.length} partners`);

  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

