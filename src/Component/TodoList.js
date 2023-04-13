import * as React from "react";
import styles from "./TodoList.module.css";
import TodoItem from "./TodoItem";
const TodoList = ({ list, dispatchForList }) => {
  //console.log(list)
  return (
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
  );
};
export default TodoList;
