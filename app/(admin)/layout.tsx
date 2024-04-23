import { ThemeToggle } from "@/components/ThemeToggle";
import { getUser } from "@/data-access/users";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if (!user || user.role !== "ADMIN") {
    return redirect("/")
  }
  return (
    <>
      <nav className="flex justify-end p-4">
        <ThemeToggle />
      </nav>
      <main className="flex flex-col container mx-auto gap-4 items-center">
        {children}
      </main>
    </>
  );
}
