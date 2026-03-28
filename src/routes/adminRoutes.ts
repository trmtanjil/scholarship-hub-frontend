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
   
   
    ],
  },
];
