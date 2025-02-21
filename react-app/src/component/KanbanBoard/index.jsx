import React, { useEffect, useState } from "react";
import "./style.css";

const initialData = {
  tasks: [],
  boards: {
    todo: [],
    inProgress: [],
    completed: [],
  },
};

const Task = ({ task, index, boardId, onDragStart, onDragOver, onDrop }) => (
  <div
    className="task"
    draggable
    onDragStart={(e) => onDragStart(e, boardId, index)}
    onDragOver={(e) => onDragOver(e, boardId, index)}
    onDrop={(e) => onDrop(e, boardId, index)}
  >
    {task.content}
  </div>
);

const Board = ({ title, tasks, boardId, onDragStart, onDragOver, onDrop }) => (
  <div
    className="board"
    onDragOver={(e) => onDragOver(e, boardId, tasks.length)}
    onDrop={(e) => onDrop(e, boardId, tasks.length)}
  >
    <h3>{title}</h3>
    <div className="task-list">
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          boardId={boardId}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </div>
  </div>
);

const TaskForm = ({ addTask }) => {
  const [taskContent, setTaskContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskContent.trim()) return;
    addTask(taskContent);
    setTaskContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

const KanbanBoard = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("kanbanData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("kanbanData", JSON.stringify(data));
  }, [data]);

  const addTask = (content) => {
    const newTask = { id: `task-${Date.now()}`, content };
    setData((prevData) => ({
      tasks: [...prevData.tasks, newTask],
      boards: {
        ...prevData.boards,
        todo: [...prevData.boards.todo, newTask.id],
      },
    }));
  };

  const onDragStart = (e, boardId, taskIndex) => {
    e.dataTransfer.setData("taskIndex", taskIndex);
    e.dataTransfer.setData("sourceBoardId", boardId);
  };

  const onDragOver = (e, boardId, index) => {
    e.preventDefault();
    e.dataTransfer.setData("targetIndex", index);
  };

  const onDrop = (e, targetBoardId, targetIndex) => {
    const taskIndex = parseInt(e.dataTransfer.getData("taskIndex"), 10);
    const sourceBoardId = e.dataTransfer.getData("sourceBoardId");

    setData((prevData) => {
      const newSourceBoard = [...prevData.boards[sourceBoardId]];
      const [movedTask] = newSourceBoard.splice(taskIndex, 1);
      const newTargetBoard = [...prevData.boards[targetBoardId]];
      newTargetBoard.splice(targetIndex, 0, movedTask);

      return {
        ...prevData,
        boards: {
          ...prevData.boards,
          [sourceBoardId]: newSourceBoard,
          [targetBoardId]: newTargetBoard,
        },
      };
    });
  };

  const getTasksForBoard = (boardId) =>
    data.boards[boardId].map((taskId) =>
      data.tasks.find((task) => task.id === taskId)
    );

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <TaskForm addTask={addTask} />
      <div className="board-container">
        <Board
          title="To Do"
          tasks={getTasksForBoard("todo")}
          boardId="todo"
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
        <Board
          title="In Progress"
          tasks={getTasksForBoard("inProgress")}
          boardId="inProgress"
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
        <Board
          title="Completed"
          tasks={getTasksForBoard("completed")}
          boardId="completed"
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      </div>
    </div>
  );
};

export default KanbanBoard;
