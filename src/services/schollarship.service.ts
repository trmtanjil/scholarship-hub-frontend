import { ServiceResult } from "@/types/category.type";
import { ICreateScholarshipPayload, IScholarship, ScholarshipParams, TCreateScholarship } from "@/types/scholarship.type";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ServiceResult<T>> {
  try {
    if (!API_URL) throw new Error("API_URL is missing in environment variables");

    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join("; ");

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");
    headers.set("Cookie", cookieHeader); 

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const result = await res.json();

    if (!res.ok) {
      return { data: null, error: result?.message ?? "Request failed" };
    }

    // ব্যাকএন্ড যদি { success: true, data: [...] } ফরম্যাটে পাঠায়
    return { data: result.data ?? result, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}

export function buildQuery(params?: ScholarshipParams): string {
  if (!params) return "";
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  return query.toString();
}

export const ScholarshipService = {

  createScholarship: async (payload: ICreateScholarshipPayload): Promise<ServiceResult<IScholarship>> => {
    return await apiFetch<IScholarship>("/scholarship", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getAll: async (params?: ScholarshipParams): Promise<ServiceResult<IScholarship[]>> => {
    const query = buildQuery(params);
    return await apiFetch<IScholarship[]>(`/scholarships${query ? `?${query}` : ""}`, {
      method: "GET",
      next: { revalidate: 60, tags: ["scholarships"] }
    });
  },

  getById: async (id: string): Promise<ServiceResult<IScholarship>> => {
    return await apiFetch<IScholarship>(`/scholarships/${id}`, {
      method: "GET",
      next: { tags: [`scholarship-${id}`] }
    });
  },

  create: async (data: TCreateScholarship): Promise<ServiceResult<IScholarship>> => {
    return await apiFetch<IScholarship>(`/scholarships`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<TCreateScholarship>): Promise<ServiceResult<IScholarship>> => {
    return await apiFetch<IScholarship>(`/scholarships/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<ServiceResult<{ message: string }>> => {
    return await apiFetch<{ message: string }>(`/scholarships/${id}`, {
      method: "DELETE",
    });
  },
};