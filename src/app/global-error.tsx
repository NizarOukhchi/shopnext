"use client";

import { ConvexError } from "convex/values";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const errorMessage =
    error instanceof ConvexError
      ? (error.data as { message: string }).message
      : "Unexpected error occurred";
  console.log(errorMessage);
  if (errorMessage === "Unauthenticated") {
    return <div>Unauthenticated</div>;
  }
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
