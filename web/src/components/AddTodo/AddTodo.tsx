import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../../redux/todo";
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
      });
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
    if (e.target.value.trim().length > 5 && e.target.value.trim().length < 50) {
      setError("");
    }
  };

  return (
    <form onSubmit={handleAddTaskSubmit} className="flex flex-col sm:flex-row sm:items-center justify-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex-1 mb-2 sm:mb-0 sm:mr-2">
        <input
          onChange={handleUpdateTodoChange}
          value={task}
          type="text"
          className="forminput w-full p-2 border border-gray-300 rounded"
          placeholder="New Note"
        />
      </div>
      <button className="btn form_btn bg-amber-800 text-white py-2 px-3 rounded flex items-center justify-center w-full sm:w-auto">
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

