import * as React from "react";

function taskInputReducer(task, action) {
  if (action.type === "title") {
    //console.log(action, task)
    return {
      ...task,
      title: action.title,
    };
  }
  if (action.type === "priority") {
    return {
      ...task,
      priority: action.priority,
    };
  }
  if (action.type === "dueDate") {
    return {
      ...task,
      dueDate: action.dueDate,
    };
  }
  if (action.type === "taskDesc") {
    return {
      ...task,
      taskDesc: action.taskDesc,
    };
  }
  if (action.type === "reset") {
    return {
      id: Date.now(),
      title: "",
      dueDate: "",
      priority: "none",
      taskDesc: "",
      status: "todo",
    };
  }
}

const InputForm = ({ dispatchForList }) => {
  const [taskInput, dispatch] = React.useReducer(taskInputReducer, {
    id: Date.now(),
    title: "",
    dueDate: "",
    priority: "none",
    taskDesc: "",
    status: "todo",
  });
  const { title, dueDate, priority, taskDesc } = taskInput;
  //console.log(title, dueDate, priority, taskDesc);
  function onChangeTitle(event) {
    //console.log(title)
    dispatch({
      type: "title",
      title: event.target.value,
    });
  }
  function onChangeDueDate(event) {
    //console.log(event.target.value)
    dispatch({
      type: "dueDate",
      dueDate: event.target.value,
    });
  }
  function onChangePriority(event) {
    //console.log(event.target.value)
    dispatch({
      type: "priority",
      priority: event.target.value,
    });
  }
  function onChangeTaskDesc(event) {
    dispatch({
      type: "taskDesc",
      taskDesc: event.target.value,
    });
  }
  function submitHandler(e) {
    e.preventDefault();
    //console.log(taskInput)
    dispatchForList({
      type: "add",
      item: taskInput,
    });
    console.log(e.target);
    dispatch({ type: "reset" });
  }

  return (
    <form id="todo" onSubmit={submitHandler}>
      <fieldset>
        <legend align="center"> Add task </legend>
        <label htmlFor="task-title">Enter the task:</label>
        <input
          type="text"
          id="task-title"
          value={title}
          onChange={onChangeTitle}
          required
        />
        <label htmlFor="due-date">Due date:</label>
        <input
          type="date"
          id="due-date"
          value={dueDate}
          onChange={onChangeDueDate}
          required
        />
        <label htmlFor="priority-index">Priority:</label>
        <select
          id="priority-index"
          value={priority}
          onChange={onChangePriority}
        >
          <option value="none">None</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label htmlFor="task-decription">Description:</label>
        <textarea
          rows="3"
          id="task-description"
          value={taskDesc}
          onChange={onChangeTaskDesc}
        ></textarea>
        <div className="form-control">
          <button type="submit" value="Submit">
            Add task
          </button>
          <button type="reset" value="Reset">
            {" "}
            Reset{" "}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default InputForm;
