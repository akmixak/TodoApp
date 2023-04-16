import "./App.css";
import * as React from "react";
import { useReducer, useMemo } from "react";
import InputForm from "./Component/InputForm";
import TodoList from "./Component/TodoList";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "delete":
      return state.filter((item) => item.id !== action.id);
    case "action":
      console.log(action.id);

      const indexToChange = state.findIndex((item) => item.id === action.id);
      const beforeIndexToChange = state.slice(0, indexToChange);
      console.log(beforeIndexToChange);
      const afterIndexToChange = state.slice(indexToChange + 1);
      return [
        ...beforeIndexToChange,
        { ...state[indexToChange], status: action.status },
        ...afterIndexToChange,
      ];
    default:
      throw new Error(`${action.type} is not supported`);
  }
}

function useLocalStorageState(defaultValue) {
  let TODO_KEY = "todoapp";
  console.log(defaultValue);
  const [state, dispatch] = useReducer(reducer, defaultValue, () => {
    const prevTaskList = localStorage.getItem(TODO_KEY);
    if (prevTaskList) {
      return JSON.parse(prevTaskList);
    }
    return defaultValue;
  });

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
  React.useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(state));
  }, [TODO_KEY, state]);

  return [state, dispatch];
}

function App() {
  const [taskList, dispatchForList] = useLocalStorageState([]); // imoport  diretly hooks
  console.log(taskList);
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
        <TodoList list={todoList} dispatchForList={dispatchForList} />
        <TodoList list={activeTaskList} dispatchForList={dispatchForList} />
        <TodoList list={completedTaskList} dispatchForList={dispatchForList} />
      </div>
    </div>
  );
}

export default App;
