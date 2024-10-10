import React from 'react'
import TodoItem from "./TodoItem/TodoItem";
import { TodoInterface } from "../../models/TodoModel";

type TodoListProps = {
  todos: TodoInterface[];
};

const TodoList = ({todos}:TodoListProps) => {
  return (
    <ul className="todo-list">
     {todos.map((todo) => (
      <TodoItem
        todo={todo}
      />
    ))}

    </ul>
  )
}

export default TodoList