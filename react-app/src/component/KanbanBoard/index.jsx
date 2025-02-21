import React, { useEffect, useState, useCallback } from "react";

const initialData = {
  tasks: [],
  boards: {
    todo: [],
    inProgress: [],
    completed: [],
  },
};

const KanbanBoard = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("kanbanData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("kanbanData", JSON.stringify(data));
  }, [data]);

  const addTask = useCallback((content) => {
    setData((prevData) => {
      const newTask = { id: `task-${Date.now()}`, content };
      return {
        tasks: [...prevData.tasks, newTask],
        boards: {
          ...prevData.boards,
          todo: [...prevData.boards.todo, newTask.id],
        },
      };
    });
  }, []);

  const onDragStart = (e, boardId, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceBoardId", boardId);
  };

  const onDrop = (e, targetBoardId) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceBoardId = e.dataTransfer.getData("sourceBoardId");

    if (!taskId || sourceBoardId === targetBoardId) return;

    setData((prevData) => {
      const newBoards = { ...prevData.boards };
      newBoards[sourceBoardId] = newBoards[sourceBoardId].filter(
        (id) => id !== taskId
      );
      newBoards[targetBoardId] = [...newBoards[targetBoardId], taskId];
      return { ...prevData, boards: newBoards };
    });
  };

  const getTasksForBoard = (boardId) =>
    data.boards[boardId].map((taskId) =>
      data.tasks.find((task) => task.id === taskId)
    );

  return (
    <div style={styles.container}>
      <h1>Kanban Board</h1>
      <TaskForm addTask={addTask} />
      <div style={styles.boardContainer}>
        {Object.keys(data.boards).map((boardId) => (
          <Board
            key={boardId}
            title={boardId
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            tasks={getTasksForBoard(boardId)}
            boardId={boardId}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))}
      </div>
    </div>
  );
};

const Task = ({ task, boardId, onDragStart }) => (
  <div
    style={styles.task}
    draggable
    onDragStart={(e) => onDragStart(e, boardId, task.id)}
  >
    {task.content}
  </div>
);

const Board = ({ title, tasks, boardId, onDragStart, onDrop }) => (
  <div
    style={styles.board}
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => onDrop(e, boardId)}
  >
    <h3>{title}</h3>
    <div style={styles.boardContent}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          boardId={boardId}
          onDragStart={onDragStart}
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
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="Add a new task"
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add Task
      </button>
    </form>
  );
};

const styles = {
  container: { textAlign: "center" },
  boardContainer: {
    display: "flex",
    justifyContent: "space-around",
    gap: "20px",
  },
  board: {
    background: "#f4f5f7",
    borderRadius: "5px",
    padding: "10px",
    width: "300px",
    minHeight: "400px",
  },
  boardContent: { background: "white", borderRadius: "5px", padding: "8px" },
  task: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "3px",
    padding: "8px",
    marginBottom: "8px",
  },
  form: { margin: "20px 0" },
  input: { padding: "10px", width: "200px", marginRight: "10px" },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default KanbanBoard;
