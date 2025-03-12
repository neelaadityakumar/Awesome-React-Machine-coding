import React, { useState, useRef, useCallback } from "react";

const SelectableGrid = () => {
  const gridSize = 10;
  const cellSize = 20;
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [selectionBox, setSelectionBox] = useState(null);
  const gridRef = useRef(null);

  const getCellCoordinates = useCallback((x, y) => {
    if (!gridRef.current) return { row: -1, col: -1 };
    const rect = gridRef.current.getBoundingClientRect();
    return {
      row: Math.max(
        0,
        Math.min(gridSize - 1, Math.floor((y - rect.top) / cellSize))
      ),
      col: Math.max(
        0,
        Math.min(gridSize - 1, Math.floor((x - rect.left) / cellSize))
      ),
    };
  }, []);

  const updateSelectedCells = useCallback((start, end) => {
    const newSelectedCells = new Set();
    for (
      let row = Math.min(start.row, end.row);
      row <= Math.max(start.row, end.row);
      row++
    ) {
      for (
        let col = Math.min(start.col, end.col);
        col <= Math.max(start.col, end.col);
        col++
      ) {
        newSelectedCells.add(`${row}-${col}`);
      }
    }
    setSelectedCells(newSelectedCells);
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      const start = getCellCoordinates(e.clientX, e.clientY);
      setSelectionBox({ start, end: start });
      setSelectedCells(new Set());
    },
    [getCellCoordinates]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!selectionBox) return;
      const end = getCellCoordinates(e.clientX, e.clientY);
      setSelectionBox((prev) => ({ ...prev, end }));
      updateSelectedCells(selectionBox.start, end);
    },
    [selectionBox, getCellCoordinates, updateSelectedCells]
  );

  const handleMouseUp = useCallback(() => {
    setSelectionBox(null);
  }, []);

  const handleClickOutside = useCallback(() => {
    setSelectedCells(new Set());
  }, []);

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
          const isSelected = selectedCells.has(`${row}-${col}`);
          return (
            <div
              key={`${row}-${col}`}
              style={{ width: cellSize, height: cellSize }}
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
