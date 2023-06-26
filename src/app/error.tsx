"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

function Error({ error, reset }: ErrorProps) {
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
