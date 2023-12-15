"use client";

import FailedToFetchAlert from "@/components/failed-to-fetch-alert";
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

  if (loadingTodo) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  if (!todo) {
    return <FailedToFetchAlert />;
  }

  return (
    <>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
    </>
  );
}
