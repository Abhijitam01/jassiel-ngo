import { ReactNode } from "react";
import { Inbox, Search, Image as ImageIcon, Calendar, Users, FileText } from "lucide-react";
import Button from "@/components/shared/Button";
import Link from "next/link";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

const defaultIcons = {
  blog: <FileText size={48} className="text-gray-400" />,
  events: <Calendar size={48} className="text-gray-400" />,
  team: <Users size={48} className="text-gray-400" />,
  gallery: <ImageIcon size={48} className="text-gray-400" />,
  search: <Search size={48} className="text-gray-400" />,
  default: <Inbox size={48} className="text-gray-400" />,
};

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  const displayIcon = icon || defaultIcons.default;

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      <div className="mb-6">{displayIcon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mb-6">{description}</p>
      {action && (
        <>
          {action.href ? (
            <Button variant="primary" size="lg" href={action.href}>
              {action.label}
            </Button>
          ) : action.onClick ? (
            <Button variant="primary" size="lg" onClick={action.onClick}>
              {action.label}
            </Button>
          ) : (
            <Button variant="primary" size="lg">
              {action.label}
            </Button>
          )}
        </>
      )}
    </div>
  );
}

// Pre-built empty state components
export function EmptyBlogPosts() {
  return (
    <EmptyState
      icon={defaultIcons.blog}
      title="No blog posts yet"
      description="We're working on creating great content. Check back soon for updates and stories from our work."
      action={{
        label: "View Other Pages",
        href: "/",
      }}
    />
  );
}

export function EmptyEvents() {
  return (
    <EmptyState
      icon={defaultIcons.events}
      title="No events scheduled"
      description="We don't have any upcoming events at the moment. Stay tuned for future programs and activities."
      action={{
        label: "Contact Us",
        href: "/contact",
      }}
    />
  );
}

export function EmptyTeam() {
  return (
    <EmptyState
      icon={defaultIcons.team}
      title="Team information coming soon"
      description="We're updating our team page with information about our dedicated members."
      action={{
        label: "Learn More About Us",
        href: "/about",
      }}
    />
  );
}

export function EmptyGallery() {
  return (
    <EmptyState
      icon={defaultIcons.gallery}
      title="No images found"
      description="We're working on adding more photos from our programs and events. Check back soon!"
      action={{
        label: "View Our Work",
        href: "/causes",
      }}
    />
  );
}

export function EmptySearchResults({ query }: { query?: string }) {
  return (
    <EmptyState
      icon={defaultIcons.search}
      title={query ? `No results for "${query}"` : "No search results"}
      description="Try adjusting your search terms or browse our main pages to find what you're looking for."
      action={{
        label: "Browse All Pages",
        href: "/",
      }}
    />
  );
}

