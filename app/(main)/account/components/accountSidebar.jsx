"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { getBackgroundColor } from "@/utils/user-color-name";
import { BookOpen, CreditCard, Lock, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountSidebar() {
  const { data: session } = useAuth();
  const pathname = usePathname();

  let bgColor = "#2563eb";
  if (session?.user?.name) {
    bgColor = getBackgroundColor(session?.user?.name[0]);
  }

  const navItems = [
    { label: "Profile Info", href: "/account/profile-info", icon: User },
    { label: "Password", href: "/account/password", icon: Lock },
    { label: "Transactions", href: "/account/transaction", icon: CreditCard },
    { label: "Bookings", href: "/account/my-bookings", icon: BookOpen },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center pt-2">
        <Avatar className="w-16 h-16 rounded-full ring-4 ring-slate-100 shadow-sm mb-3">
          <AvatarImage className="object-cover" src={session?.user?.image} alt={session?.user?.name} />
          <AvatarFallback style={{ backgroundColor: bgColor }} className="text-white font-bold text-xl">
            {session?.user?.name ? session?.user?.name[0].toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
        <h2 className="font-bold text-slate-800 text-lg leading-tight">
          {session?.user?.name || "User"}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">{session?.user?.email}</p>
      </div>

      <div className="h-[1px] bg-slate-100 w-full" />

      {/* Navigation */}
      <nav>
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.includes(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-500")} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}