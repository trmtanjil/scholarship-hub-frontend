"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { adminUpdateUserStatusAction } from "@/action/user.actions";

// ১. ইউজারের জন্য ইন্টারফেস
export interface UserProps {
  id: string;
  role: "ADMIN" | "MODERATOR" | "USER";
  name?: string;
  email?: string;
}

// ২. কম্পোনেন্ট
export function UserRoleAction({ user }: { user: UserProps }) {
  const [isPending, startTransition] = useTransition();

   // ৩. রোল চেইঞ্জ হ্যান্ডলার
const handleRoleChange = (newRole: string) => {
  const formattedRole = newRole.toUpperCase() as "ADMIN" | "MODERATOR" | "USER";

  startTransition(async () => {
    const result = await adminUpdateUserStatusAction(user.id, { role: formattedRole });
    console.log(result)
    if (result?.error) toast.error(result.error);
    else toast.success(`User role updated to ${formattedRole}`);
  });
};



  return (
    <select
       disabled={isPending}
  value={user.role.toUpperCase()} // controlled select
  onChange={(e) => handleRoleChange(e.target.value)}
  className="bg-slate-50 border border-slate-200 rounded-md text-xs p-1 font-semibold text-black outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 cursor-pointer"
>
  <option value="ADMIN">ADMIN</option>
  <option value="MODERATOR">MODERATOR</option>
  <option value="USER">USER</option>
    </select>
  );
}
