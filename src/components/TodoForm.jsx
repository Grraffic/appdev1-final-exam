const TodoForm = ({ addTodo, newTodo, setNewTodo }) => {
  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter todo title"
      />
      <button
        onClick={() => {
          addTodo(newTodo);
          setNewTodo("");
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;
