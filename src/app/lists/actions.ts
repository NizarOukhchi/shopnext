"use server";

import { fetchMutation } from "convex/nextjs";
import { getAuthToken } from "../auth";
import { revalidatePath } from "next/cache";
import { api } from "../../../convex/_generated/api";

export async function createList(prevState: unknown, formData: FormData) {
  const authToken = await getAuthToken();
  if (!authToken) {
    return { message: "Unauthenticated" };
  }

  const listId = await fetchMutation(
    api.lists.create,
    {
      name: formData.get("name") as string,
    },
    { token: authToken }
  );
  revalidatePath("/lists");
  return { message: "List created", listId };
}
