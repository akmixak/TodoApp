import { useState, useCallback } from "react";
import styles from "./InputForm.module.css";
import useColors from "./useColors";

const InputForm = ({ dispatchForList }) => {
  const DEFAULT_VALUE = {
    id: Date.now(),
    title: "",
    dueDate: "",
    priority: "0",
    taskDesc: "",
    status: "todo",
    color: "purple",
  };

  const [taskInput, setTaskInput] = useState(DEFAULT_VALUE);
  const { title, dueDate, priority, taskDesc, color } = taskInput;
  const colors = useColors();
  let date = new Date();
  //console.log(date);
  let today = date.toISOString().split("T")[0];
  //console.log(today);
  const validateForm = useCallback((inputObj) => {
    if (inputObj.title.length >= 30) {
      return false;
    }
    if (!inputObj.dueDate) {
    }
    if (!inputObj.taskDesc) {
    }
    return true;
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    if (validateForm(taskInput)) {
      dispatchForList({
        type: "add",
        item: taskInput,
      });
      console.log(e.target);
      setTaskInput(DEFAULT_VALUE);
    }
  };

  function onChange(event) {
    console.log(event.target.value);
    setTaskInput({ ...taskInput, [event.target.id]: event.target.value });
  }
  return (
    <form id="todo" onSubmit={submitHandler}>
      <fieldset>
        <legend> Add task </legend>
        <label htmlFor="title">Enter the task:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={onChange}
          required
        />
        {title.length >= 30 ? (
          <div className={styles.alert}>This is an alert box.</div>
        ) : null}
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          min={today}
          value={dueDate}
          onChange={onChange}
          required
        />
        <label htmlFor="priority">Priority</label>
        <select id="priority" value={priority} onChange={onChange}>
          <option value="0">None</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
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
        <textarea rows={3} id="taskDesc" value={taskDesc} onChange={onChange} />
        <div class={styles.form_control}>
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
