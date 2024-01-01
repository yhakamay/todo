import { auth } from "@/lib/firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export function LoginButton() {
  const [signInWithGoogle, _, loadingSignInWithGoogle, __] =
    useSignInWithGoogle(auth);

  return (
    <button
      onClick={() => signInWithGoogle()}
      className="btn btn-primary"
      title="Sign in with Google"
      type="button"
      disabled={loadingSignInWithGoogle}
    >
      {loadingSignInWithGoogle && (
        <span className="loading loading-spinner"></span>
      )}
      Login
    </button>
  );
}
