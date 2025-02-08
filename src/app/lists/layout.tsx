import { ModeToggle } from "@/components/ModeToggle";
import { api } from "../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { UsersLists } from "@/components/UsersLists";
import { CreateListPopover } from "@/components/CreateListPopover";
import { Logo } from "@/components/ui/logo";
import { getAuthToken } from "@/app/auth";
import { redirect } from "next/navigation";
import { UserDropdown } from "@/components/UserDropdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";

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
    <div className="flex flex-col gap-6 min-h-screen max-w-screen-lg mx-auto p-4">
      {/* Left Sidebar Navigation */}
      <nav className="flex w-full justify-between items-center pr-2 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Logo size={24} />
            <h2 className="text-base font-medium">ShopNext</h2>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Search size={24} />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell size={24} />
            </Button>
            <ModeToggle />
          </div>
          <UserDropdown />
        </div>
      </nav>
      <div className="flex gap-8">
        <aside className="flex flex-col h-[100vh] md:w-64 bg-background">
          <nav className="space-y-2">
            <CreateListPopover />
            <UsersLists preloadedLists={preloadedLists} />
          </nav>
        </aside>
        <main className="relative flex-1 max-w-screen-md mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
