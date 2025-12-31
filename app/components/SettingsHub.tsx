"use client";

import { useEffect, useState } from "react";

import CardPackManager from "@/app/components/CardPackManager";
import AuthUserManager from "@/app/components/AuthUserManager";
import SettingsProfileForm from "@/app/components/SettingsProfileForm";

type CardPack = {
  id: number;
  name: string;
  releaseDate: string;
};

type Deck = {
  id: number;
  name: string;
  deckClass: string;
  cardPack: CardPack;
};

type Props = {
  profileName: string;
  cardPacks: CardPack[];
  decks: Deck[];
  users: {
    id: number;
    name: string;
    role: "ADMIN" | "MEMBER";
    createdAt: string;
  }[];
  isAdmin: boolean;
  currentUserId?: number;
};

type Tab = "cardPacks" | "users" | "profile";

export default function SettingsHub({
  profileName,
  cardPacks,
  decks,
  users,
  isAdmin,
  currentUserId,
}: Props) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "cardPacks", label: "カードパック" },
    { id: "profile", label: "アカウント管理" },
    ...(isAdmin ? [{ id: "users" as const, label: "ユーザー管理" }] : []),
  ];
  const [activeTab, setActiveTab] = useState<Tab>("cardPacks");

  useEffect(() => {
    if (!isAdmin && activeTab === "users") {
      setActiveTab("cardPacks");
    }
  }, [activeTab, isAdmin]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Settings
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            設定
          </h2>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                activeTab === tab.id
                  ? "border-zinc-900 bg-white text-zinc-900"
                  : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-8 border-t border-zinc-200 pt-8">
          {activeTab === "cardPacks" && (
            <CardPackManager cardPacks={cardPacks} embedded isAdmin={isAdmin} />
          )}
          {activeTab === "users" && (
            <AuthUserManager
              users={users}
              isAdmin={isAdmin}
              currentUserId={currentUserId}
              embedded
            />
          )}
          {activeTab === "profile" && (
            <SettingsProfileForm initialName={profileName} embedded />
          )}
        </div>
      </section>
    </div>
  );
}
