"use client";

import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";
import { Todo } from "@/types/todo";
import { addDoc, collection } from "firebase/firestore";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";

export default function NewTodoFields() {
  const [data, setData] = useState({
    title: "",
    frequency: null,
  });
  const titleRef = useRef<HTMLInputElement>(null);

  const handleInput: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const { title, frequency } = data;

    if (!title || !frequency) return;

    const newTodo: Todo = {
      title: title as Todo["title"],
      description: null,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
      frequency: frequency as Todo["frequency"],
      completedDates: [],
    };

    // Clear title input
    setData({ ...data, title: "" });

    // Add new todo to Firestore
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
      console.error("Error adding document: ", e);
    }

    // Focus on title input
    titleRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl join join-vertical sm:join-horizontal"
    >
      <input
        type="text"
        name="title"
        ref={titleRef}
        placeholder="Type new todo"
        autoFocus
        className="input input-bordered w-full join-item"
        value={data.title}
        onChange={handleInput}
      />
      <select
        name="frequency"
        className="select select-bordered join-item"
        value={data.frequency || ""}
        title="Frequency"
        onChange={handleInput}
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
      <button className="btn btn-primary join-item" type="submit">
        Add
      </button>
    </form>
  );
}
