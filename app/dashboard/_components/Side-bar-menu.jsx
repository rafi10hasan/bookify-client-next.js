"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  BedDouble,
  BedSingle,
  Book,
  BookText,
  ChevronRight,
  Grid2x2,
  House,
  LayoutDashboard,
  PlusIcon,
  User,
  Users,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconMap = {
  LayoutDashboard,
  User,
  Users,
  BedSingle,
  BedDouble,
  PlusIcon,
  Grid2x2,
  House,
  Warehouse,
  BookText,
  Book,
};

export default function SideBarMenu({ items }) {
  const pathname = usePathname();

  const renderIcon = (iconName, className = "w-4 h-4 shrink-0") => {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return null;
    return <IconComponent className={className} />;
  };

  return (
    <nav className="space-y-1.5">
      {items.map((item) => {
        const isActive = pathname === item.url;

        if (!item.items) {
          return (
            <Link
              key={item.title}
              href={item.url}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {renderIcon(item.iconName)}
              <span className="capitalize">{item.title}</span>
            </Link>
          );
        }

        return (
          <Collapsible key={item.title} defaultOpen={item.isActive} className="group/collapsible">
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-150 group">
                <div className="flex items-center gap-3">
                  {renderIcon(item.iconName, "w-4 h-4 text-gray-500 group-hover:text-gray-800 shrink-0")}
                  <span className="capitalize">{item.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="pl-9 pr-1 pt-1 space-y-1">
              {item.items?.map((subItem) => {
                const isSubActive = pathname === subItem.url;
                return (
                  <Link
                    key={subItem.title}
                    href={subItem.url}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isSubActive
                        ? "text-blue-600 bg-blue-50 font-bold"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
                    }`}
                  >
                    {renderIcon(subItem.iconName, "w-3.5 h-3.5")}
                    <span className="capitalize">{subItem.title}</span>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </nav>
  );
}