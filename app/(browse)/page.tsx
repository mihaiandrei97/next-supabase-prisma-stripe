import { getServerSession } from "@/lib/get-server-session";
import { createSupabaseInstance } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";

const signOut = async () => {
  "use server";
  const supabase = createSupabaseInstance(cookies());
  await supabase.auth.signOut();
  revalidatePath('/');
};

export default async function Home() {
  const user = await getServerSession();

  return (
    <>
      <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 dark:from-purple-600 via-purple-800 to-purple-900 dark:to-purple-700 inline-block text-transparent bg-clip-text">
        Supabase Next Template
      </h1>
      {user ? (
        <>
          <p className="text-xl">Welcome, {user.email}</p>
          <form action={signOut}>
            <button className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
              Logout
            </button>
          </form>
        </>
      ) : (
        <Link
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/login"
        >
          Login
        </Link>
      )}
      <Link
        className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        href="/pricing"
      >
        Go to Pricing
      </Link>
      {user?.role === 'ADMIN' && <Link
        className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        href="/admin/dashboard"
      >
        Go to Admin
      </Link>}
    </>
  );
}
