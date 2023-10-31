import React, { FC, ChangeEvent, useState } from "react";
import { ITask } from "../Interfaces";

interface TodoTaskProps {
  task: ITask;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number) => void;
  saveEditedTask: (editedTask: ITask) => void;
  editMode: boolean;
}

const TodoTask: FC<TodoTaskProps> = ({
  task,
  deleteTask,
  editTask,
  saveEditedTask,
  editMode,
}) => {
  const [editedTaskName, setEditedTaskName] = useState<string>(task.taskName);
  const [editedTaskStatus, setEditedTaskStatus] = useState<string>(task.taskStatus);

  const handleEdit = () => {
    editTask(task.taskId);
  };

  const handleSave = () => {
    const editedTask = { ...task, taskName: editedTaskName, taskStatus: editedTaskStatus };
    saveEditedTask(editedTask);
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input
            type="text"
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
          />
          <input
            type="text"
            value={editedTaskStatus}
            onChange={(e) => setEditedTaskStatus(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <div>{task.taskName}</div>
          <div>{task.taskStatus}</div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => deleteTask(task.taskId)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoTask;