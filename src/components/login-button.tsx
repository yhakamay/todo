import { auth } from "@/lib/firebase/auth";
import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

type Props = {
  title: string;
  disabled?: boolean;
  style: "primary" | "link";
  method: "google" | "anonymous";
};

export function LoginButton(props: Props) {
  const { title, disabled, style, method } = props;
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    if (method === "google") {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setLoading(false);
    } else {
      setLoading(true);
      await signInAnonymously(auth);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className={`btn btn-${style} ${disabled ? "disabled" : ""}`}
      title={title}
      type="button"
      disabled={loading || disabled}
    >
      {loading && <span className="loading loading-ring"></span>}
      {title}
    </button>
  );
}
