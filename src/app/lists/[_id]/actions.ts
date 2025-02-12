"use server";

import { revalidatePath } from "next/cache";
import { api } from "../../../../convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { getAuthToken } from "@/app/auth";
import { Id, Doc } from "../../../../convex/_generated/dataModel";

export async function createProduct(prevState: unknown, formData: FormData) {
  "use server";

  const authToken = await getAuthToken();
  if (!authToken) {
    return { message: "Unauthenticated" };
  }

  const listId = formData.get("listId") as Id<"lists">;

  const productId = await fetchMutation(
    api.products.create,
    {
      listId,
      url: formData.get("url") as string,
      name: "fake product",
      imageUrl:
        "https://fr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-sac-a-dos-christopher-mm--M12662_PM1_Worn%20view.png?wid=1440&hei=1440",
    },
    { token: authToken }
  );
  revalidatePath(`/lists/${listId}`);
  return { message: "Product created", productId };
}

export async function deleteList(prevState: unknown, formData: FormData) {
  "use server";

  const authToken = await getAuthToken();
  if (!authToken) {
    return { message: "Unauthenticated" };
  }

  const listId = formData.get("listId") as Id<"lists">;
  let nextList: Doc<"lists"> | null = null;

  nextList = await fetchQuery(
    api.lists.getNextList,
    { listId },
    { token: authToken }
  );
  await fetchMutation(api.lists.deleteList, { listId }, { token: authToken });

  if (nextList) {
    return { message: "List deleted", nextList };
  }
  return { message: "List deleted" };
}
