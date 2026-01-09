"use client";

import { MapPin } from "lucide-react";

interface MapPlaceholderProps {
  address: string;
  className?: string;
}

export default function MapPlaceholder({ address, className = "" }: MapPlaceholderProps) {
  return (
    <div className={`bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      <div className="relative h-96 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="text-center p-8">
          <MapPin className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-bold text-gray-700 mb-2">Office Location</h3>
          <p className="text-gray-600 mb-4">{address}</p>
          <p className="text-sm text-gray-500">
            Map integration can be added here with Google Maps API
          </p>
          <p className="text-xs text-gray-400 mt-2">
            To enable: Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables
          </p>
        </div>
      </div>
    </div>
  );
}

