import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";

const TaskList: FC = () => {
  const [task, setTask] = useState<string>("");
  const [taskStatus, setTaskStatus] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [currentId, setTaskId] = useState<number>(0);
  const [editMode, setEditMode] = useState<number | null>(null); // Track the task being edited

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const changeType = event.target.name;
    switch (changeType) {
      case "task":
        setTask(event.target.value);
        break;
      case "taskStatus":
        setTaskStatus(event.target.value);
        break;
      default:
        console.log("Switch, case: casename: ", changeType);
    }
  };

  const addTask = (): void => {
    if(task!="" && taskStatus!=""){
      const newTask = { taskName: task, taskStatus: taskStatus, taskId: currentId };
      setTodoList([...todoList, newTask]);
      setTask("");
      setTaskStatus("");
      const nextId = currentId + 1;
      setTaskId(nextId);
    }
    
  };

  const deleteTask = (taskIdToDelete: number): void => {
    setTodoList(todoList.filter((task) => task.taskId !== taskIdToDelete));
  };

  const editTask = (taskIdToEdit: number): void => {
    setEditMode(taskIdToEdit);
  };

  const saveEditedTask = (editedTask: ITask): void => {
    const updatedList = todoList.map((task) =>
      task.taskId === editedTask.taskId ? editedTask : task
    );
    setTodoList(updatedList);
    setEditMode(null);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="string"
            placeholder="Status of task"
            name="taskStatus"
            value={taskStatus}
            onChange={handleChange}
          />
        </div>

        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return (
            <TodoTask
              key={key}
              task={task}
              deleteTask={deleteTask}
              editTask={editTask}
              saveEditedTask={saveEditedTask}
              editMode={editMode === task.taskId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;