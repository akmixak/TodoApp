import styles from "./TodoItem.module.css";
import React, { useCallback, useState } from "react";
import LongPara from "./LongPara.js";
//import DeleteIcon from "@mui/icons-material/Delete";
const formatDate = (date: string) => {
  const arr = date.split("-");
  return `${arr[2]}-${arr[1]}-${arr[0]}`;
};

let TodoItem = ({ item, dispatchForList }) => {
  const [editTask, setEditTask] = useState(false);
  const [task, setTask] = useState(item);
  const getPriority = useCallback((value) => {
    switch (value) {
      case "0":
        return "none";
      case "1":
        return "Low";
      case "2":
        return "Medium";
      case "3":
        return "High";
      default:
        throw new Error("Invalid priority value");
    }
  }, []);
  //console.log(item.id)
  const onChange = (e) => {
    setTask({
      ...task,
      [e.target.id]: e.target.value,
    });
  };
  const onClick = (e) => {
    if (editTask) {
      e.preventDefault();
      dispatchForList({
        id: task.id,
        type: "update",
        updates: task,
      });
    }
    setEditTask((prev) => !prev);
  };

  return (
    <li key={item.key} style={{ backgroundColor: item.color }}>
      <div
        className={styles["btn-group"]}
        style={{ backgroundColor: item.color }}
      >
        <button
          onClick={() => dispatchForList({ id: item.id, type: "delete" })}
        >
          Remove
        </button>
        {item.status === "todo" && (
          <button onClick={onClick}>{editTask ? "Save" : "Edit"}</button>
        )}
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
      <div className={styles.content}>
        <p className={styles.title}>
          {editTask ? (
            <input
              id="title"
              type="text"
              value={task.title}
              onChange={onChange}
            />
          ) : (
            <strong>{item.title}</strong>
          )}
        </p>
        <p className={styles.otherFields}>
          <strong>Due Date: </strong>
          {editTask ? (
            <input
              id="dueDate"
              type="date"
              value={task.dueDate}
              onChange={onChange}
              min={new Date().toISOString().split("T")[0]}
            />
          ) : (
            formatDate(item.dueDate)
          )}
        </p>
        <p className={styles.otherFields}>
          <strong>Priority: </strong>
          {editTask ? (
            <select id="priority" value={task.priority} onChange={onChange}>
              <option value="0">None</option>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          ) : (
            getPriority(item.priority)
          )}
        </p>
        <p className={styles.otherFields}>
          <strong>Description: </strong>
          {editTask ? (
            <textarea id="taskDesc" value={task.taskDesc} onChange={onChange} />
          ) : item.taskDesc.length > 100 ? (
            <LongPara>{item.taskDesc}</LongPara>
          ) : (
            item.taskDesc
          )}
        </p>
      </div>
    </li>
  );
};
TodoItem = React.memo(TodoItem, (prev, curr) => {
  for (let key in prev) {
    if (prev[key] !== curr[key]) {
      return false;
    }
  }
  return true;
});
export default TodoItem;
