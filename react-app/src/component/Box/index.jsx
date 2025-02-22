import React, { useState } from "react";

const Box = ({ item, handleClick }) => {
  if (!item.isVisible) return <div className="w-14 h-14"></div>;

  return (
    <div
      className={`border w-14 h-14 flex items-center justify-center cursor-pointer transition-colors ${
        item.isClicked ? "bg-green-500" : "bg-yellow-400"
      }`}
      onClick={() => handleClick(item.id)}
    >
      {item.id}
    </div>
  );
};

export default function BoxContainer() {
  const [queue, setQueue] = useState([]);
  const [grid, setGrid] = useState([
    { id: 1, isClicked: false, isVisible: true },
    { id: 2, isClicked: false, isVisible: true },
    { id: 3, isClicked: false, isVisible: true },
    { id: 4, isClicked: false, isVisible: true },
    { id: 5, isClicked: false, isVisible: false },
    { id: 6, isClicked: false, isVisible: false },
    { id: 7, isClicked: false, isVisible: true },
    { id: 8, isClicked: false, isVisible: true },
    { id: 9, isClicked: false, isVisible: true },
  ]);

  const handleClick = (id) => {
    if (queue.includes(id)) return;

    setQueue((prevQueue) => {
      const newQueue = [...prevQueue, id];
      setGrid((prevGrid) =>
        prevGrid.map((box) =>
          box.id === id ? { ...box, isClicked: true } : box
        )
      );

      if (newQueue.length === 7) {
        const copyQueue = [...newQueue]; // Copy to avoid mutation
        copyQueue.forEach((boxId, index) => {
          setTimeout(() => {
            setGrid((prevGrid) =>
              prevGrid.map((box) =>
                box.id === boxId ? { ...box, isClicked: false } : box
              )
            );
            setQueue((prevQueue) => prevQueue.slice(1)); // Shift queue element
          }, index * 1000);
        });
      }

      return newQueue;
    });
  };

  return (
    <div className="text-center">
      <div className="grid grid-cols-3 justify-center gap-2">
        {grid.map((item) => (
          <Box key={item.id} item={item} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}
