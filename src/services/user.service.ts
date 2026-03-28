import { cookies } from "next/headers";

const AUTH_URL =process.env.AUTH_URL;
const API_URL =process.env.API_URL;

export interface GetUsersParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

/**
 * Helper to convert Next.js cookies() into a proper Cookie header string
 * for server-to-server fetch requests.
 */
const getCookieHeader = async () => {
  try {
    const cookieStore = await cookies();
    console.log("cookie",cookieStore)
    const cookieArray = cookieStore.getAll().map((c) => `${c.name}=${c.value}`);
    return cookieArray.join("; ");
  } catch (err) {
    console.error("Error fetching cookies:", err);
    return "";
  }
};
/**
 * Helper to handle fetch responses safely
 */
async function handleResponse(res: Response) {
  const contentType = res.headers.get("content-type");
  let data = null;

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    return {
      data: null,
      error: {
        message: data?.message || `Request failed with status ${res.status}`,
        status: res.status,
      },
    };
  }

  return { data, error: null };
}

export const userService = {
  // Fetch session from AUTH_URL using server-side cookies
  getSession: async function () {
    try {
      const cookieHeader = await getCookieHeader();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      });

      return await handleResponse(res);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get session";
      console.error("getSession error:", err);
      return { data: null, error: { message: errorMessage, status: 500 } };
    }
  },

  // Get all users with optional query params and server-side cookies
  getAllUsers: async function (
    params?: GetUsersParams,
    options?: ServiceOptions,
  ) {
    try {
      const cookieHeader = await getCookieHeader();
      const url = new URL(`${API_URL}/admin/users`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const res = await fetch(url.toString(), {
        headers: { Cookie: cookieHeader },
        cache: options?.cache || "no-store",
        next: options?.revalidate
          ? { revalidate: options.revalidate }
          : undefined,
      });
console.log("Response Status:", res.status);
      return await handleResponse(res);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch users";
      console.error("getAllUsers error:", err);
      return { data: null, error: { message: errorMessage, status: 500 } };
    }
  },

  getUserById: async function (userId: string) {
    try {
      const cookieHeader = await getCookieHeader();

      const res = await fetch(`${API_URL}/users/${userId}`, {
        headers: { Cookie: cookieHeader },
      });

      return await handleResponse(res);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch user";
      return { data: null, error: { message: errorMessage, status: 500 } };
    }
  },
  

  adminUpdateUserStatus: async function (
    id: string,
    payload: { role: "ADMIN" | "SELLER" | "CUSTOMER" },
  ) {
    try {
      const cookieHeader = await getCookieHeader();

      const res = await fetch(`${API_URL}/admin/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      });

      return await handleResponse(res);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update user status";
      return {
        data: null,
        error: { message: errorMessage, status: 500 },
      };
    }
  },


};
