import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "./providers";
import ErrorBoundaryWrapper from "@/components/layout/ErrorBoundaryWrapper";
import SkipToContent from "@/components/layout/SkipToContent";
import LoadingScreenWrapper from "@/components/layout/LoadingScreenWrapper";
import { getOrganizationSchema } from "@/lib/structured-data";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Jaasiel Foundation - Helping the Underprivileged",
  description: "Jaasiel Foundation is a registered voluntary organisation working with the most vulnerable groups of children, especially street and working children since 2014.",
  keywords: ["NGO", "charity", "education", "children", "poverty", "India"],
  openGraph: {
    title: "Jaasiel Foundation - Helping the Underprivileged",
    description: "A registered voluntary organisation working with the most vulnerable groups of children since 2014",
    url: "https://jaasielfoundation.com",
    siteName: "Jaasiel Foundation",
    images: [
      {
        url: "/assets/img/logo.png",
        width: 1200,
        height: 630,
        alt: "Jaasiel Foundation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaasiel Foundation - Helping the Underprivileged",
    description: "A registered voluntary organisation working with the most vulnerable groups of children since 2014",
    images: ["/assets/img/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="Jaasiel Foundation Blog RSS" href="/feed.xml" />
        <meta name="theme-color" content="#DC2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Jaasiel Foundation" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased`} style={{ backgroundColor: '#000' }}>
        <LoadingScreenWrapper />
        <Providers>
          <ErrorBoundaryWrapper>
            <SkipToContent />
            <Header />
            <main id="main-content" className="min-h-screen">{children}</main>
            <Footer />
          </ErrorBoundaryWrapper>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

