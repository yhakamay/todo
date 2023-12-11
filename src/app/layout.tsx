import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/header";
import { auth } from "@/lib/firebase/auth";

export const metadata: Metadata = {
  title: "Motchi",
  description: "A todo app for daily tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = auth.currentUser;

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Header initialUser={currentUser} />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
