import Image from "next/image";
import Button from "@/components/shared/Button";
import { Heart, Target, Users, Award } from "lucide-react";

export const metadata = {
  title: "About Us - Jaasiel Foundation",
  description: "Learn about Jaasiel Foundation, our journey, mission, vision, and the impact we've made since 2014.",
};

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Jaasiel Foundation</h1>
          <p className="text-xl max-w-2xl mx-auto">
            A registered voluntary organisation working with the most vulnerable groups of children
          </p>
        </div>
      </div>

      {/* Our Journey */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="text-primary" size={24} />
                <span className="text-primary font-semibold">Our Journey</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">A glance to the organization</h2>
              <p className="text-primary font-semibold text-lg mb-4">
                Our journey began in March 2014 when a group of youngsters volunteered their time to ignite the minds of those underprivileged poor kids, who were struggling hard every day for their living and could not afford their education fees.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                This world that we call home is not a home for every soul, the sun doesn&apos;t shines bright in everyone&apos;s life. For those below the poverty line life is a struggle, full of challenges. Keeping in mind these challenges our venture grew up into a full-fledged non profitable organisation.
              </p>
              <Button variant="primary" size="lg" href="/contact">
                Get Involved
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64">
                <Image
                  src="/assets/img/about/11.jpg"
                  alt="Our Journey"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="relative h-64">
                <Image
                  src="/assets/img/about/22.jpg"
                  alt="Our Work"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Target className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to empower needy children and communities to break the Vicious Cycle of Poverty where poverty spawns problems of malnourishment and mortality while lack of education ensures children follow in their parents&apos; footsteps scraping a daily existence as manual labor or ragpickers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Award className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To create a world where every child has access to quality education, healthcare, and opportunities to thrive. We envision communities where poverty is eliminated and every individual can live with dignity and self-reliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Since 2014, we&apos;ve been making a difference in the lives of thousands of children and families
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5000+</div>
              <div className="text-gray-700">Children Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100+</div>
              <div className="text-gray-700">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-700">Volunteers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10</div>
              <div className="text-gray-700">Years of Service</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

