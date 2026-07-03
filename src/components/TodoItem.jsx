function TodoItem({
  t,
  editIndex,
  editText,
  setEditText,
  setEditIndex,
  toggleComplete,
  deleteTask,
  saveEdit,
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={t.completed}
        onChange={() => toggleComplete(t.id)}
      />

      {editIndex === t.id ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span
          style={{
            textDecoration: t.completed ? "line-through" : "none",
          }}
        >
          {t.text}
        </span>
      )}

      <button onClick={() => deleteTask(t.id)}>❌</button>

      {editIndex === t.id ? (
        <button onClick={() => saveEdit(t.id)}>Save</button>
      ) : (
        <button
          onClick={() => {
            setEditIndex(t.id);
            setEditText(t.text);
          }}
        >
          ✏️
        </button>
      )}
    </li>
  );
}

export default TodoItem;