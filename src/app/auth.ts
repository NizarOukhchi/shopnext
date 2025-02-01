import { auth, currentUser } from "@clerk/nextjs/server";

// TODO: Add more fields to the user object
export async function getCurrentUser() {
  const user = await currentUser();
  return {
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.emailAddresses[0]?.emailAddress,
    image: user?.imageUrl,
    initials: `${user?.firstName?.charAt(0)?.toUpperCase()}${user?.lastName?.charAt(0)?.toUpperCase()}`,
  };
}

export async function getAuthToken() {
  const session = await auth();
  return session.getToken({ template: "convex" }) ?? undefined;
}
