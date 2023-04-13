import styles from "./TodoItem.module.css";
const TodoItem = ({ item, dispatchForList }) => {
  //console.log(item.id)
  return (
    <li key={item.key}>
      <p>Title: {item.title}</p>
      <p>Due-Date: {item.dueDate}</p>
      <p>Priority: {item.priority}</p>
      <p>taskDesc: {item.taskDesc}</p>
      <button onClick={() => dispatchForList({ id: item.id, type: "delete" })}>
        Remove
      </button>
      {item.status !== "completed" ? (
        item.status === "started" ? (
          <button
            onClick={() =>
              dispatchForList({
                id: item.id,
                type: "action",
                status: "completed",
              })
            }
          >
            Mark as Done
          </button>
        ) : (
          <button
            onClick={() =>
              dispatchForList({
                id: item.id,
                type: "action",
                status: "started",
              })
            }
          >
            Start
          </button>
        )
      ) : null}
    </li>
  );
};
export default TodoItem;
