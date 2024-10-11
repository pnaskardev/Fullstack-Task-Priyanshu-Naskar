import TodoItem from "./TodoItem/TodoItem";
import { TodoInterface } from "../../models/TodoModel";

type TodoListProps = {
  todos: TodoInterface[];
};

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div className="todo-list-container ">
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id} // Adding a unique key for each item
            todo={todo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
