import { useState, useCallback } from "react";

const initialData = {
  tasks: [],
  boards: { todo: [], inProgress: [], completed: [] },
};

export default function KanbanBoard() {
  const [data, setData] = useState(initialData);

  const addTask = useCallback((content) => {
    const newTask = { id: `task-${Date.now()}`, content };
    setData((prev) => ({
      tasks: [...prev.tasks, newTask],
      boards: {
        ...prev.boards,
        todo: [...prev.boards.todo, newTask.id],
      },
    }));
  }, []);

  const onDragStart = (e, boardId, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceBoardId", boardId);
  };

  const onDrop = (e, targetBoardId, targetIndex) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceBoardId = e.dataTransfer.getData("sourceBoardId");
    if (!taskId || !sourceBoardId) return;

    setData((prev) => {
      const newBoards = { ...prev.boards };
      newBoards[sourceBoardId] = newBoards[sourceBoardId].filter(
        (id) => id !== taskId
      );
      const to = [...newBoards[targetBoardId]];
      to.splice(Math.min(targetIndex ?? to.length, to.length), 0, taskId);
      newBoards[targetBoardId] = to;
      return { ...prev, boards: newBoards };
    });
  };

  const getTasks = (ids) =>
    ids.map((id) => data.tasks.find((t) => t.id === id)).filter(Boolean);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>
      <TaskForm onAdd={addTask} />
      <div className="flex gap-6 flex-wrap justify-center">
        {Object.entries(data.boards).map(([id, taskIds]) => (
          <Board
            key={id}
            title={id}
            tasks={getTasks(taskIds)}
            boardId={id}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))}
      </div>
    </div>
  );
}

const Board = ({ title, tasks, boardId, onDragStart, onDrop }) => (
  <div className="bg-gray-200 p-4 rounded w-80 min-h-[400px]">
    <h3 className="text-xl font-semibold mb-3 capitalize">{title}</h3>
    <div className="bg-white p-3 rounded min-h-[350px] flex flex-col">
      {tasks.map((task, i) => (
        <Task
          key={task.id}
          task={task}
          boardId={boardId}
          onDragStart={onDragStart}
          onDrop={onDrop}
          i={i}
        />
      ))}
      <div
        className="bg-gray-300 h-10 mt-2 rounded flex-1"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e, boardId, tasks.length)}
      />
    </div>
  </div>
);

const Task = ({ task, boardId, onDragStart, onDrop, i }) => (
  <div
    onDrop={(e) => onDrop(e, boardId, i)}
    onDragOver={(e) => e.preventDefault()}
    draggable
    onDragStart={(e) => onDragStart(e, boardId, task.id)}
  >
    <div className="bg-white border p-3 rounded shadow cursor-move mb-2 hover:bg-gray-100">
      {task.content}
    </div>{" "}
  </div>
);

const TaskForm = ({ onAdd }) => {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="mb-6 flex gap-3 justify-center">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task"
        className="border p-2 rounded w-64 focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
