import { Todo } from "@/types/todo";

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <div className="text-center border border-base-content card bg-base-100">
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
        <h2 className="text-xl">{todo.title}</h2>
        <p className={todo.description ? "" : "italic"}>
          {todo.description ?? "No description"}
        </p>
      </div>
    </div>
  );
}
