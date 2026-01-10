import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Jaasiel Foundation",
  description: "Read our latest news, updates, and stories from Jaasiel Foundation.",
  openGraph: {
    title: "Blog - Jaasiel Foundation",
    description: "Read our latest news, updates, and stories from Jaasiel Foundation.",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

