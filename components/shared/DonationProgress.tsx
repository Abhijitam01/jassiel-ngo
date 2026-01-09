"use client";

import { Heart, TrendingUp, Users, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface DonationProgressProps {
  goal: number;
  raised: number;
  donors?: number;
  className?: string;
}

export default function DonationProgress({
  goal,
  raised,
  donors,
  className = "",
}: DonationProgressProps) {
  const percentage = Math.min((raised / goal) * 100, 100);
  const remaining = Math.max(goal - raised, 0);

  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-md", className)}>
      <div className="flex items-center gap-2 mb-6">
        <Heart className="text-primary" size={24} />
        <h3 className="text-xl font-bold">Donation Progress</h3>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Raised</span>
            <span className="text-sm font-bold text-primary">
              ₹{raised.toLocaleString()} / ₹{goal.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-primary-dark h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${percentage}%` }}
            >
              {percentage > 10 && (
                <span className="text-xs font-semibold text-white">
                  {percentage.toFixed(0)}%
                </span>
              )}
            </div>
          </div>
          {percentage < 10 && (
            <div className="text-right mt-1">
              <span className="text-xs font-semibold text-primary">
                {percentage.toFixed(1)}%
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="text-primary" size={16} />
              <span className="text-2xl font-bold text-gray-900">
                ₹{remaining.toLocaleString()}
              </span>
            </div>
            <span className="text-xs text-gray-600">Remaining</span>
          </div>
          {donors !== undefined && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="text-primary" size={16} />
                <span className="text-2xl font-bold text-gray-900">{donors}</span>
              </div>
              <span className="text-xs text-gray-600">Donors</span>
            </div>
          )}
        </div>

        {/* Goal Indicator */}
        {percentage >= 100 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <Target className="text-green-600 mx-auto mb-2" size={24} />
            <p className="text-green-800 font-semibold">Goal Achieved! 🎉</p>
            <p className="text-green-700 text-sm mt-1">
              Thank you to all our generous donors!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

