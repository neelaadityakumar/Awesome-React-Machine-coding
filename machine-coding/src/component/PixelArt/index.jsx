import { useState } from "react";

const COLORS = {
  white: "#fff",
  gray: "#e9ecef",
  black: "#000",
  red: "#cc0001",
  orange: "#fb940b",
  yellow: "#ffff01",
  green: "#01cc00",
  teal: "#38d9a9",
  blue: "#228be6",
  purple: "#7950f2",
  beige: "#ff8787",
};

function Toolbar({ selectedColor, onColorChange, mode, onModeChange }) {
  return (
    <div className="flex gap-4 items-center">
      {/* Mode Selector */}
      <button
        className={`border-2 px-4 py-1 ${
          mode === "draw" ? "bg-black text-white" : "border-black"
        }`}
        onClick={() => onModeChange("draw")}
      >
        Draw
      </button>
      <button
        className={`border-2 px-4 py-1 ${
          mode === "erase" ? "bg-black text-white" : "border-black"
        }`}
        onClick={() => onModeChange("erase")}
      >
        Erase
      </button>

      {/* Color Picker */}
      <div className="grid grid-cols-6 gap-2">
        {Object.entries(COLORS).map(([key, value]) => (
          <button
            key={key}
            className={`w-6 h-6 border-2 ${
              selectedColor === key ? "border-black" : "border-transparent"
            }`}
            style={{ backgroundColor: value }}
            onClick={() => onColorChange(key)}
          />
        ))}
      </div>
    </div>
  );
}

function Cell({ color, isDragging, onMark }) {
  return (
    <button
      onClick={onMark}
      onMouseDown={onMark}
      onMouseEnter={isDragging ? onMark : undefined}
      className="w-6 h-6 border border-gray-200"
      style={{ backgroundColor: color ? COLORS[color] : "transparent" }}
    />
  );
}

function Canvas({
  selectedColor,
  mode,
  initialRows = 15,
  initialColumns = 15,
}) {
  const [grid, setGrid] = useState(
    Array.from({ length: initialRows }, () => Array(initialColumns).fill(null))
  );
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className="grid border border-gray-300"
      style={{ gridTemplateColumns: `repeat(${initialColumns}, 1fr)` }}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      {grid.flatMap((row, rowIndex) =>
        row.map((cellColor, cellIndex) => (
          <Cell
            key={`${rowIndex}-${cellIndex}`}
            color={cellColor}
            isDragging={isDragging}
            onMark={() => {
              const newGrid = grid.map((row) => [...row]);
              newGrid[rowIndex][cellIndex] =
                mode === "erase" ? null : selectedColor;
              setGrid(newGrid);
            }}
          />
        ))
      )}
    </div>
  );
}

export default function PixelArt() {
  const [mode, setMode] = useState("draw");
  const [selectedColor, setColor] = useState("black");

  return (
    <div className="flex flex-col gap-4 p-4 items-center">
      <Toolbar
        selectedColor={selectedColor}
        onColorChange={setColor}
        mode={mode}
        onModeChange={setMode}
      />
      <Canvas selectedColor={selectedColor} mode={mode} />
    </div>
  );
}
