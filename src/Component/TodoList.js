import * as React from "react";
import styles from "./TodoList.module.css";
import TodoItem from "./TodoItem";
import { useCallback, useState, useMemo } from "react";

const TodoList = ({ list, dispatchForList, listType }) => {
  const [sortBy, setSortBy] = useState("id");

  const onChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);
  const sortCallback = useCallback(
    (item1, item2) => {
      if (item1[sortBy] < item2[sortBy]) {
        return 1;
      }
      if (item1[sortBy] > item2[sortBy]) {
        return -1;
      }
      return 0;
    },
    [sortBy]
  );
  list = useMemo(() => list.sort(sortCallback), [sortCallback, list]);

  return (
    <div>
      <div className={styles.header}>
        <h3>{`${listType} List`}</h3>
        <label htmlFor="sortBy"></label>
        <select
          id="sortBy"
          className={styles["sortBy"]}
          value={sortBy}
          onChange={onChange}
        >
          <option value="id">New on Top</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <ul>
        {list.map((item) => {
          return (
            <TodoItem
              key={item.id}
              dispatchForList={dispatchForList}
              item={item}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default TodoList;
