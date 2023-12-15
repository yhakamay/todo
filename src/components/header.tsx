"use client";

import { auth } from "@/lib/firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

export default function Header() {
  const [user, loadingAuthState, _errorAuthState] = useAuthState(auth);
  const [signOut, loadingSignOut, _errorSignOut] = useSignOut(auth);

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost">
          motchi
          <Image src={"/motchi.svg"} width={20} height={20} alt={"logo"} />
        </Link>
      </div>
      <div className="flex-none">
        {user && !loadingAuthState && !loadingSignOut && (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
                title="User menu"
              >
                <div className="w-10 rounded-full">
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
          </>
        )}
      </div>
    </header>
  );
}
