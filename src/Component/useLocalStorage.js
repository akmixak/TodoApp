import { useReducer, useEffect } from "react";
let map = new Map();
function reducer(state, action) {
  switch (action.type) {
    case "add":
      map.set(action.item.id, action.item);
      return [...state, action.item];
    case "delete":
      map.delete(action.id);
      return state.filter((item) => item.id !== action.id);
    case "action":
      //   const indexToChange = state.findIndex((item) => item.id === action.id);
      //   const beforeIndexToChange = state.slice(0, indexToChange);
      //   //console.log(beforeIndexToChange);
      //   const afterIndexToChange = state.slice(indexToChange + 1);
      //   return [
      //     ...beforeIndexToChange,
      //     { ...state[indexToChange], status: action.status },
      //     ...afterIndexToChange,
      //   ];
      const objToChange = map.get(action.id);
      objToChange.status = action.status;
      objToChange.id = Date.now();
      map.delete(action.id);
      map.set(objToChange.id, objToChange);
      return [...state];
    case "update":
      //   const indexToUpdate = state.findIndex((item) => item.id === action.id);
      //   const beforeIndexToUpdate = state.slice(0, indexToUpdate);
      //   const afterIndexToUpdate = state.slice(indexToUpdate + 1);
      //   console.log(action.updates);
      //   return [
      //     ...beforeIndexToUpdate,
      //     { ...action.updates },
      //     ...afterIndexToUpdate,
      //   ];
      const objToUpdate = map.get(action.id);
      for (let key in action.updates) {
        objToUpdate[key] = action.updates[key];
      }
      return [...state];
    default:
      throw new Error(`${action.type} is not supported`);
  }
}

export default function useLocalStorageState(defaultValue) {
  let TODO_KEY = "todoapp";
  //console.log(defaultValue);
  const [state, dispatch] = useReducer(reducer, defaultValue, () => {
    let prevTaskList = localStorage.getItem(TODO_KEY);
    if (prevTaskList) {
      prevTaskList = JSON.parse(prevTaskList);
      for (let elem of prevTaskList) {
        map.set(elem.id, elem);
      }
      console.log(prevTaskList);
      return prevTaskList;
    }
    return defaultValue;
  });

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(state));
  }, [TODO_KEY, state]);

  return [state, dispatch];
}
