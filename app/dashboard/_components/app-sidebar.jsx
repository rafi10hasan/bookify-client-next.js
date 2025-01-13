"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  UserPlus,
  User,
  Users,
  BedSingle,
  BedDouble,
  BedSingleIcon,
  Plus,
  Grid2x2,
  House,
  Warehouse,
  Archive,
  BookText,
  Book,
  GalleryHorizontalEnd,
  GalleryThumbnails,
  Clipboard,
  CircleDollarSign,
  PlusIcon
} from "lucide-react"



import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { useAuth } from "@/hooks/use-auth"

// This is sample data.
const data = {
 
 
  navMain: [
    {
      title: "overview",
      url: "/dashboard/overview",
      icon: LayoutDashboard,
      isActive: true,
      
    },
    {
      title: "user-management",
      url: "#",
      icon: User,
      items: [
        {
            title: "User List",
            url: "/dashboard/user-list",
            icon: Users
          },
        
      ],
    },
    {
      title: "room-management",
      url: "#",
      icon: BedSingle,
      items: [
          {
            title: "Room List",
            url: "/dashboard/room-list",
            icon: BedDouble
          },
          {
            title: "Add Room",
            url: "/dashboard/add-room",
            icon: PlusIcon
          },
      ],
    },
    {
        title: "categories",
        url: "#",
        icon: Grid2x2,
        items: [
            {
              title: "Category List",
              url: "/dashboard/category-list",
              icon: Grid2x2
            },
        ],
      },
      {
        title: "accommodation",
        url: "#",
        icon: House,
        items: [
            {
              title: "accommodation List",
              url: "/dashboard/accommodation-list",
              icon: Warehouse
            },
        ],
      },
      
      {
        title: "booking-history",
        url: "#",
        icon: BookText,
        items: [
            {
              title: "Booking List",
              url: "/dashboard/booking-history",
              icon: Book
            },
        ],
      },
      
  ],
  
}

export function AppSidebar({...props}) {
    const {data:session} = useAuth();
  return (
    <>
      <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader className="bg-white">
      <NavUser user={session?.user} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
        {/* /* <NavProjects projects={data.projects} /> */}
        </SidebarContent>
         <SidebarRail />
       </Sidebar> 
    </>
  )
}



