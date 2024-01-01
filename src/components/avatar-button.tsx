"use client";

import { auth } from "@/lib/firebase/auth";
import Image from "next/image";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { LoginButton } from "./login-button";

export default function AvatarButton() {
  const [user, loadingAuthState, _errorAuthState] = useAuthState(auth);
  const [signOut, loadingSignOut, _errorSignOut] = useSignOut(auth);

  if (loadingAuthState || loadingSignOut) {
    return (
      <div className="w-12 flex flex-row justify-center">
        <div className="skeleton w-8 h-8 rounded-full"></div>
      </div>
    );
  }

  if (!user) return <LoginButton />;

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
          <button onClick={() => signOut()} className="text-error">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
