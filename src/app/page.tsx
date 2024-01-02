"use client";

import FailedToFetchAlert from "@/components/failed-to-fetch-alert";
import NewTodoFields from "@/components/new-todo-fields";
import TodoCardList from "@/components/todo-card-list";
import TodoCardListSkeleton from "@/components/todo-card-list-skeleton";
import { todoConverter } from "@/lib/converters/todo-converter";
import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";
import { Todo } from "@/types/todo";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Home() {
  const [user, loadingUser, errorAuthState] = useAuthState(auth);
  const query = user
    ? collection(db, "users", user!.uid, "todos").withConverter(todoConverter)
    : null;
  const options = {
    snapshotListenOptions: { includeMetadataChanges: true },
  };
  const [todos, loading, error, __] = useCollectionData<Todo>(query, options);

  if (loadingUser) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  if (!user) {
    return <h1>Oops! Not signed in</h1>;
  }

  if (error || errorAuthState) {
    return <FailedToFetchAlert />;
  }

  return (
    <>
      <NewTodoFields />
      <div className="pointer-events-none opacity-70 hidden md:flex w-full">
        <p className="not-prose text-sm">
          Pro tip: Hit <kbd className="kbd kbd-xs">return</kbd> to add a new
          todo
        </p>
      </div>
      <h2 className="mt-8 mb-0">Today</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        {loading || todos === undefined ? (
          <TodoCardListSkeleton count={3} />
        ) : (
          <TodoCardList todos={todos} frequency="daily" />
        )}
      </div>
      <h2 className="mt-8 mb-0">This week</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        {loading || todos === undefined ? (
          <TodoCardListSkeleton count={3} />
        ) : (
          <TodoCardList todos={todos} frequency="weekly" />
        )}
      </div>
      <h2 className="mt-8 mb-0">This month</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        {loading || todos === undefined ? (
          <TodoCardListSkeleton count={3} />
        ) : (
          <TodoCardList todos={todos} frequency="monthly" />
        )}
      </div>
      <h2 className="mt-8 mb-0">This year</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        {loading || todos === undefined ? (
          <TodoCardListSkeleton count={3} />
        ) : (
          <TodoCardList todos={todos} frequency="yearly" />
        )}
      </div>
    </>
  );
}
