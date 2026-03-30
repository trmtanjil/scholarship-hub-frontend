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
        title: "Manage Users",
        url: "/manageusers",
      },
      {
        title: "All Applications",
        url: "/allapplication",
      },
      {
        title: "Edit Scholarship",
        url: "/editscholarship",
      },
        {
          title: "Manage Scholarships",
          url: "/managescholarship",
        },
      
      {
        title: "manage reviews",
        url: "/managereviews",
      },
       
    ],
  },
];
