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
      {todo.description && todo.description.length > 0 && <p>Description</p>}
      {todo.completedDates !== null && todo.completedDates.length > 0 && (
        <ul className="timeline not-prose">
          <li>
            <div className="timeline-start">
              {todo.createdAt.toLocaleDateString()}
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="currentColor"
              >
                <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </div>
            <hr />
          </li>
          {todo.completedDates.map((completedDate, index) => (
            <li key={completedDate.toISOString()}>
              <hr />
              <div className="timeline-start">
                {completedDate.toLocaleDateString()}
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="currentColor"
                >
                  <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              </div>
              {index !== todo.completedDates!.length - 1 && <hr />}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
