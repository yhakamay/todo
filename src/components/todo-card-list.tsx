"use client";

import { Todo } from "@/types/todo";
import TodoCard from "./todo-card";
import { useState } from "react";

type todoCardListPtops = {
  todos: Todo[];
  frequency: "daily" | "weekly" | "monthly" | "yearly" | "once";
};

export default function TodoCardList(props: todoCardListPtops) {
  const { todos, frequency } = props;
  const [expanded, setExpanded] = useState(true);
  const filteredTodos = todos.filter((todo) => todo.frequency === frequency);
  const incompleteTodos = filteredTodos.filter(
    // only todos that are not completed in the current frequency
    // for examle, if the frequency is "daily", only todos that are not completed today
    (todo) =>
      !todo.completedDates?.some((completedDate) => {
        const now = new Date();

        if (frequency === "daily") {
          return (
            completedDate.getDate() === now.getDate() &&
            completedDate.getMonth() === now.getMonth() &&
            completedDate.getFullYear() === now.getFullYear()
          );
        } else if (frequency === "weekly") {
          const now = new Date();
          const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
          const sunday = new Date(now);
          sunday.setDate(now.getDate() - dayOfWeek);
          sunday.setHours(0, 0, 0, 0);

          const saturday = new Date(sunday);
          saturday.setDate(sunday.getDate() + 6);
          saturday.setHours(23, 59, 59, 999);

          return completedDate >= sunday && completedDate <= saturday;
        } else if (frequency === "monthly") {
          return (
            completedDate.getMonth() === now.getMonth() &&
            completedDate.getFullYear() === now.getFullYear()
          );
        } else if (frequency === "yearly") {
          return completedDate.getFullYear() === now.getFullYear();
        } else {
          return false;
        }
      })
  );
  const completedTodos = filteredTodos.filter(
    (todo) => !incompleteTodos.includes(todo)
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {incompleteTodos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} completed={false} />
        ))}
      </div>
      <div
        className={`${expanded ? "stack" : "flex flex-col gap-2"}`}
        onClick={() => setExpanded(!expanded)}
      >
        {completedTodos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} completed />
        ))}
      </div>
    </>
  );
}
