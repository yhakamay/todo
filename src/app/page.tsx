"use client";

import TodoCard from "@/components/todo-card";
import { Todo } from "@/types/todo";
import { useRef, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const frequencyRef = useRef<HTMLSelectElement>(null);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <div className="flex flex-row gap-2 w-full max-w-lg">
        <input
          type="text"
          ref={titleRef}
          placeholder="Type new todo"
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
      <div className="flex flex-col gap-2 w-full max-w-lg">
        {todos.map((todo) => (
          <TodoCard todo={todo} key={todo.id} />
        ))}
      </div>
    </main>
  );

  function handleClick() {
    addTodo();
    if (titleRef.current) {
      titleRef.current.value = "";
    }
    titleRef.current?.focus();
  }

  function addTodo() {
    if (!titleRef.current?.value) return;
    if (!frequencyRef.current?.value) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: titleRef.current?.value,
      description: null,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
      frequency: (frequencyRef.current?.value as Todo["frequency"]) ?? null,
      completed: [],
    };

    setTodos([...todos, newTodo]);
  }
}
