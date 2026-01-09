import DonationForm from "@/components/shared/DonationForm";
import DonationProgress from "@/components/shared/DonationProgress";
import { Heart, DollarSign } from "lucide-react";

export const metadata = {
  title: "Donate - Jaasiel Foundation",
  description: "Make a donation to support our causes and help make a difference in the lives of underprivileged children and communities.",
};

export default function DonatePage() {
  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="text-white" size={32} />
            <span className="text-lg font-semibold">Donate</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Donation</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your contribution helps us make a difference in the lives of those in need
          </p>
        </div>
      </div>

      {/* Donation Progress */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <DonationProgress
              goal={1000000}
              raised={650000}
              donors={1250}
            />
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Donate?</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Your donation directly supports our programs that help underprivileged children access education, healthcare, and opportunities for a better future.
                </p>
                <p>
                  Every contribution, no matter how small, makes a significant impact. Your support helps us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide education and school supplies to children</li>
                  <li>Organize health camps and medical assistance</li>
                  <li>Support women empowerment programs</li>
                  <li>Care for the elderly and destitute</li>
                  <li>Offer vocational training and skill development</li>
                </ul>
                <div className="bg-primary/10 p-6 rounded-lg mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="text-primary" size={24} />
                    <h3 className="font-bold text-lg">Tax Benefits</h3>
                  </div>
                  <p className="text-gray-700">
                    All donations to Jaasiel Foundation are eligible for tax deduction under Section 80G of the Income Tax Act.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <DonationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

