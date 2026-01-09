"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Card from "@/components/shared/Card";
import { Bell, Lock, Shield } from "lucide-react";

export default function SettingsPage() {
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

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences</p>
        </div>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive email updates about your donations and activities
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-gray-900">Event Reminders</p>
                <p className="text-sm text-gray-600">
                  Get notified about upcoming events
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-gray-900">Newsletter</p>
                <p className="text-sm text-gray-600">
                  Subscribe to our monthly newsletter
                </p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </label>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Security</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="px-6 py-3 bg-primary text-white rounded-md font-semibold hover:bg-primary-dark transition-colors">
              Update Password
            </button>
          </div>
        </Card>

        {/* Privacy */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Privacy</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-gray-900">Public Profile</p>
                <p className="text-sm text-gray-600">
                  Allow others to see your volunteer activities
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-gray-900">Show Donations</p>
                <p className="text-sm text-gray-600">
                  Display your donation history publicly
                </p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </label>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

