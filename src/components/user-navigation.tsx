"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function UserNavigation() {
  return (
    <ul>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/dashboard/settings">Settings</Link>
      </li>
      <li>
        <button
          type="button"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </li>
    </ul>
  );
}
