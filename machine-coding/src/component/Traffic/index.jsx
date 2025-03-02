import { useEffect, useState } from "react";

const config = {
  red: {
    bgColor: "bg-red-500",
    duration: 4000,
    next: "green",
  },
  yellow: {
    bgColor: "bg-yellow-400",
    duration: 500,
    next: "red",
  },
  green: {
    bgColor: "bg-green-500",
    duration: 3000,
    next: "yellow",
  },
};

function Light({ activeClass }) {
  return (
    <div
      aria-hidden="true"
      className={`w-12 h-12 rounded-full  ${activeClass} `}
    />
  );
}

export function TrafficLight({
  initialColor = "green",
  config,
  layout = "vertical",
}) {
  const [currentColor, setCurrentColor] = useState(initialColor);

  useEffect(() => {
    const { duration, next } = config[currentColor];

    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);

    return () => clearTimeout(timerId);
  }, [currentColor, config]);

  return (
    <div
      aria-live="polite"
      aria-label={`Current light: ${currentColor}`}
      className={`flex p-2 bg-black rounded-lg gap-2 ${
        layout === "vertical" ? "flex-col" : "flex-row"
      }`}
    >
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          activeClass={
            color === currentColor ? config[color].bgColor : "bg-gray-500"
          }
        />
      ))}
    </div>
  );
}

export default function TrafficLightGenerator() {
  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <TrafficLight config={config} />
      <TrafficLight config={config} layout="horizontal" />
    </div>
  );
}
