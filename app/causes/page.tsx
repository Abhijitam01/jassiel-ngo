import Image from "next/image";
import Link from "next/link";
import { causes } from "@/data/causes";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import { Ribbon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Our Causes - Jaasiel Foundation",
  description: "Explore the causes we support including education, women empowerment, old age assistance, vocational studies, and healthcare.",
};

export default function CausesPage() {
  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Ribbon className="text-white" size={32} />
            <span className="text-lg font-semibold">Our Causes</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The causes we care about</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We believe that everything in this world is inter-dependent, and if we wish to live in a better world then it is important to care for it and protect it on every ground.
          </p>
        </div>
      </div>

      {/* Causes Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causes.map((cause) => (
              <Card key={cause.id} hover className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={cause.image}
                    alt={cause.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-4 py-2 rounded-md font-semibold">
                      #{cause.category.toLowerCase()}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{cause.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{cause.description}</p>
                  {cause.goal && cause.raised && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Raised</span>
                        <span className="font-semibold">{formatCurrency(cause.raised)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Goal: {formatCurrency(cause.goal)}
                      </div>
                    </div>
                  )}
                  <Button variant="outline" size="sm" href={`/causes/${cause.slug}`}>
                    Know More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

