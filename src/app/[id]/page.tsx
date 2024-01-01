"use client";

import FailedToFetchAlert from "@/components/failed-to-fetch-alert";
import TodoTimeline from "@/components/todo-timeline";
import { todoConverter } from "@/lib/converters/todo-converter";
import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";
import { Todo } from "@/types/todo";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

type TodoDetailsProps = {
  params: {
    id: string;
  };
};

export default function TodoDetails(props: TodoDetailsProps) {
  const { id } = props.params;

  const [user, _loading, _error] = useAuthState(auth);
  const query = user
    ? doc(db, "users", user?.uid, "todos", id).withConverter(todoConverter)
    : null;
  const [todo, loadingTodo, errorTodo] = useDocumentData<Todo>(query);

  if (errorTodo) {
    return <FailedToFetchAlert />;
  }

  if (loadingTodo || !todo) {
    return (
      <>
        <div className="skeleton h-8 w-96"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </>
    );
  }

  return (
    <>
      <h1>{todo.title}</h1>
      {todo.description && todo.description.length > 0 && <p>Description</p>}
      {todo.completedDates !== null && todo.completedDates.length > 0 && (
        <TodoTimeline
          createdAt={todo.createdAt}
          completedDates={todo.completedDates}
        />
      )}
    </>
  );
}
