"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  mobile?: boolean;
}

export default function Navigation({ mobile = false }: NavigationProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const isParentActive = (submenu: any[]) => {
    return submenu.some((item) => {
      if (item.submenu) {
        return isParentActive(item.submenu);
      }
      return isActive(item.href);
    });
  };

  const navItems = [
    { href: "/donate", label: "Donate" },
    { href: "/impact-stories", label: "Our Impact" },
    {
      label: "About",
      submenu: [
        { href: "/about", label: "About Us" },
        { href: "/team", label: "Our Team" },
        { href: "/causes", label: "Our Causes" },
      ],
    },
    {
      label: "More",
      submenu: [
        { href: "/blog", label: "Blog" },
        { href: "/events", label: "Events" },
        { href: "/volunteer", label: "Volunteer" },
        { href: "/contact", label: "Contact" },
        { href: "/faq", label: "FAQ" },
      ],
    },
  ];

  const baseClasses = mobile
    ? "flex flex-col space-y-2"
    : "flex items-center space-x-6";

  return (
    <nav role="navigation" aria-label="Main navigation">
      <ul className={baseClasses}>
        {navItems.map((item, index) => (
          <li key={index} className="relative group">
          {item.submenu ? (
            <div className="relative">
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
                  "hover:text-primary",
                  isParentActive(item.submenu) && "text-primary font-semibold",
                  mobile && "w-full text-left"
                )}
                onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                onMouseEnter={() => !mobile && setOpenDropdown(item.label)}
                onMouseLeave={() => !mobile && setOpenDropdown(null)}
                aria-expanded={openDropdown === item.label}
                aria-haspopup="true"
              >
                {item.label}
                <ChevronDown 
                  size={16} 
                  className={cn(
                    "transition-transform",
                    openDropdown === item.label && "rotate-180"
                  )} 
                />
              </button>
              {(openDropdown === item.label || (!mobile && openDropdown === null)) && (
                <ul 
                  className={cn(
                    mobile ? "ml-4 mt-2 space-y-1" : "absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-50",
                    !mobile && "opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                  )}
                  onMouseEnter={() => !mobile && setOpenDropdown(item.label)}
                  onMouseLeave={() => !mobile && setOpenDropdown(null)}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      {subItem.submenu ? (
                        <div className="relative">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                            onClick={() => setOpenDropdown(openDropdown === subItem.label ? null : subItem.label)}
                          >
                            {subItem.label}
                            <ChevronDown size={16} />
                          </button>
                          {openDropdown === subItem.label && (
                            <ul className={cn(mobile ? "ml-4" : "absolute left-full top-0 ml-1 bg-white shadow-lg rounded-md py-2 min-w-[200px]")}>
                              {subItem.submenu.map((nestedItem, nestedIndex) => (
                                <li key={nestedIndex}>
                                  <Link
                                    href={nestedItem.href}
                                    className={cn(
                                      "block px-4 py-2 hover:bg-gray-100",
                                      isActive(nestedItem.href) && "text-primary font-semibold"
                                    )}
                                  >
                                    {nestedItem.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                            <Link
                              href={subItem.href}
                              role="menuitem"
                              className={cn(
                                "block px-4 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary rounded-md",
                                isActive(subItem.href) && "text-primary font-semibold"
                              )}
                              tabIndex={openDropdown === item.label ? 0 : -1}
                            >
                              {subItem.label}
                            </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-md transition-colors block relative",
                isActive(item.href) 
                  ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
                  : "hover:text-primary"
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
      </ul>
    </nav>
  );
}

