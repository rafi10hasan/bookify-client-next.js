import {
    BedDouble,
    BedSingle,
    Book,
    BookText,
    Grid2x2,
    House,
    LayoutDashboard,
    PlusIcon,
    User,
    Users,
    Warehouse,
  } from "lucide-react";

export const data = {
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
            icon: Users,
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
            icon: BedDouble,
          },
          {
            title: "Add Room",
            url: "/dashboard/add-room",
            icon: PlusIcon,
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
            icon: Grid2x2,
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
            icon: Warehouse,
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
            icon: Book,
          },
        ],
      },
    ],
  };