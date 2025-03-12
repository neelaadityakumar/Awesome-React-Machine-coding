import React, { useState, useRef } from "react";

const SelectableGrid = () => {
  const gridSize = 10;
  const cellSize = 20;
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [selectionBox, setSelectionBox] = useState(null);
  const [hoveredCells, setHoveredCells] = useState(new Set());
  const gridRef = useRef(null);

  const getCellCoordinates = (x, y) => {
    const rect = gridRef.current.getBoundingClientRect();
    const col = Math.floor((x - rect.left) / cellSize);
    const row = Math.floor((y - rect.top) / cellSize);
    return { row, col };
  };

  const handleMouseDown = (e) => {
    setSelectedCells(new Set());
    const start = getCellCoordinates(e.clientX, e.clientY);
    setSelectionBox({ start, end: start });
    setHoveredCells(new Set());
  };

  const handleMouseMove = (e) => {
    if (!selectionBox) return;
    const end = getCellCoordinates(e.clientX, e.clientY);
    setSelectionBox({ ...selectionBox, end });

    const newHoveredCells = new Set();
    for (
      let row = Math.min(selectionBox.start.row, end.row);
      row <= Math.max(selectionBox.start.row, end.row);
      row++
    ) {
      for (
        let col = Math.min(selectionBox.start.col, end.col);
        col <= Math.max(selectionBox.start.col, end.col);
        col++
      ) {
        newHoveredCells.add(`${row}-${col}`);
      }
    }
    setHoveredCells(newHoveredCells);
  };

  const handleMouseUp = () => {
    if (!selectionBox) return;
    setSelectedCells(new Set(hoveredCells));
    setSelectionBox(null);
    setHoveredCells(new Set());
  };

  const handleClickOutside = () => {
    setSelectedCells(new Set());
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      onMouseDown={handleClickOutside}
    >
      <div
        ref={gridRef}
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
          cursor: "crosshair",
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          handleMouseDown(e);
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {[...Array(gridSize * gridSize)].map((_, index) => {
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
          const isSelected =
            selectedCells.has(`${row}-${col}`) ||
            hoveredCells.has(`${row}-${col}`);
          return (
            <div
              key={`${row}-${col}`}
              style={{
                backgroundColor: isSelected ? "purple" : "white",
                width: cellSize,
                height: cellSize,
              }}
              className={`border border-black ${
                isSelected ? "bg-purple-500" : "bg-white"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SelectableGrid;
