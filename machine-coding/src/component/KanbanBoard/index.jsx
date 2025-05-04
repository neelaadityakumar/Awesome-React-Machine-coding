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
    setData((prev) => {
      const newTask = { id: `task-${Date.now()}`, content };
      return {
        tasks: [...prev.tasks, newTask],
        boards: {
          ...prev.boards,
          todo: [...prev.boards.todo, newTask.id],
        },
      };
    });
  }, []);

  const onDragStart = useCallback((e, boardId, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceBoardId", boardId);
  }, []);

  const onDrop = useCallback((e, targetBoardId, targetIndex) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceBoardId = e.dataTransfer.getData("sourceBoardId");
    if (!taskId || !sourceBoardId) return;

    setData((prev) => {
      const boardsCopy = { ...prev.boards };

      // Remove from source board
      boardsCopy[sourceBoardId] = boardsCopy[sourceBoardId].filter(
        (id) => id !== taskId
      );

      // Safe target index
      const newTargetBoard = [...boardsCopy[targetBoardId]];
      const safeIndex = Math.max(
        0,
        Math.min(targetIndex, newTargetBoard.length)
      );
      newTargetBoard.splice(safeIndex, 0, taskId);
      boardsCopy[targetBoardId] = newTargetBoard;

      return { ...prev, boards: boardsCopy };
    });
  }, []);

  const getTasksForBoard = (boardId) =>
    data.boards[boardId]
      .map((id) => data.tasks.find((t) => t.id === id))
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
    onDragStart={(e) => onDragStart(e, boardId, task.id)}
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => onDrop(e, boardId, index)}
  >
    {task.content}
  </div>
);

const Board = ({ title, tasks, boardId, onDragStart, onDrop }) => (
  <div className="bg-gray-200 p-4 rounded-lg w-80 min-h-[400px]">
    <h3 className="text-xl font-semibold mb-3 capitalize">{title}</h3>
    <div className="bg-white rounded-lg p-3 min-h-[350px] flex flex-col">
      {tasks.map((task, i) => (
        <Task
          key={task.id}
          task={task}
          boardId={boardId}
          onDragStart={onDragStart}
          onDrop={onDrop}
          index={i}
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
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    addTask(trimmed);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
