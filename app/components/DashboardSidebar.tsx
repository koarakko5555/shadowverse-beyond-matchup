"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/packs", label: "カードパック" },
  { href: "/decks", label: "デッキ" },
  { href: "/matchups", label: "相性評価" },
  { href: "/users", label: "ユーザー" },
  { href: "/stats", label: "統計" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const onLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside className="flex h-full flex-col border-r border-zinc-200 bg-white px-4 py-6">
      <div className="px-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Shadowverse
        </p>
        <h1 className="mt-2 text-lg font-semibold text-zinc-900">
          Beyond Matchup
        </h1>
      </div>

      <nav className="mt-8 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-2 pt-6">
        <button
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
          type="button"
          onClick={onLogout}
        >
          ログアウト
        </button>
      </div>
    </aside>
  );
}
