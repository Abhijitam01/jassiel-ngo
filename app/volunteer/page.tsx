import VolunteerForm from "@/components/shared/VolunteerForm";
import { Users, Heart, Clock } from "lucide-react";

export const metadata = {
  title: "Volunteer - Jaasiel Foundation",
  description: "Join us as a volunteer and make a difference in the lives of underprivileged children and communities.",
};

export default function VolunteerPage() {
  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="text-white" size={32} />
            <span className="text-lg font-semibold">Volunteer</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Volunteer</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Join our team and help make a positive impact in your community
          </p>
        </div>
      </div>

      {/* Volunteer Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Volunteer?</h2>
              <div className="space-y-6 text-gray-700">
                <p>
                  Volunteering with Jaasiel Foundation is a rewarding experience that allows you to make a real difference in the lives of those in need.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Heart className="text-primary mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Make a Difference</h3>
                      <p>Your time and effort directly impact the lives of underprivileged children and families.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="text-primary mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Join a Community</h3>
                      <p>Connect with like-minded individuals who share your passion for social change.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-primary mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Flexible Commitment</h3>
                      <p>Volunteer as much or as little as your schedule allows. Every hour counts!</p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 p-6 rounded-lg mt-6">
                  <h3 className="font-bold text-lg mb-2">Volunteer Opportunities</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Daily food program assistance</li>
                    <li>Education and tutoring</li>
                    <li>Event organization</li>
                    <li>Administrative support</li>
                    <li>Community outreach</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

