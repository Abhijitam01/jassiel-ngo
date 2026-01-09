"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const defaultFallback = "/assets/img/logo.png";

export default function ImageWithFallback({
  src,
  alt,
  fallback = defaultFallback,
  fill,
  width,
  height,
  className,
  priority = false,
  sizes,
  objectFit = "cover",
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== fallback) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  const imageProps = {
    src: imgSrc,
    alt,
    className: cn(className, hasError && "opacity-50"),
    onError: handleError,
    priority,
    sizes,
  };

  if (fill) {
    return (
      <div className="relative w-full h-full">
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <ImageIcon className="text-gray-400" size={48} />
          </div>
        ) : (
          <Image
            {...imageProps}
            alt={alt}
            fill
            style={{ objectFit }}
          />
        )}
      </div>
    );
  }

  if (width && height) {
    return (
      <>
        {hasError ? (
          <div
            className={cn(
              "flex items-center justify-center bg-gray-100",
              className
            )}
            style={{ width, height }}
          >
            <ImageIcon className="text-gray-400" size={48} />
          </div>
        ) : (
          <Image
            {...imageProps}
            alt={alt}
            width={width}
            height={height}
            style={{ objectFit }}
          />
        )}
      </>
    );
  }

  // Fallback for when neither fill nor dimensions are provided
  return (
    <div className={cn("relative w-full h-full", className)}>
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <ImageIcon className="text-gray-400" size={48} />
        </div>
      ) : (
        <Image
          {...imageProps}
          fill
          style={{ objectFit }}
        />
      )}
    </div>
  );
}

