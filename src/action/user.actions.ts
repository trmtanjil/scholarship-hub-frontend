"use server";

import { userService, GetUsersParams } from "@/services/user.service";
import { revalidatePath } from "next/cache";
 
export async function getSessionAction() {
  const { data, error } = await userService.getSession();

  if (error) return { data: null, error };
  return { data, error: null };
}

export async function getAllUsersAction(params?: GetUsersParams) {
  const { data, error } = await userService.getAllUsers(params);

  if (error) return { data: null, error: (error as { message: string }).message || error };
  return { data, error: null };
}

export async function getUserByIdAction(userId: string) {
  const { data, error } = await userService.getUserById(userId);

  if (error) return { data: null, error: (error as { message: string }).message || error };
  return { data, error: null };
}


// user.actions.ts
export async function adminUpdateUserStatusAction(
  userId: string,
  payload: { role: "ADMIN" | "SELLER" | "CUSTOMER" }, // <-- পরিবর্তন
) {
  const { data, error } = await userService.adminUpdateUserStatus(userId, payload);

  if (error) {
    return { 
      success: false, 
      error: typeof error === "string" ? error : error.message || "Failed to update status" 
    };
  }

  revalidatePath("/admin-dashboard/users");
  return { success: true, data };
}

