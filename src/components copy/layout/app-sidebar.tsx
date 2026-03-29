import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Route } from "@/types/routes.type";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
 import DashboardLogo from "../Sheared/DashboardLogo";
import { moderatorRoutes } from "@/routes/moderatorRoutes";
  
export async function AppSidebar({
  user,
  ...props
}: {
  user?: "ADMIN" | "MODERATOR" | "USER" ;
} & React.ComponentProps<typeof Sidebar>) {
  let routes: Route[] = [];

  switch (user) {
    case "ADMIN":
      routes = adminRoutes;
      break;
    case "MODERATOR":
      routes = moderatorRoutes;
      break;
    case "USER":
      routes = userRoutes;
      break;
    default:
      routes = [];
  }

  return (
    <Sidebar {...props}>
      <DashboardLogo></DashboardLogo>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
