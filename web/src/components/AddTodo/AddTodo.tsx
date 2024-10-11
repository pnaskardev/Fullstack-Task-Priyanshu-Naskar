import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { addTodo } from "../../redux/todo";
import { PlusIcon } from "@heroicons/react/16/solid";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const handleAddTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim().length < 5) {
      setError("Minimum allowed task length is 5");
    } else if (task.trim().length > 50) {
      setError("Maximum allowed task length is 50");
    } else {
      dispatch(addTodo({ task, id: uuidv4() }));
      setTask("");
    }
  };

  const handleUpdateTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    if (task.trim().length > 5 && task.trim().length < 50) {
      setError("");
    }
  };

  return (
    <form
      onSubmit={handleAddTaskSubmit}
      className="flex items-center space-x-2"
    >
      <div className="flex-1">
        <input
          onChange={handleUpdateTodoChange}
          value={task}
          type="text"
          className="forminput w-full p-2 border border-gray-300 rounded"
          placeholder="New Note"
        />
        {error && <p className="formerror-text text-red-500">{error}</p>}
      </div>
      <button className="btn form_btn bg-amber-900 text-white py-2 px-4 rounded flex items-stretch">
        <PlusIcon className="h-5 w-5 mr-1" />
        {/*Plus Icon*/}
        Add
      </button>
    </form>
  );
};

export default AddTodo;
