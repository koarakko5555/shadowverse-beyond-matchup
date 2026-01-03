import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "@/app/components/AppHeader";
import { getSession } from "@/app/lib/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ろくめいえん秘密の花園",
  description: "ろくめいえんの相性管理サイト",
  icons: {
    icon: "/cthulhu_deep_ones.png",
    shortcut: "/cthulhu_deep_ones.png",
    apple: "/cthulhu_deep_ones.png",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppHeader isAuthenticated={Boolean(session)} />
        {children}
      </body>
    </html>
  );
}
