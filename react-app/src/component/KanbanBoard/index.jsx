import React, { useEffect, useState, useCallback } from "react";

const initialData = {
  tasks: [],
  boards: {
    todo: [],
    inProgress: [],
    completed: [],
  },
};

export default function KanbanBoard() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("kanbanData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [newBoardName, setNewBoardName] = useState("");

  useEffect(() => {
    localStorage.setItem("kanbanData", JSON.stringify(data));
  }, [data]);

  const addTask = useCallback((content, boardId) => {
    setData((prevData) => {
      const newTask = { id: `task-${Date.now()}`, content };
      return {
        ...prevData,
        tasks: [...prevData.tasks, newTask],
        boards: {
          ...prevData.boards,
          [boardId]: [...prevData.boards[boardId], newTask.id],
        },
      };
    });
  }, []);

  const addBoard = () => {
    if (!newBoardName.trim()) return;
    setData((prevData) => ({
      ...prevData,
      boards: {
        ...prevData.boards,
        [newBoardName]: [],
      },
    }));
    setNewBoardName("");
  };

  const onDragStart = (e, boardId, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceBoardId", boardId);
  };

  const onDrop = (e, targetBoardId, targetIndex) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const sourceBoardId = e.dataTransfer.getData("sourceBoardId");
    if (!taskId || !sourceBoardId) return;

    setData((prevData) => {
      const newBoards = { ...prevData.boards };

      newBoards[sourceBoardId] = newBoards[sourceBoardId].filter(
        (id) => id !== taskId
      );

      const updatedTargetBoard = [...newBoards[targetBoardId]];
      targetIndex =
        isNaN(targetIndex) ||
        targetIndex < 0 ||
        targetIndex > updatedTargetBoard.length
          ? updatedTargetBoard.length
          : targetIndex;
      updatedTargetBoard.splice(targetIndex, 0, taskId);

      newBoards[targetBoardId] = updatedTargetBoard;
      return { ...prevData, boards: newBoards };
    });
  };

  const getTasksForBoard = (boardId) =>
    data.boards[boardId]
      .map((taskId) => data.tasks.find((task) => task.id === taskId))
      .filter(Boolean);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>

      <div className="flex max-w-[calc(100vw-100px)] overflow-x-auto gap-10 flex-nowrap ">
        {Object.keys(data.boards).map((boardId) => (
          <Board
            key={boardId}
            title={boardId}
            tasks={getTasksForBoard(boardId)}
            boardId={boardId}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))}
      </div>

      <div className="flex gap-2 my-6">
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="New Board Name"
          className="border border-gray-300 p-2 rounded-lg w-64 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addBoard}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add Board
        </button>
      </div>
      <TaskForm addTask={addTask} boardOptions={Object.keys(data.boards)} />
    </div>
  );
}

const Task = ({ task, boardId, onDragStart, onDrop, index }) => (
  <div
    className="bg-white border border-gray-300 rounded-lg p-3 shadow-md cursor-pointer hover:bg-gray-100 transition"
    draggable
    onDrop={(e) => onDrop(e, boardId, index)}
    onDragOver={(e) => e.preventDefault()}
    onDragStart={(e) => onDragStart(e, boardId, task.id)}
  >
    {task.content}
  </div>
);

const Board = ({ title, tasks, boardId, onDragStart, onDrop }) => (
  <div className="bg-gray-200 p-4 rounded-lg w-80 min-h-[400px] min-w-[300px]">
    <h3 className="text-xl font-semibold mb-3 capitalize">{title}</h3>
    <div className="bg-white rounded-lg p-3 min-h-[350px]">
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          boardId={boardId}
          onDragStart={onDragStart}
          onDrop={onDrop}
          index={index}
        />
      ))}
      <div
        className="bg-red-400 w-full h-10 mt-2 rounded-lg"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e, boardId, 0)}
      />
    </div>
  </div>
);

const TaskForm = ({ addTask, boardOptions }) => {
  const [taskContent, setTaskContent] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(boardOptions[0] || "todo");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskContent.trim()) return;
    addTask(taskContent, selectedBoard);
    setTaskContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="Add a new task"
        className="border border-gray-300 p-2 rounded-lg w-64 focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={selectedBoard}
        onChange={(e) => setSelectedBoard(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        {boardOptions.map((board) => (
          <option key={board} value={board}>
            {board}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </form>
  );
};
