import Image from "next/image";
import { teamMembers } from "@/data/team";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import { Users, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export const metadata = {
  title: "Our Team - Jaasiel Foundation",
  description: "Meet the dedicated team members of Jaasiel Foundation who work tirelessly to make a difference.",
};

export default function TeamPage() {
  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="text-white" size={32} />
            <span className="text-lg font-semibold">Our Team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Dedicated individuals working together to create positive change
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} hover className="text-center">
                <div className="relative h-64 w-full mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  )}
                  {member.social && (
                    <div className="flex justify-center gap-3">
                      {member.social.facebook && (
                        <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                          <Facebook size={20} />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                          <Twitter size={20} />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                          <Linkedin size={20} />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                          <Instagram size={20} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Team</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Are you passionate about making a difference? We&apos;re always looking for dedicated individuals to join our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/volunteer">
              Become a Volunteer
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

