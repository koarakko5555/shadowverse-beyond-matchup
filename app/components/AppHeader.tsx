"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/matchups", label: "相性" },
  { href: "/records", label: "戦績" },
  { href: "/settings", label: "設定" },
];

type Props = {
  isAuthenticated: boolean;
};

export default function AppHeader({ isAuthenticated }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header className="border-b border-zinc-200 bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <Link className="flex items-baseline gap-3" href="/matchups">
          <span className="text-lg font-semibold text-zinc-900">
            ろくめいえん秘密の花園
          </span>
        </Link>
        {isAuthenticated && (
          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-2 md:flex">
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
              <button
                className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                type="button"
                onClick={onLogout}
              >
                ログアウト
              </button>
            </nav>
            <button
              className="flex items-center justify-center rounded-full border border-zinc-200 p-2 text-zinc-700 hover:bg-zinc-100 md:hidden"
              type="button"
              aria-label="メニューを開く"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="text-lg leading-none">☰</span>
            </button>
          </div>
        )}
      </div>
      {isAuthenticated && isMenuOpen && (
        <div className="border-t border-zinc-200 bg-white/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
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
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onLogout();
              }}
            >
              ログアウト
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
