function TodoInput({ task, setTask, addTask }) {
  return (
    <>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
      />
      <button onClick={addTask}>Add</button>
    </>
  );
}

export default TodoInput;