"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
 
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const session = authClient.useSession();
  console.log("sesssion",session)

  // Email + Password Login
  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await authClient.signIn.email({
        email,
        password,
         callbackURL: "/", 
      });

      if (res.error) {
        setError(error);
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  //  Google Login
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
       callbackURL:"https://next-js-frontend-ass-4.vercel.app"
    });
  };

  if (session.isPending) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (session.data?.user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg border p-6 text-center">
          <h2 className="text-xl font-semibold">
            Welcome, {session.data.user.email}
          </h2>
          <Button
            className="mt-4"
            onClick={() => authClient.signOut()}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-sm rounded-lg border bg-background p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Login
        </h1>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mt-4 space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        )}

        {/* Login Button */}
        <Button
          className="mt-6 w-full"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <div className="flex-1 border-t" />
          <span className="mx-2 text-xs text-muted-foreground">
            OR
          </span>
          <div className="flex-1 border-t" />
        </div>

        {/* Google Login */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 488 512"
            fill="currentColor"
          >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
