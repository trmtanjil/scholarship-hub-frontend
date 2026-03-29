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
import { Roles } from "@/constentse/roles"; // বানান ঠিক করো যদি 'constants' হয়
import { userService } from "@/services/user.service";
import { AppSidebar } from "@/components copy/layout/app-sidebar";

export const dynamic = 'force-dynamic';

export default async function DashboardLayout(props: any) {
  // ১. তোমার ফোল্ডার স্ট্রাকচার অনুযায়ী স্লটগুলো রিসিভ করো
  // @admin -> admin, @moderator -> moderator, @user -> user
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
          {/* ২. রোল অনুযায়ী সঠিক স্লট রেন্ডার করো */}
          {userRole === Roles.ADMIN && admin}
          {userRole === Roles.MODERATOR && moderator}
          {userRole === Roles.USER && user}
          
          {/* যদি উপরের কোনটাই না মিলে তবে fallback */}
          {!userRole && <p>Unauthorized Access</p>}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}