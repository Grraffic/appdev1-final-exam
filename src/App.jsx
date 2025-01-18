import "./App.css";
import { TodoProvider } from "./context/TodoContext"; // Use named import
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </>
  );
}

export default App;
