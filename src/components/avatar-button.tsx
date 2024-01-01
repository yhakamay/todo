import { User } from "firebase/auth";
import Image from "next/image";

type Props = {
  user: User;
  signOut: () => Promise<boolean>;
};

export default function AvatarButton(props: Props) {
  const { user, signOut } = props;

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
