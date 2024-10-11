import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { addTodo } from "../../redux/todo";
// import { PlusIcon } from "@heroicons/react/16/solid";
import { toast, ToastContainer } from "react-toastify";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  // Show toast notifications for error messages
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }); // Show error toast
    }
  }, [error]);

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
      className="flex items-center"
    >
      {
        <ToastContainer
          position="top-center" // Positioning the toast at the top center
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      }
      <div className="flex-1 mr-2">
        <input
          onChange={handleUpdateTodoChange}
          value={task}
          type="text"
          className="forminput w-full p-2 border border-gray-300 rounded"
          placeholder="New Note"
        />
      </div>
      <button className="btn form_btn bg-amber-800 text-white py-2 px-3 rounded flex items-center">
        {/* <PlusIcon className="h-5 w-5 mr-1" /> */}
        {/*Plus Icon*/}
        <img
          src="assets/plus-circle.svg"
          alt="plus circle"
          className="h-5 w-5 mr-1"
        />
        Add
      </button>
    </form>
  );
};

export default AddTodo;
