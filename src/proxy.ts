import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 const privatePaths = ["/dashboard","/admin-dashboard", "/profile", "/private"]; 
 
 const authPaths = ["/login", "/signUp"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
const sessionCookie = getSessionCookie(request);
  
 

  const isPrivatePath = privatePaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );

  const isAuthPath = authPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );

   if (isPrivatePath && !sessionCookie) {
    const url = new URL("/login", request.url);

    url.searchParams.set("callbackUrl", encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }

   if (isAuthPath && sessionCookie) {
    return NextResponse.next();  
  }

  return NextResponse.next();
}

 export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};