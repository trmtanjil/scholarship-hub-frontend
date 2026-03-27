"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
 
const navItems = [
  { title: "Home", href: "/" },
  { title: "Scholarships", href: "/scholarships" },
  { title: "Categories", href: "/categories" },
  { title: "About Us", href: "/about" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
    const { data: session, isPending } = authClient.useSession();
  console.log(session)
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="hidden text-xl font-bold tracking-tight text-foreground sm:inline-block">
              Scholarship<span className="text-primary text-blue-800 font-bold">Hub</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
             {!isPending && (
              <>
                {session ? (
                  <Button  onClick={handleLogout}  variant="destructive" size="sm">
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
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="px-3">
              Log in
            </Button>
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader className="text-left border-b pb-4 mb-4">
                <SheetTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="font-bold">ScholarshipHub</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center text-lg font-medium transition-colors hover:text-primary py-2 border-b border-transparent hover:border-primary/20"
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="mt-4 grid gap-3">
                  <Button className="w-full bg-primary shadow-md" onClick={() => setIsOpen(false)}>
                    Sign up for free
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}