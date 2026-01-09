import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
}: SkeletonProps) {
  const baseStyles = "animate-pulse bg-gray-200 rounded relative overflow-hidden";
  
  const variants = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={style}
      aria-label="Loading..."
    >
      <div className="absolute inset-0 shimmer" />
    </div>
  );
}

// Pre-built skeleton components
export function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <Skeleton variant="rectangular" height={200} className="w-full" />
      <Skeleton variant="text" width="80%" height={24} />
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="90%" height={16} />
      <Skeleton variant="text" width="70%" height={16} />
    </div>
  );
}

export function SkeletonBlogPost() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton variant="rectangular" height={250} className="w-full" />
      <div className="p-6 space-y-4">
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="100%" height={24} />
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="90%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
        <div className="flex items-center gap-4 mt-4">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" height={16} />
            <Skeleton variant="text" width="30%" height={14} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonEvent() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton variant="rectangular" height={200} className="w-full" />
      <div className="p-6 space-y-3">
        <Skeleton variant="text" width="50%" height={20} />
        <Skeleton variant="text" width="100%" height={24} />
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="60%" height={16} />
        <div className="flex gap-2 mt-4">
          <Skeleton variant="rectangular" width={100} height={32} />
          <Skeleton variant="rectangular" width={100} height={32} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTeamMember() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
      <Skeleton variant="circular" width={150} height={150} className="mx-auto mt-6" />
      <div className="p-6 space-y-2">
        <Skeleton variant="text" width="60%" height={24} className="mx-auto" />
        <Skeleton variant="text" width="40%" height={18} className="mx-auto" />
        <Skeleton variant="text" width="80%" height={16} className="mx-auto" />
        <Skeleton variant="text" width="70%" height={16} className="mx-auto" />
        <div className="flex justify-center gap-3 mt-4">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={300} className="w-full" />
      ))}
    </div>
  );
}

export function SkeletonForm() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <Skeleton variant="text" width="40%" height={24} />
      <Skeleton variant="rectangular" height={48} className="w-full" />
      <Skeleton variant="rectangular" height={48} className="w-full" />
      <Skeleton variant="rectangular" height={48} className="w-full" />
      <Skeleton variant="rectangular" height={120} className="w-full" />
      <Skeleton variant="rectangular" width={120} height={44} />
    </div>
  );
}

