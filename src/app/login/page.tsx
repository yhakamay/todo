"use client";

import { signInWithGoogle, signInAnonymously } from "@/lib/firebase/auth";
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
  const handleSignInAnonymously = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    try {
      await signInAnonymously();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center gap-4 min-h-screen p-24">
      <h1 className="text-xl">Welcome to Motchi!</h1>
      <button onClick={handleSignInWithGoogle} className="btn btn-primary">
        Sign in with Google
      </button>
      <button
        onClick={handleSignInAnonymously}
        className="brn btn-link text-sm"
      >
        Explore without account
      </button>
    </main>
  );
}
