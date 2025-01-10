"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { getBackgroundColor } from "@/utils/user-color-name";
import { BookIcon, DollarSign, Lock, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AccountSidebar() {
  const { data: session } = useAuth();
  const pathname = usePathname();
  let bgColor;
  if (session?.user?.name) {
    bgColor = getBackgroundColor(session?.user?.name[0]);
  }
  return (
    <div className="space-y-2">
      <div className="flex flex-col items-center gap-2 my-2">
        {
          <Avatar className="w-[50px] h-[50px] rounded-full">
            <AvatarImage className=" object-cover" src={session?.user?.image} alt={session?.user} />
            <AvatarFallback style={{ backgroundColor: bgColor }} className={cn("text-white")}>
              {session?.user?.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        }

        <h1 className="font-semibold">{session?.user?.name}</h1>
      </div>
      <Separator className="border w-full" />
      <nav className="px-4 pb-5">
        <ul className="space-y-2">
          <li
            className={`w-full rounded-sm h-8 flex gap-1 items-center px-2 py-1 font-semibold ${
              pathname.includes("profile-info") ? "bg-gray-200" : null
            }`}
          >
            <span>
              <User />
            </span>
            <Link href="/account/profile-info">Profile Info</Link>
          </li>
          <li
            className={`w-full rounded-sm h-8 flex gap-1 items-center px-2 py-1 font-semibold ${
              pathname.includes("password") ? "bg-gray-200" : null
            }`}
          >
            <span>
              <Lock />
            </span>
            <Link href="/account/password">Password</Link>
          </li>
          <li
            className={`w-full rounded-sm h-8 flex gap-1 items-center px-2 py-1 font-semibold ${
              pathname.includes("transaction") ? "bg-gray-200" : null
            }`}
          >
            <span>
              <DollarSign />
            </span>
            <Link href="/account/transaction">Transactions</Link>
          </li>
          <li
            className={`w-full rounded-sm h-8 flex gap-1 items-center px-2 py-1 font-semibold ${
              pathname.includes("bookings") ? "bg-gray-200" : null
            }`}
          >
            <span>
              <BookIcon />
            </span>
            <Link href="/account/my-bookings">Bookings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
