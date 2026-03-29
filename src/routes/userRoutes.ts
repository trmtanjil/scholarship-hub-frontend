import { Route } from "@/types/routes.type";

 
export const userRoutes: Route[] = [
  
  {
    
    title: "student Dashboard",
    items: [
  
      {
        title: "Profile",
        url: "/userprofile",
      },
      {
        title: "My Applications",
        url: "/myapplications",
      },
      {
        title: "My reviews",
        url: "/reviews",
      },
     
    ],
  }, 
];
