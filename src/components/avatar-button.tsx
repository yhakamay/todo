"use client";

import Image from "next/image";
import { auth } from "@/lib/firebase/auth";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { LoginButton } from "./login-button";

export default function AvatarButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsub();
  });

  if (loading) {
    return <div className="skeleton w-8 h-8 rounded-full"></div>;
  }

  if (!user || user.isAnonymous) {
    return <LoginButton title="Login" style="primary" method="google" />;
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
        title="User menu"
      >
        <div className="w-8 rounded-full">
          <Image
            alt={user.displayName || user.email || "User"}
            width={40}
            height={40}
            src={user.photoURL ? user.photoURL : "/account_circle.svg"}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            onClick={() => auth.signOut()}
            className="text-error"
            type="button"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
