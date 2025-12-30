import DashboardSidebar from "@/app/components/DashboardSidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl">
        <div className="hidden w-56 md:block">
          <DashboardSidebar />
        </div>
        <main className="flex-1 px-6 py-10">
          <div className="mb-8 block md:hidden">
            <DashboardSidebar />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
