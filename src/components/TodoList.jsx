import TodoItem from "./TodoItem";

function TodoList(props) {
  const { filteredTasks } = props;

  return (
    <ul>
      {filteredTasks.map((t) => (
        <TodoItem key={t.id} t={t} {...props} />
      ))}
    </ul>
  );
}

export default TodoList;