export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10">
        {children}
      </div>
    </div>
  );
}
