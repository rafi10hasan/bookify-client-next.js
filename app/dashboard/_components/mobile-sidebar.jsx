
'use client'
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import AccountMenu from "./account-menu";
import SideBarMenu from "./Side-bar-menu";
import {data} from './menu-data'
import { useAuth } from "@/hooks/use-auth";
export default function Mobilesidebar() {
    const { data: session } = useAuth();
  return (
    <div className="block h-4 xl:hidden">
      <Sheet>
        <SheetTrigger>
              <Menu className="mt-4"/>
        </SheetTrigger>
        <SheetContent side="left">
        <SheetTitle className="mb-4">Dashboard</SheetTitle>
              <AccountMenu user={session?.user}/>
              <SideBarMenu items={data.navMain}/>
        </SheetContent>
      </Sheet>
      </div>
  );
}
