import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./redux/store";
import { fetchTodo } from "./redux/todo"; // Import the fetchTodo action
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  // here we are subsribed to todos state and read it on each time it changes
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const error = useSelector((state: RootState) => state.todos.error);

  // Dispatch fetchTodo action when the component loads
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
      <main className="app">
        <div className="app__wrapper">
          <div className="app__header">
            <h1 className="app__title">Todo App</h1>
          </div>
            {/* Show loading message while fetching todos */}
            {loading && <p>Loading todos...</p>}

            {/* Show error message if there's an error */}
            {error && <p className="error">{error}</p>}
          <div className="app__inputs-box">
            <AddTodo />
          </div>
          <TodoList
            todos={todos}
          />
        </div>
      </main>
  );
}

export default App;
