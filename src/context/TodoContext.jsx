import React, { createContext, useState, useEffect } from "react";

// Create a context for the Todo app
const TodoContext = createContext();

// Function to fetch todos
const fetchTodos = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    const data = await response.json();
    return data; // Return fetched data
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return []; // Return an empty array on failure
  }
};

export const TodoProvider = ({ children }) => {
  // Initialize state for todos and loading
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch todos when the component mounts
  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true); // Set loading to true while fetching
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
      setLoading(false); 
    };

    loadTodos();
  }, []);

  // Add a new todo to the list
  const addTodo = (title) => {
    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
      userId: 1,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Remove a todo by its ID
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Toggle the completion status of a todo
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, loading, addTodo, deleteTodo, toggleComplete }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to consume the TodoContext
export const useTodos = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
