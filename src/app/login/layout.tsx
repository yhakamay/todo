import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to motchi",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center gap-4 min-h-screen p-24">
      {children}
    </main>
  );
}
