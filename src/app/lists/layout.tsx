import { ModeToggle } from "@/components/ModeToggle";
import UserDropdown from "@/components/UserDropdown";
import { api } from "../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import UsersLists from "@/components/UsersLists";
import CreateListPopover from "@/components/CreateListPopover";
import { Logo } from "@/components/ui/logo";
import { getAuthToken } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getAuthToken();
  if (!token) {
    redirect("/sign-in");
  }
  const preloadedLists =
    (await preloadQuery(api.lists.getLists, {}, { token })) || [];
  return (
    <div className="flex flex-col md:flex-row min-h-screen max-w-screen-lg mx-auto">
      {/* Left Sidebar Navigation */}
      <aside className="fixed flex flex-col w-full h-[100vh] md:w-72 bg-background">
        <div className="flex justify-between items-center md:px-6 md:py-4">
          <div className="flex items-center gap-2">
            <Logo size={40} />
            <h2 className="text-xl font-semibold">ShopNext</h2>
          </div>
          <ModeToggle />
        </div>
        <div className="flex items-center justify-center gap-4 md:px-6 md:py-4">
          <UserDropdown />
        </div>
        <nav className="sticky top-0 p-4 md:px-6 md:py-4 space-y-2">
          <CreateListPopover />
          <UsersLists preloadedLists={preloadedLists} />
        </nav>
      </aside>

      <main className="relative flex-1 max-w-screen-md mx-auto left-48">
        {children}
      </main>
    </div>
  );
}
