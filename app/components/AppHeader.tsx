"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/records", label: "戦績" },
  { href: "/matchups", label: "相性" },
  { href: "/settings", label: "設定" },
];

type Props = {
  isAuthenticated: boolean;
};

export default function AppHeader({ isAuthenticated }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const onLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <div className="flex items-baseline gap-3">
            <span className="text-lg font-semibold text-zinc-900">
              Beyond Matchup
            </span>
          </div>
        </div>
        {isAuthenticated && (
          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
            <nav className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      isActive
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <button
              className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
              type="button"
              onClick={onLogout}
            >
              ログアウト
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
