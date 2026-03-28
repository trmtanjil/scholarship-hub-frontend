import { UserRoleAction } from "../UserRoleAction";

 
export interface User {
  id: string;
  name?: string;
  email?: string;
  role: "ADMIN" | "MODERATOR" | "USER"; // '?' সরিয়ে নির্দিষ্ট টাইপ দাও
  createdAt?: string;
}

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (row: User) => <span className="font-mono text-xs text-black">{row.id?.slice(0, 8)}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    
    cell: (row: User) =><span className="text-black">{ row.name || "—" }</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (row: User) => <span className="text-black">{row.email || "—"}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (row: User) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        row.role === "ADMIN"
          ? "bg-red-100 text-red-700"
          : row.role === "MODERATOR"
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-100 text-gray-700"
      }`}>
        {row.role || "—"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    
    header: "Created At",
    cell: (row: User) => {
      if (!row.createdAt) return "—";
      return new Date(row.createdAt).toLocaleDateString();
    },
  },
  {
    id: "role-action",
    header: "Role",
    cell: (row: User) => (
      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
        row.role === "ADMIN" ? "bg-red-100 text-red-600" : 
        row.role === "MODERATOR" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
      }`}>
        {row.role}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Change Role",
    cell: (row: User) => <UserRoleAction user={row} />, 
  },
];
