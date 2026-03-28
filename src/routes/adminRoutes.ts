import { Route } from "@/types/routes.type";

 
export const adminRoutes: Route[] = [
  {
    title: "User Management",
    items: [
        {
        title: "Profile",
        url: "/admin-dashboard/adminProfile",
      },
      {
        title: "Manage Users",
        url: "/admin-dashboard/users",
      },
      {
        title: "Manage Orders",
        url: "/admin-dashboard/orders",
      },
      {
        title: "Manage Categories",
        url: "/admin-dashboard/categories",
      },
    ],
  },
];
