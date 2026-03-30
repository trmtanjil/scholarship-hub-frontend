import { Route } from "@/types/routes.type";

 
export const moderatorRoutes: Route[] = [
  
  {
    
    title: "Modator Dashboard",
    items: [
      {
        title: "Profile",
        url: "/modaratorprofile",
      },
      {
        title: "All Applications",
        url: "/allapplication",
      },
      {
        title: "manage reviews",
        url: "/managereviews",
      },
    ],
  },
];
