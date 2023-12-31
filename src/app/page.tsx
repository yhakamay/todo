"use client";

import FailedToFetchAlert from "@/components/failed-to-fetch-alert";
import TodoCardList from "@/components/todo-card-list";
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
      <div className="flex flex-row gap-2 w-full max-w-4xl">
        <input
          type="text"
          ref={titleRef}
          placeholder="Type new todo"
          autoFocus
          className="input input-bordered w-full"
        />
        <select
          ref={frequencyRef}
          className="select select-bordered w-32"
          defaultValue=""
          title="Frequency"
        >
          <option value="" disabled>
            Frequency
          </option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="once">Once</option>
        </select>
        <button onClick={handleClick} className="btn btn-primary self-center">
          Add
        </button>
      </div>
      <h2 className="mt-4">Today</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        {loading || todos === undefined ? (
          <>
            <div className="skeleton w-full h-32"></div>
            <div className="skeleton w-full h-32"></div>
            <div className="skeleton w-full h-32"></div>
          </>
        ) : (
          <TodoCardList todos={todos} frequency="daily" />
        )}
      </div>
      <h2 className="mt-4">This week</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        {loading || todos === undefined ? (
          <>
            <div className="skeleton w-full h-32"></div>
            <div className="skeleton w-full h-32"></div>
            <div className="skeleton w-full h-32"></div>
          </>
        ) : (
          <TodoCardList todos={todos} frequency="weekly" />
        )}
      </div>
      <h2 className="mt-4">This month</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        {loading || todos === undefined ? (
          <>
            <div className="skeleton w-full h-32"></div>
            <div className="skeleton w-full h-32"></div>
            <div className="skeleton w-full h-32"></div>
          </>
        ) : (
          <TodoCardList todos={todos} frequency="monthly" />
        )}
      </div>
      <h2 className="mt-4">This year</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        {loading || todos === undefined ? (
          <>
            <div className="skeleton w-full h-32"></div>
            <div className="skeleton w-full h-32"></div>
            <div className="skeleton w-full h-32"></div>
          </>
        ) : (
          <TodoCardList todos={todos} frequency="yearly" />
        )}
      </div>
    </>
  );

  async function handleClick() {
    console.info("Adding todo");
    await addTodo();
    console.info("Todo added");
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
      console.error("Error adding document: ", e);
    }
  }
}
