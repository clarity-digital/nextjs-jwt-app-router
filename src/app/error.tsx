"use client";

import Link from "next/link";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <h1>{error.message || "Something went wrong!"}</h1>

      <div>
        <button onClick={() => reset()}>Try again</button>
        <Link href="/">Home</Link>
      </div>
    </>
  );
}

export default Error;
