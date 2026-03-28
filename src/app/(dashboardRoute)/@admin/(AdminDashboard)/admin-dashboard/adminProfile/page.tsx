"use client";

import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; // For a better loading state

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getSessionAction } from "@/action/user.actions";

interface UserSession {
  id: string;
  name?: string;
  image?: string;
  email?: string;
  role?: string;
}

export default function Profile() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function fetchSession() {
      try {
        const { data, error } = await getSessionAction();
        if (error) {
          toast.error("Failed to load session");
        } else if (data?.user) {
          setSession(data.user);
          setName(data.user.name || "");
          setImage(data.user.image || "");
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

 

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <Card className="border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>
            Update your public profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image & Avatar */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar className="w-24 h-24 border">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl">
                {name ? name.substring(0, 2).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 w-full">
              <Label htmlFor="image">Profile Image URL</Label>
              <Input
                id="image"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field (Disabled) */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-gray-500">
              Email Address (Cannot be changed)
            </Label>
            <Input
              id="email"
              value={session?.email || ""}
              readOnly
              className="bg-gray-50 text-gray-500 cursor-not-allowed border-dashed"
            />
          </div>

    
        </CardContent>
      </Card>
    </div>
  );
}
