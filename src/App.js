import "./App.css";
import * as React from "react";
import { useMemo } from "react";
import InputForm from "./Component/InputForm";
import TodoList from "./Component/TodoList";
import useLocalStorageState from "./Component/useLocalStorage";

function App() {
  const [taskList, dispatchForList] = useLocalStorageState([]); // imoport  diretly hooks
  //console.log(taskList);
  //use one loop instead of using multiple loops
  const { todoList, activeTaskList, completedTaskList } = useMemo(
    () =>
      taskList.reduce(
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
            default:
              break;
          }

          return { todoList, activeTaskList, completedTaskList };
        },
        { todoList: [], activeTaskList: [], completedTaskList: [] }
      ),
    [taskList]
  );
  // console.log("Active", activeTaskList);
  // console.log("Completed", completedTaskList);

  //enter line before return
  return (
    <div className="App">
      <InputForm dispatchForList={dispatchForList} />
      <div className="all-lists">
        <TodoList
          list={todoList}
          dispatchForList={dispatchForList}
          listType="Todo"
        />
        <TodoList
          list={activeTaskList}
          dispatchForList={dispatchForList}
          listType="Active"
        />
        <TodoList
          list={completedTaskList}
          dispatchForList={dispatchForList}
          listType="Completed"
        />
      </div>
    </div>
  );
}

export default App;
