import React, { useState, useRef } from "react";

const DragAndDropListPlaceHolder = () => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);
  const ghostRef = useRef(null);

  const handleDragStart = (e, index) => {
    const item = items[index];
    setDraggedItem(item);

    // Use clone for drag image
    const ghost = e.target.cloneNode(true);
    ghost.style.position = "absolute";
    ghost.style.top = "0px";
    ghost.style.left = "0px";
    document.body.appendChild(ghost);
    ghostRef.current = ghost;

    e.dataTransfer.setDragImage(ghost, 0, 0);

    // Delay removal until drag starts
    setTimeout(() => {
      setItems((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    }, 0);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    const targetRect = e.currentTarget.getBoundingClientRect();
    const offset = e.clientY - targetRect.top;
    const middle = targetRect.height / 2;
    setDropIndex(offset > middle ? index + 1 : index);
  };

  const handleDropOrEnd = () => {
    if (draggedItem != null) {
      const updated = [...items];
      const targetIndex = dropIndex ?? items.length;
      updated.splice(targetIndex, 0, draggedItem);
      setItems(updated);
    }
    setDraggedItem(null);
    setDropIndex(null);
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }
  };

  return (
    <div
      className="max-w-md mx-auto mt-10 bg-gray-100 p-6 rounded-lg shadow-lg"
      onDrop={handleDropOrEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">
        Drag and Drop List
      </h1>
      <form
        className="flex gap-3 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) {
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
          <React.Fragment key={index}>
            {dropIndex === index && (
              <div className="border-2 border-blue-400 border-dashed p-2 rounded text-center text-sm text-blue-500 bg-blue-100">
                Drop here
              </div>
            )}
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDropOrEnd}
              className="bg-white p-3 rounded-lg shadow-md border border-gray-300 cursor-grab active:cursor-grabbing transition hover:bg-gray-200"
            >
              {item}
            </div>
          </React.Fragment>
        ))}
        {dropIndex === items.length && (
          <div className="border-2 border-blue-400 border-dashed p-2 rounded text-center text-sm text-blue-500 bg-blue-100">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDropListPlaceHolder;
