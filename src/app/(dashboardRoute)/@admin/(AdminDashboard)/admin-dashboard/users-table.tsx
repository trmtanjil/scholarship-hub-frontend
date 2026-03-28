"use client";

 import { useRouter, useSearchParams } from "next/navigation";
 import { DataTable, Meta } from "@/components/table/data-table";
import { columns, User } from "./users/users-columns";

interface UsersTableProps {
  users: User[];
  meta: Meta;
}

export function UsersTable({ users, meta }: UsersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <DataTable
    
      title="Users"
      columns={columns}
      data={users}
      pagination
      paginationMeta={meta}
      onPaginationChange={() => {
        const params = new URLSearchParams(searchParams.toString());
     
        router.push(`?${params.toString()}`);
      }}
   
    />
  );
}
