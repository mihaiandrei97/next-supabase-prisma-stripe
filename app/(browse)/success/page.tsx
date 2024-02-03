import Link from "next/link";
import React from "react";

export default function Success() {
  return (
    <div className="bg-purple-800 rounded-xl shadow-xl text-center text-white p-8 flex flex-col gap-8">
      <span className="text-6xl">🥳</span>
      <h1 className="text-3xl font-bold tracking-tight">Payment successful!</h1>
      <p className="text-xl max-w-5xl">
        You are officially a PRO Member! <br /> Get ready to skyrocket your
        coding skills!
      </p>
      <Link
        className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        href="/"
      >
        Go back to the homepage
      </Link>
    </div>
  );
}
