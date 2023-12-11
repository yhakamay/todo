import { Todo } from "@/types/todo";

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <div className="card card-compact bg-base-100 shadow-sm border border-base-content">
      <div className="card-body">
        {todo.frequency === "daily" ? (
          <div className="badge badge-primary">daily</div>
        ) : todo.frequency === "weekly" ? (
          <div className="badge badge-secondary">weekly</div>
        ) : todo.frequency === "monthly" ? (
          <div className="badge badge-accent">monthly</div>
        ) : todo.frequency === "yearly" ? (
          <div className="badge badge-neutral">yearly</div>
        ) : (
          <div className="badge">once</div>
        )}
        <h2 className="card-title">{todo.title}</h2>
        <div className="card-actions justify-end">
          <button
            className="btn btn-square btn-outline"
            title="complete"
            type="button"
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
