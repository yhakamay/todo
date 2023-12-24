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
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
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
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
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
