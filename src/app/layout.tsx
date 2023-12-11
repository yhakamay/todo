import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "motchi",
  description: "A todo app for daily tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Header />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
