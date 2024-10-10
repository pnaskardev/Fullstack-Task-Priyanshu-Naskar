import React from 'react'

import { TodoInterface } from "../../../models/TodoModel";

type TodoItemProps = {
  todo: TodoInterface;
};

const TodoItem = ({todo}:TodoItemProps) => {
  return <li>{todo.task}</li> 
}

export default TodoItem