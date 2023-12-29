"use client";

import FailedToFetchAlert from "@/components/failed-to-fetch-alert";
import TodoCardList from "@/components/todo-card-list";
import { todoConverter } from "@/lib/converters/todo-converter";
import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";
import { Todo } from "@/types/todo";
import { addDoc, collection } from "firebase/firestore";
import Link from "next/link";
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
    return (
      <>
        <svg
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 500 500"
        >
          <path d="M106.000000,6.500000 C102.658691,6.826805 101.433189,8.880114 101.496811,12.000065 C101.517197,12.999649 101.500000,14.000000 101.500000,15.000000 C101.500000,172.333328 101.498886,329.666656 101.513466,487.000000 C101.513641,488.838623 101.378700,490.658539 101.960121,492.512512 C104.062057,499.214966 105.661987,500.500000 112.500000,500.500000 C204.833328,500.500000 297.166656,500.501709 389.500000,500.489563 C391.666656,500.489258 394.860535,501.196198 395.797913,500.080261 C398.148315,497.282257 400.368256,494.014648 400.495270,489.999847 C400.526855,489.000854 400.500000,488.000000 400.500000,487.000000 C400.500000,329.666656 400.490082,172.333328 400.530243,15.000008 C400.532196,7.367069 399.632935,6.465443 392.000000,6.469215 C296.833344,6.516255 201.666672,6.500000 106.500000,6.500000" />
        </svg>
        <h1>Sign in to continue</h1>
        <p className="mb-8 text-center">
          You need to sign in to motchi first to store your todos.
        </p>
        <Link autoFocus href="/login" replace className="btn btn-primary">
          Go to sign in page
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 -960 960 960"
            width="16"
          >
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
          </svg>
        </Link>
      </>
    );
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
