import { ThemeToggle } from "@/components/ThemeToggle";

export default function BrowseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
