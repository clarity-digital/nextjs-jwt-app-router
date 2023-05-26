"use client";

import Link from "next/link";

export default function AppNavigation() {
  return (
    <nav>
      <Link href="/">Logo</Link>

      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}
