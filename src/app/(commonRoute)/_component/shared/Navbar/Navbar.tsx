"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
 
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; // আপনার Better-Auth ক্লায়েন্ট পাথ
import { useRouter } from "next/navigation";

const Navbar = ({ className }: { className?: string }) => {
  // Better-Auth থেকে সেশন ডাটা আনা
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); 
        },
      },
    });
  };

const menu = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
    { title: "All scholarship", url: "/allscholarshippublic" },
  // শুধু লগইন থাকলে দেখাবে
  ...(session ? [
    { title: "Dashboard", url: "/dashboard" }
  ] : []),
];

  return (
    <section className={cn("py-4 border-b", className)}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img src="https://i.ibb.co.com/rRtQNNjL/Scholarship-Hub-logo-design.png" className="max-h-8" alt="logo" />
              <span className="text-lg font-semibold uppercase">scholarship</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-2">
                  {menu.map((item) => (
                    <NavigationMenuItem key={item.title}>
  <NavigationMenuLink asChild>
    <Link href={item.url} className="px-4 py-2 text-sm font-medium hover:text-amber-600 transition-colors">
      {item.title}
    </Link>
  </NavigationMenuLink>
</NavigationMenuItem>

                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-2">
 

            {/* সেশন অনুযায়ী বাটন পরিবর্তন */}
            {!isPending && (
              <>
                {session ? (
                  <Button onClick={handleLogout} variant="destructive" size="sm">
                    Logout
                  </Button>
                ) : (
                  <div className="hidden lg:flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/signUp">Register</Link>
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon"><Menu className="size-4" /></Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-4 mt-8">
                    {menu.map((item) => (
                      <Link key={item.title} href={item.url} className="text-lg font-semibold border-b pb-2">
                        {item.title}
                      </Link>
                    ))} 
                    {!session ? (
                      <>
                        <Button asChild variant="outline"><Link href="/login">Login</Link></Button>
                        <Button asChild><Link href="/signUp">Register</Link></Button>
                      </>
                    ) : (
                      <Button onClick={handleLogout} variant="destructive">Logout</Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };