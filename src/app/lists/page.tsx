import { redirect } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { getAuthToken } from "../auth";

export default async function ListsPage() {
  console.log("ListsPage");
  const token = await getAuthToken();
  if (!token) {
    redirect("/sign-in");
  }
  const lists = await fetchQuery(api.lists.getLists, {}, { token });
  if (lists.length > 0) {
    return redirect(`/lists/${lists[0]._id}`);
  }
  return (
    <div>no list found, create a new one using the button in the sidebar</div>
  );
}
