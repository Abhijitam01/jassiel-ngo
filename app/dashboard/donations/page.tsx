"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Card from "@/components/shared/Card";
import { Heart, Calendar, TrendingUp } from "lucide-react";

// Mock donation data
const mockDonations = [
  { id: 1, amount: 5000, date: "2024-01-15", cause: "Education for Children", status: "completed" },
  { id: 2, amount: 2500, date: "2024-02-20", cause: "Healthcare Support", status: "completed" },
  { id: 3, amount: 10000, date: "2024-03-10", cause: "Food Distribution", status: "completed" },
  { id: 4, amount: 3000, date: "2024-03-25", cause: "Women Empowerment", status: "pending" },
];

export default function DonationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const totalDonated = mockDonations
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Donations</h1>
          <p className="text-gray-600">View your donation history and impact</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Donated</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalDonated.toLocaleString()}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Heart className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">{mockDonations.length}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <TrendingUp className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockDonations.filter((d) => d.status === "completed").length}
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Calendar className="text-primary" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Donation List */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Donation History</h2>
          <div className="space-y-4">
            {mockDonations.map((donation) => (
              <div
                key={donation.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{donation.cause}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        donation.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(donation.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    ₹{donation.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

