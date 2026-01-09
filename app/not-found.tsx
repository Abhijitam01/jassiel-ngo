import Link from "next/link";
import Image from "next/image";
import Button from "@/components/shared/Button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="relative w-64 h-64 mx-auto mb-8">
            <Image
              src="/assets/img/404.png"
              alt="404 Not Found"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/">
              <Home size={20} className="mr-2" />
              Go Home
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              <Search size={20} className="mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

