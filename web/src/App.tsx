import { CSSProperties, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./redux/store";
import { toast, ToastContainer } from "react-toastify";
import { fetchTodo } from "./redux/todo"; // Import the fetchTodo action
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";

import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { CgNotes } from "react-icons/cg";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const error = useSelector((state: RootState) => state.todos.error);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  // Dispatch fetchTodo action when the component loads
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

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

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* ToastContainer positioned at the top */}
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
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="app__header mb-4 flex items-stretch ">
          <CgNotes className="text-4xl mr-2" />
          <h1 className="app__title text-2xl font-bold text-left">Note App</h1>
        </div>
        {/* Show loading message while fetching todos */}
        <div className="app__inputs-box mb-4">
          <AddTodo />
        </div>
        <h2 className="font-bold text-l mb-2 border-b border-gray-300 pb-2">
          Notes
        </h2>{" "}
        {/* Bolded heading */}
        <div
          className="max-h-60 overflow-y-auto
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-gray-100
          dark:[&::-webkit-scrollbar-thumb]:bg-amber-900"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : todos.length === 0 ? ( // Check if todos length is zero
            <div className="text-left text-gray-500">
              No notes have been added.
            </div>
          ) : (
            <TodoList todos={todos} />
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
