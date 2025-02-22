import React, { useState } from "react";

const DragAndDropList = () => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedItemIndex", index);
  };

  const handleDragEnd = (e, index) => {
    const draggedItemIndex = Number(e.dataTransfer.getData("draggedItemIndex"));
    const draggedItem = items[draggedItemIndex];
    items.splice(draggedItemIndex, 1);
    items.splice(index, 0, draggedItem);

    setItems([...items]);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Drag and Drop List
      </h1>
      <form
        className="flex gap-3 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim() !== "") {
            setItems([...items, text]);
            setText("");
          }
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task Name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </form>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow-md border border-gray-300 cursor-grab active:cursor-grabbing transition hover:bg-gray-200"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDragEnd(e, index)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDropList;
