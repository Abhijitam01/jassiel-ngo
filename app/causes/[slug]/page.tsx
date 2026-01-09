import Image from "next/image";
import { notFound } from "next/navigation";
import { causes } from "@/data/causes";
import Button from "@/components/shared/Button";
import DonationProgress from "@/components/shared/DonationProgress";
import ShareButtons from "@/components/ui/ShareButtons";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return causes.map((cause) => ({
    slug: cause.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const cause = causes.find((c) => c.slug === params.slug);
  if (!cause) {
    return {
      title: "Cause Not Found",
    };
  }
  return {
    title: `${cause.title} - Jaasiel Foundation`,
    description: cause.description,
  };
}

export default function CauseDetailPage({ params }: PageProps) {
  const cause = causes.find((c) => c.slug === params.slug);

  if (!cause) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="relative h-96">
        <Image
          src={cause.image}
          alt={cause.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="text-white" size={32} />
              <span className="text-lg font-semibold">#{cause.category.toLowerCase()}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{cause.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Link
            href="/causes"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft size={20} />
            Back to Causes
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">About This Cause</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">{cause.description}</p>
                <p className="text-gray-700 leading-relaxed">{cause.fullDescription}</p>
              </div>
              
              <div className="mt-8 pt-8 border-t">
                <ShareButtons
                  url={`/causes/${cause.slug}`}
                  title={cause.title}
                  description={cause.description}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-24">
                {cause.goal && cause.raised && (
                  <DonationProgress
                    goal={cause.goal}
                    raised={cause.raised}
                  />
                )}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Support This Cause</h3>
                  <Button variant="primary" size="lg" href="/donate" className="w-full mb-4">
                    Donate Now
                  </Button>
                  <Button variant="outline" size="lg" href="/volunteer" className="w-full">
                    Become a Volunteer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

