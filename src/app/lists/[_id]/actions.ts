"use server";

import { revalidatePath } from "next/cache";
import { api } from "../../../../convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { getAuthToken } from "@/app/auth";
import { Id } from "../../../../convex/_generated/dataModel";

export async function createList(prevState: unknown, formData: FormData) {
  "use server";

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
