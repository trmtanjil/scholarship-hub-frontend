/* eslint-disable @typescript-eslint/no-explicit-any */

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Roles } from "@/constentse/roles"; 
import { userService } from "@/services/user.service";
import { AppSidebar } from "@/components copy/layout/app-sidebar";
import { Toaster } from "sonner"; //

export const dynamic = 'force-dynamic';

export default async function DashboardLayout(props: any) {
  const { admin, moderator, user } = props; 
  
  const userData = await userService.getSession();
  const userRole = userData?.data?.user?.role;

  return (
    <SidebarProvider>
      <AppSidebar user={userRole} />
      
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Welcome to Medicare
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Stay Healthy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* রোল অনুযায়ী স্লট রেন্ডার */}
          {userRole === Roles.ADMIN && admin}
          {userRole === Roles.MODERATOR && moderator}
          {userRole === Roles.USER && user}
          
          {!userRole && (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground italic">Unauthorized Access</p>
            </div>
          )}
        </div>
      </SidebarInset>

      {/* Toaster এখানে রাখা সবথেকে নিরাপদ, এটি গ্লোবালি সব নোটিফিকেশন দেখাবে */}
      <Toaster richColors position="top-right" closeButton /> 

    </SidebarProvider>
  );
}