export const data = {
  navMain: [
    {
      title: "overview",
      url: "/dashboard/overview",
      iconName: "LayoutDashboard",
      isActive: true,
    },
    {
      title: "user-management",
      url: "#",
      iconName: "User",
      items: [
        {
          title: "User List",
          url: "/dashboard/user-list",
          iconName: "Users",
        },
      ],
    },
    {
      title: "room-management",
      url: "#",
      iconName: "BedSingle",
      items: [
        {
          title: "Room List",
          url: "/dashboard/room-list",
          iconName: "BedDouble",
        },
        {
          title: "Add Room",
          url: "/dashboard/add-room",
          iconName: "PlusIcon",
        },
      ],
    },
    {
      title: "categories",
      url: "#",
      iconName: "Grid2x2",
      items: [
        {
          title: "Category List",
          url: "/dashboard/category-list",
          iconName: "Grid2x2",
        },
      ],
    },
    {
      title: "accommodation",
      url: "#",
      iconName: "House",
      items: [
        {
          title: "accommodation List",
          url: "/dashboard/accommodation-list",
          iconName: "Warehouse",
        },
      ],
    },
    {
      title: "booking-history",
      url: "#",
      iconName: "BookText",
      items: [
        {
          title: "Booking List",
          url: "/dashboard/booking-history",
          iconName: "Book",
        },
      ],
    },
  ],
};