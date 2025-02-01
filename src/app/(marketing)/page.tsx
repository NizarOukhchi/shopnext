import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function HomePage() {
  const { userId } = await auth();
  const isSignedIn = !!userId;
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <h1 className="text-4xl font-bold">Shopnext</h1>
      <h2 className="text-3xl font-bold">
        <TextEffect per="char" preset="fade">
          Shop Smarter, Save Better
        </TextEffect>
      </h2>
      {isSignedIn ? (
        <Link href="/lists">
          <Button>My Lists</Button>
        </Link>
      ) : (
        <Button>Get Started</Button>
      )}
    </div>
  );
}
