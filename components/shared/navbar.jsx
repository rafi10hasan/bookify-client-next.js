"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { getBackgroundColor } from "@/utils/user-color-name";
import { LogOut, LucideLayoutDashboard, Menu, User, UserCircle2Icon, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DropDownList from "./drop-down-list";
import MobileNavbar from "./mobile-navbar";


export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const loggedinSesion = useAuth();
  let bgColor;
  if (loggedinSesion?.data) {
    bgColor = getBackgroundColor(loggedinSesion?.data?.user?.name);
  }

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        if (response.status === 200) {
          const data = await response.json();
          if (data.length > 0) {
            setCategories(data);
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    }

    getCategories();
  }, []);

  function handleLogout() {
    signOut();
  }
  return (
    <div className="bg-midnight w-full h-20">
      <nav className="flex justify-around items-center h-full">
        <div>
          <h2 className="text-2xl font-semibold text-slate-400">Luxurios Hotel</h2>
        </div>
        <div className="text-white hidden md:flex items-center space-x-8">
          <Link href="/">home</Link>
          <DropDownList categories={categories} />
          <Link href="/my-bookings" className="mr-3">
            my bookings
          </Link>
          <Link href="/contact" className="mr-3">
            contact us
          </Link>
          <Link href="/about-us" className="mr-3">
            About us
          </Link>
        </div>
        {showMobileMenu && (
          <MobileNavbar
            categories={categories}
            isOpen={showMobileMenu}
            onClose={setShowMobileMenu}
          />
        )}
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                {loggedinSesion.data ? (
                  <Avatar className="w-[50px] h-[50px] rounded-full">
                    <AvatarImage className="object-cover" src={loggedinSesion?.data?.user?.image} alt="@shadcn" />
                    <AvatarFallback
                      style={{ backgroundColor: bgColor }}
                      className={cn("text-white")}
                    >
                      {loggedinSesion?.data?.user?.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <UserCircle2Icon className="bg-white text-black size-2 w-8 h-8 rounded-full" />
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-36">
              {!loggedinSesion?.data ? (
                <>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/login">
                      sign in <LogOut className="size-4 ml-2" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/register">
                      sign up <LogOut className="size-4 ml-2" />
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    {loggedinSesion?.data?.user?.role === "admin" ? (
                      <Link href="/dashboard">
                        Dashboard <LucideLayoutDashboard className="size-4 ml-1" />
                      </Link>
                    ) : (
                      <Link href="/account">
                        account <User className="size-4 ml-2" />
                      </Link>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="#" onClick={handleLogout}>
                      Logout <LogOut className="size-4 ml-2" />
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <X className="text-white size-8" />
            ) : (
              <Menu className="text-white size-8" />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
