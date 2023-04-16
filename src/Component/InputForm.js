import * as React from "react";
import { useEffect, useState } from "react";
import styles from "./InputForm.module.css";

function useColors() {
  const [colors, setColors] = useState([]);
  useEffect(() => {
    const getColors = async () => {
      let controller = new AbortController();
      const resp = await fetch(
        "https://api.sampleapis.com/csscolornames/colors",
        {
          signal: controller.signal,
        }
      );
      const json = await resp.json();

      setColors(json);
      return () => controller.abort();
    };
    getColors();
  }, []);
  return colors;
}
const InputForm = ({ dispatchForList }) => {
  const DEFAULT_VALUE = {
    id: Date.now(),
    title: "",
    dueDate: "",
    priority: "none",
    taskDesc: "",
    status: "todo",
    color: "",
  };
  const [taskInput, setTaskInput] = React.useState(DEFAULT_VALUE);
  const { title, dueDate, priority, taskDesc, color } = taskInput;
  const colors = useColors();

  function submitHandler(e) {
    e.preventDefault();
    dispatchForList({
      type: "add",
      item: taskInput,
    });
    console.log(e.target);
    setTaskInput(DEFAULT_VALUE);
  }

  function onChange(event) {
    setTaskInput({ ...taskInput, [event.target.id]: event.target.value });
  }

  return (
    <form id="todo" onSubmit={submitHandler}>
      <fieldset>
        <legend align="center"> Add task </legend>
        <label htmlFor="title">Enter the task:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={onChange}
          required
        />
        <label htmlFor="dueDate">Due date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={onChange}
          required
        />
        <label htmlFor="priority">Priority:</label>
        <select id="priority" value={priority} onChange={onChange}>
          <option value="none">None</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label htmlFor="color">Choose Color</label>
        <select id="color" value={color} onChange={onChange}>
          {colors.map((d) => {
            return (
              <option value={d.hex} key={d.id}>
                {d.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="taskDesc">Description:</label>
        <textarea
          rows="3"
          id="taskDesc"
          value={taskDesc}
          onChange={onChange}
        ></textarea>
        <div className={styles.form_control}>
          <button type="submit" value="Submit">
            Add task
          </button>
          <button type="reset" value="Reset">
            Reset
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default InputForm;
