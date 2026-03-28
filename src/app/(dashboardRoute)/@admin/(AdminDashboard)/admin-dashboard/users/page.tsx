import { getAllUsersAction } from "@/action/user.actions";
import { UsersTable } from "../users-table";

export default async function UsersPage() {
  const { data, error } = await getAllUsersAction();

   console.log("Action Data:", data);

  if (error || !data) {
    return <div className="text-red-500">Failed to load users:  </div>;
  }

   return (
    <span className="text-black">
       <UsersTable users={data.data || []} meta={data.meta} />
    </span>
  );
}