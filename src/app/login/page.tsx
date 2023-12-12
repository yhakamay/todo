"use client";

import { auth } from "@/lib/firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [_user, loadingAuthState, _errorAuthState] = useAuthState(auth);
  const router = useRouter();

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (loading || loadingAuthState) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  if (user) {
    router.push("/");
  }

  return (
    <>
      <Image src={"/motchi.svg"} width={64} height={64} alt={"logo"} />
      <h1>Welcome to motchi!</h1>
      <p className="mb-8 text-center">
        motchi helps you to keep your important things in mind.
      </p>
      <button
        autoFocus
        onClick={() => signInWithGoogle()}
        className="btn btn-primary"
      >
        Continue with Google
      </button>
      <button onClick={() => signInWithGoogle()} className="btn btn-link">
        I already have an account
      </button>
    </>
  );
}
