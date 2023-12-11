"use client";

import FailedToFetchAlert from "@/components/failed-to-fetch-alert";
import TodoCardList from "@/components/todo-card-list";
import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";
import { Todo } from "@/types/todo";
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Home() {
  const titleRef = useRef<HTMLInputElement>(null);
  const frequencyRef = useRef<HTMLSelectElement>(null);
  const [user, _, errorAuthState] = useAuthState(auth);
  const query = user
    ? collection(db, "users", user!.uid, "todos").withConverter(todoConverter)
    : null;
  const options = {
    snapshotListenOptions: { includeMetadataChanges: true },
  };
  const [todos, loading, error, __] = useCollectionData<Todo>(query, options);

  if (!user) {
    return (
      <main className="flex flex-col items-center gap-4 min-h-screen p-24">
        <Image src={"/motchi.svg"} width={64} height={64} alt={"logo"} />
        <h1 className="text-2xl font-black">Sign in to continue</h1>
        <p className="mb-8">
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
      </main>
    );
  }

  if (error || errorAuthState) {
    return (
      <main className="flex flex-col items-center gap-4 min-h-screen p-24">
        <FailedToFetchAlert />
      </main>
    );
  }

  if (loading || todos === undefined) {
    return (
      <main className="flex flex-col items-center gap-4 min-h-screen p-24">
        <span className="loading loading-ring loading-lg"></span>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center gap-4 min-h-screen p-24">
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
      <h2 className="text-xl mt-4">Today</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        <TodoCardList todos={todos} frequency="daily" />
      </div>
      <h2 className="text-xl mt-4">This week</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        <TodoCardList todos={todos} frequency="weekly" />
      </div>
      <h2 className="text-xl mt-4">This month</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        <TodoCardList todos={todos} frequency="monthly" />
      </div>
      <h2 className="text-xl mt-4">This year</h2>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        <TodoCardList todos={todos} frequency="yearly" />
      </div>
    </main>
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

const todoConverter = {
  toFirestore: function (todo: Todo): DocumentData {
    return {
      title: todo.title,
      description: todo.description,
      createdAt: todo.createdAt,
      lastUpdatedAt: todo.lastUpdatedAt,
      frequency: todo.frequency,
      completedDates: todo.completedDates,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Todo {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt.toDate(),
      lastUpdatedAt: data.lastUpdatedAt.toDate(),
      frequency: data.frequency,
      completedDates: data.completedDates?.map((date: any) => date.toDate()),
    };
  },
};
