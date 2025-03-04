import React, { useEffect, useRef, useState } from "react";

const ProgressBar = ({ max = 10, duration = 5000 }) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  // Using a small update interval (e.g., 50ms) for smooth progress
  const updateInterval = 50;
  const step = (max * updateInterval) / duration;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= max) {
          clearInterval(intervalRef.current);
          return max;
        }
        return next;
      });
    }, updateInterval);

    return () => clearInterval(intervalRef.current);
  }, [max, duration, step]);

  return (
    <div className="bg-gray-200 h-4 w-96 rounded-md overflow-hidden">
      <div
        className="bg-green-500 h-full transition-all ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
