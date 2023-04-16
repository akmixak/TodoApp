import styles from "./TodoItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoItem = ({ item, dispatchForList }) => {
  //console.log(item.id)
  console.log(item.color);
  return (
    <li key={item.key} style={{ color: item.color }}>
      <p>Title: {item.title}</p>
      <p>Due-Date: {item.dueDate}</p>
      <p>Priority: {item.priority}</p>
      <p>taskDesc: {item.taskDesc}</p>
      <div class={styles["btn-group"]}>
        <button
          onClick={() => dispatchForList({ id: item.id, type: "delete" })}
        >
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
      </div>
    </li>
  );
};
export default TodoItem;
