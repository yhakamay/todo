"use client";

import { auth } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [_, loadingAuthState, errorAuthState] = useAuthState(auth);
  const router = useRouter();

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (loading || loadingAuthState) {
    return (
      <main className="flex flex-col items-center gap-4 min-h-screen p-24">
        <span className="loading loading-ring loading-lg"></span>
      </main>
    );
  }

  if (user) {
    router.push("/");
  }

  return (
    <main className="flex flex-col items-center gap-4 min-h-screen p-24">
      <h1 className="text-xl">Welcome to Motchi!</h1>
      <button onClick={() => signInWithGoogle()} className="btn btn-primary">
        Continue with Google
      </button>
      <button
        onClick={() => signInWithGoogle()}
        className="brn btn-link text-sm"
      >
        I already have an account
      </button>
    </main>
  );
}
