import { TodoInterface } from "../../../models/TodoModel";

type TodoItemProps = {
  todo: TodoInterface;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <li className="itemList mb-2 mt-2 border-b border-gray-300 pb-2">
      {todo.task}
    </li>
  );
};

export default TodoItem;
