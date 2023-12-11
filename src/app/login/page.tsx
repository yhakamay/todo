"use client";

import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleSignInWithGoogle = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center gap-4 min-h-screen p-24">
      <h1 className="text-xl">Welcome to Motchi!</h1>
      <button onClick={handleSignInWithGoogle} className="btn btn-primary">
        Continue with Google
      </button>
      <button onClick={handleSignInWithGoogle} className="brn btn-link text-sm">
        I already have an account
      </button>
    </main>
  );
}
