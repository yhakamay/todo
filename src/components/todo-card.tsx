import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";
import { Todo } from "@/types/todo";
import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";

type TodoCardProps = {
  todo: Todo;
  completed: boolean;
};

export default function TodoCard(props: TodoCardProps) {
  const { todo, completed } = props;

  return (
    <div
      className={`card card-compact bg-base-100 shadow-sm border ${
        completed ? "border-primary" : "border-base-content"
      }`}
    >
      <div className="card-body">
        <div className="flex flex-row justify-between">
          <h2 className="card-title">{todo.title}</h2>
          {completed && <div className="badge badge-primary">completed</div>}
        </div>
        <div className="card-actions justify-end">
          <Link href={`/${todo.id}`} className="btn btn-outline">
            Details
          </Link>
          <button
            onClick={() => handleClick(todo)}
            className="btn btn-square btn-outline"
            title="complete"
            type="button"
            disabled={completed}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const handleClick = async (todo: Todo) => {
  const docRef = doc(db, "users", auth.currentUser!.uid, "todos", todo.id!);

  await updateDoc(
    docRef,
    todo.completedDates
      ? {
          completedDates: [...todo.completedDates, new Date()],
        }
      : {
          completedDates: [new Date()],
        }
  );
};
