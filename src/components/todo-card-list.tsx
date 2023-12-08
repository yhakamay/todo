import { Todo } from "@/types/todo";
import TodoCard from "./todo-card";
import NoTodoAlert from "./no-todo-alert";

type todoCardListPtops = {
  todos: Todo[];
  frequency: "daily" | "weekly" | "monthly" | "yearly" | "once";
};

export default function TodoCardList(props: todoCardListPtops) {
  const { todos, frequency } = props;
  const filteredTodos = todos.filter((todo) => todo.frequency === frequency);

  if (filteredTodos.length === 0) {
    return <NoTodoAlert message={`Nothing for ${frequency}!`} />;
  }

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {filteredTodos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
