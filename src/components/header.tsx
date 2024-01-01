"use client";

import { auth } from "@/lib/firebase/auth";
import Image from "next/image";
import Link from "next/link";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";
import ThemeController from "./theme-controller";

export default function Header() {
  const [
    signInWithGoogle,
    _user,
    loadingSignInWithGoogle,
    _errorSignInWithGoogle,
  ] = useSignInWithGoogle(auth);
  const [user, loadingAuthState, _errorAuthState] = useAuthState(auth);
  const [signOut, loadingSignOut, _errorSignOut] = useSignOut(auth);

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost">
          motchi
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 500 500"
          >
            <path d="M106.000000,6.500000 C102.658691,6.826805 101.433189,8.880114 101.496811,12.000065 C101.517197,12.999649 101.500000,14.000000 101.500000,15.000000 C101.500000,172.333328 101.498886,329.666656 101.513466,487.000000 C101.513641,488.838623 101.378700,490.658539 101.960121,492.512512 C104.062057,499.214966 105.661987,500.500000 112.500000,500.500000 C204.833328,500.500000 297.166656,500.501709 389.500000,500.489563 C391.666656,500.489258 394.860535,501.196198 395.797913,500.080261 C398.148315,497.282257 400.368256,494.014648 400.495270,489.999847 C400.526855,489.000854 400.500000,488.000000 400.500000,487.000000 C400.500000,329.666656 400.490082,172.333328 400.530243,15.000008 C400.532196,7.367069 399.632935,6.465443 392.000000,6.469215 C296.833344,6.516255 201.666672,6.500000 106.500000,6.500000" />
          </svg>
        </Link>
      </div>
      <div className="flex-none">
        <ThemeController />
        <div>
          {loadingAuthState || loadingSignOut ? (
            <div className="w-12 flex flex-row justify-center">
              <div className="skeleton w-8 h-8 rounded-full"></div>
            </div>
          ) : user ? (
            <>
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
                      src={
                        user.photoURL ? user.photoURL : "/account_circle.svg"
                      }
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
          ) : (
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-primary"
              title="Sign in with Google"
              type="button"
              disabled={loadingSignInWithGoogle || loadingAuthState}
            >
              {(loadingSignInWithGoogle || loadingAuthState) && (
                <span className="loading loading-spinner"></span>
              )}
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
