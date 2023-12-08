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
      </div>
    </div>
  );
}
