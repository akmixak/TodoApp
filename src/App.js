import "./App.css";
import * as React from "react";
import { useReducer } from "react";
import InputForm from "./Component/InputForm";
import TodoList from "./Component/TodoList";

function reducer(state, action) {
  if (action.type === "delete") {
    return state.filter((item) => item.id !== action.id);
  }

  if (action.type === "add") {
    return [...state, action.item];
  }
  if (action.type === "action") {
    return state.map((item) =>
      item.id === action.id ? { ...item, status: action.status } : item
    );
  }
}

function App() {
  const [taskList, dispatchForList] = useReducer(reducer, []); // imoport  diretly hooks

  //use one loop instead of using multiple loops
  const { todoList, activeTaskList, completedTaskList } = taskList.reduce(
    (obj, task) => {
      const { todoList, activeTaskList, completedTaskList } = obj;
      switch (task.status) {
        case "todo":
          todoList.push(task);
          break;

        case "started":
          activeTaskList.push(task);
          break;

        case "completed":
          completedTaskList.push(task);
          break;
      }

      return { todoList, activeTaskList, completedTaskList };
    },
    { todoList: [], activeTaskList: [], completedTaskList: [] }
  );

  console.log("Active", activeTaskList);
  console.log("Completed", completedTaskList);

  //enter line before return
  return (
    <div className="App">
      <InputForm dispatchForList={dispatchForList} />
      <div style={{ display: "flex" }}>
        <TodoList list={todoList} dispatchForList={dispatchForList} />
        <TodoList list={activeTaskList} dispatchForList={dispatchForList} />
        <TodoList list={completedTaskList} dispatchForList={dispatchForList} />
      </div>
    </div>
  );
}

export default App;
