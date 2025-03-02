import { useState, useCallback } from "react";

const initialData = {
  tasks: [],
  boards: {
    todo: [],
    inProgress: [],
    completed: [],
  },
};

export default function KanbanBoard() {
  const [data, setData] = useState(initialData);

  const addTask = useCallback((content) => {
    setData((prevData) => {
      const newTask = { id: `task-${Date.now()}`, content };
      return {
        ...prevData,
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

  const onDrop = (e, targetBoardId, targetIndex) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceBoardId = e.dataTransfer.getData("sourceBoardId");

    if (!taskId || !sourceBoardId) return;

    setData((prevData) => {
      const newBoards = { ...prevData.boards };

      // Remove the task from its original board
      newBoards[sourceBoardId] = newBoards[sourceBoardId].filter(
        (id) => id !== taskId
      );

      // Ensure targetIndex is valid
      const updatedTargetBoard = [...newBoards[targetBoardId]];
      if (
        isNaN(targetIndex) ||
        targetIndex < 0 ||
        targetIndex > updatedTargetBoard.length
      ) {
        targetIndex = updatedTargetBoard.length; // Default to last position
      }

      updatedTargetBoard.splice(targetIndex, 0, taskId); // Insert at the correct position
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
      <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>
      <TaskForm addTask={addTask} />
      <div className="flex gap-6 w-full justify-center flex-wrap">
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
  <div className="bg-gray-200 p-4 rounded-lg w-80 min-h-[400px]">
    <h3 className="text-xl font-semibold mb-3 capitalize">{title}</h3>
    <div className="bg-white rounded-lg p-3 min-h-[350px] flex flex-col">
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
        className="bg-gray-400 w-full h-10 mt-2 rounded-lg flex-1"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e, boardId, tasks.length)}
      />
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
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="Add a new task"
        className="border border-gray-300 p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </form>
  );
};
