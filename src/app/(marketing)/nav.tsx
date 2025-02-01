import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";

export async function MarketingNav() {
  const { userId } = await auth();
  const isSignedIn = !!userId;
  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">
            ShopNext
          </Link>
          <div className="hidden md:flex gap-4">
            <Link
              href="/download"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Download
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Blog
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {isSignedIn ? (
            <Link href="/lists">
              <Button>My Lists</Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
