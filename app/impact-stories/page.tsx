import Image from "next/image";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import { Heart, Users, BookOpen, TrendingUp } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Impact Stories - Jaasiel Foundation",
  description: "Real stories of transformation and positive impact from our programs and initiatives.",
};

const impactStories = [
  {
    id: 1,
    title: "From Street to School: Priya's Journey",
    category: "Education",
    image: "/assets/img/causes/1.jpg",
    before: "Priya was a 10-year-old street child with no access to education, spending her days helping her family earn a living.",
    after: "Today, Priya is a confident 15-year-old excelling in her studies, with dreams of becoming a teacher. She's been attending our education program for 5 years and is now in 10th grade.",
    impact: "5 years of education support, 100% attendance, top 10% of her class",
    icon: BookOpen,
    stats: { children: 1, years: 5, success: "100%" },
  },
  {
    id: 2,
    title: "Healthcare Access for Elderly Community",
    category: "Healthcare",
    image: "/assets/img/causes/2.jpg",
    before: "A community of 50+ elderly individuals had no access to regular health checkups or medical care.",
    after: "We established a monthly health camp providing free checkups, medicines, and health education. Over 200 elderly people have benefited in the past year.",
    impact: "200+ elderly served, 12 health camps conducted, 95% satisfaction rate",
    icon: Heart,
    stats: { people: 200, camps: 12, satisfaction: "95%" },
  },
  {
    id: 3,
    title: "Women's Empowerment Through Skills Training",
    category: "Women Empowerment",
    image: "/assets/img/causes/3.jpg",
    before: "A group of 30 women from underprivileged backgrounds had no source of income and were dependent on their families.",
    after: "Through our vocational training program, these women learned tailoring, embroidery, and digital skills. 25 of them now run their own small businesses.",
    impact: "30 women trained, 25 businesses started, ₹50,000 average monthly income",
    icon: TrendingUp,
    stats: { women: 30, businesses: 25, income: "₹50K/month" },
  },
  {
    id: 4,
    title: "Community Kitchen: Feeding 500+ Daily",
    category: "Food Security",
    image: "/assets/img/causes/4.jpg",
    before: "Many families in the community struggled with food insecurity, especially during the pandemic.",
    after: "Our community kitchen now serves nutritious meals to 500+ people daily, including children, elderly, and families in need.",
    impact: "500+ meals daily, 365 days operation, 10,000+ families served",
    icon: Users,
    stats: { meals: "500+", days: 365, families: "10K+" },
  },
];

export default function ImpactStoriesPage() {
  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Impact Stories", href: "/impact-stories" },
            ]}
            className="mb-6 text-white/80"
          />
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="text-white" size={32} />
              <span className="text-lg font-semibold">Impact Stories</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Stories of Transformation</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Real stories of hope, change, and positive impact from our programs
            </p>
          </div>
        </div>
      </div>

      {/* Impact Stories Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {impactStories.map((story) => {
              const Icon = story.icon;
              return (
                <Card key={story.id} hover className="overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {story.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="text-primary" size={24} />
                      <h3 className="text-lg md:text-xl font-bold">{story.title}</h3>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <h4 className="font-semibold text-red-900 mb-2">Before</h4>
                        <p className="text-gray-700 text-sm">{story.before}</p>
                      </div>
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <h4 className="font-semibold text-green-900 mb-2">After</h4>
                        <p className="text-gray-700 text-sm">{story.after}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Impact</h4>
                      <p className="text-gray-700 text-sm mb-3">{story.impact}</p>
                      <div className="flex flex-wrap gap-4">
                        {Object.entries(story.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-primary">{value}</div>
                            <div className="text-xs text-gray-600 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Be Part of the Change</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Join us in creating more success stories. Your support can transform lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/donate">
              Donate Now
            </Button>
            <Button variant="outline" size="lg" href="/volunteer">
              Become a Volunteer
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

