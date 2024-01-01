"use client";

import FailedToFetchAlert from "@/components/failed-to-fetch-alert";
import NewTodoFields from "@/components/new-todo-fields";
import TodoCardList from "@/components/todo-card-list";
import TodoCardListSkeleton from "@/components/todo-card-list-skeleton";
import { todoConverter } from "@/lib/converters/todo-converter";
import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";
import { Todo } from "@/types/todo";
import { addDoc, collection } from "firebase/firestore";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Home() {
  const titleRef = useRef<HTMLInputElement>(null);
  const frequencyRef = useRef<HTMLSelectElement>(null);
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
      <NewTodoFields
        titleRef={titleRef}
        frequencyRef={frequencyRef}
        handleClick={handleClick}
      />
      <h2 className="mt-8 mb-0">Today</h2>
      <div className="flex flex-col w-full max-w-4xl">
        {loading || todos === undefined ? (
          <TodoCardListSkeleton count={3} />
        ) : (
          <TodoCardList todos={todos} frequency="daily" />
        )}
      </div>
      <h2 className="mt-8 mb-0">This week</h2>
      <div className="flex flex-col w-full max-w-4xl">
        {loading || todos === undefined ? (
          <TodoCardListSkeleton count={3} />
        ) : (
          <TodoCardList todos={todos} frequency="weekly" />
        )}
      </div>
      <h2 className="mt-8 mb-0">This month</h2>
      <div className="flex flex-col w-full max-w-4xl">
        {loading || todos === undefined ? (
          <TodoCardListSkeleton count={3} />
        ) : (
          <TodoCardList todos={todos} frequency="monthly" />
        )}
      </div>
      <h2 className="mt-8 mb-0">This year</h2>
      <div className="flex flex-col w-full max-w-4xl">
        {loading || todos === undefined ? (
          <TodoCardListSkeleton count={3} />
        ) : (
          <TodoCardList todos={todos} frequency="yearly" />
        )}
      </div>
    </>
  );

  async function handleClick() {
    await addTodo();
    if (titleRef.current) {
      titleRef.current.value = "";
    }
    titleRef.current?.focus();
  }

  async function addTodo() {
    if (!titleRef.current?.value) return;
    if (!frequencyRef.current?.value) return;

    const newTodo: Todo = {
      title: titleRef.current?.value,
      description: null,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
      frequency: (frequencyRef.current?.value as Todo["frequency"]) ?? null,
      completedDates: [],
    };

    try {
      const myTodosRef = collection(
        db,
        "users",
        auth.currentUser!.uid,
        "todos"
      );
      await addDoc(myTodosRef, newTodo);
    } catch (e) {
      // TODO: Handle error
    }
  }
}
