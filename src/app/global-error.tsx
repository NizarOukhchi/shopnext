"use client";

import { ConvexError } from "convex/values";
import posthog from "posthog-js";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    posthog.capture("webapp_crash", { error: error.message });
    if (error instanceof ConvexError) {
      //router.push("/sign-in");
    }
  }, [error, router]);

  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
