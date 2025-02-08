import UsersLists from "@/components/UsersLists";
import { api } from "../../../../convex/_generated/api";
import { getAuthToken } from "@/app/auth";
import { redirect } from "next/navigation";
import { preloadQuery } from "convex/nextjs";
import CreateListPopover from "@/components/CreateListPopover";

export default async function ListsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAuthToken();
  if (!token) {
    redirect("/sign-in");
  }
  const preloadedLists =
    (await preloadQuery(api.lists.getLists, {}, { token })) || [];
  return (
    <div className="flex gap-4">
      <div className="max-w-64">
        <CreateListPopover />
        <UsersLists preloadedLists={preloadedLists} />
      </div>
      {children}
    </div>
  );
}
