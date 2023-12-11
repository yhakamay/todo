"use client";

import { onAuthStateChanged, signOut } from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type HeaderProps = {
  initialUser: User | null;
};

export default function Header(props: HeaderProps) {
  const { initialUser } = props;
  const user = useUserSession(initialUser);
  const router = useRouter();
  const handleSignOut = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          motchi
        </Link>
      </div>
      <div className="flex-none">
        {user ? (
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
                  <button onClick={handleSignOut} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link href="/login">Sign In</Link>
        )}
      </div>
    </header>
  );
}

function useUserSession(initialUser: User | null) {
  const [user, setUser] = useState<User | null>(initialUser);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (user === undefined) {
        return;
      }

      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}
