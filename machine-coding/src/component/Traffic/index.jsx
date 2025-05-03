import { useEffect, useState } from "react";

const defaultConfig = {
  red: {
    bgColor: "bg-red-500",
    duration: 4000,
    next: "green",
  },
  green: {
    bgColor: "bg-green-500",
    duration: 3000,
    next: "yellow",
  },
  yellow: {
    bgColor: "bg-yellow-400",
    duration: 500,
    next: "red",
  },
};

function Light({ isActive, colorClass }) {
  return (
    <div
      aria-hidden="true"
      className={`w-12 h-12 rounded-full transition-colors duration-300 ${
        isActive ? colorClass : "bg-gray-500"
      }`}
    />
  );
}

export function TrafficLight({
  initialColor = "green",
  config = defaultConfig,
  layout = "vertical",
}) {
  const [currentColor, setCurrentColor] = useState(initialColor);

  useEffect(() => {
    const { duration, next } = config[currentColor];
    const timer = setTimeout(() => setCurrentColor(next), duration);
    return () => clearTimeout(timer);
  }, [currentColor, config]);

  return (
    <div
      aria-live="polite"
      aria-label={`Current light: ${currentColor}`}
      className={`flex p-2 bg-black rounded-lg gap-2 ${
        layout === "vertical" ? "flex-col" : "flex-row"
      }`}
    >
      {Object.entries(config).map(([color, { bgColor }]) => (
        <Light
          key={color}
          isActive={color === currentColor}
          colorClass={bgColor}
        />
      ))}
    </div>
  );
}

export default function TrafficLightGenerator() {
  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <TrafficLight config={defaultConfig} />
      <TrafficLight config={defaultConfig} layout="horizontal" />
    </div>
  );
}
