import React, { useEffect, useState } from "react";

const ProgressBar = ({ max = 25, duration = 2000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateInterval = duration / max;
    let current = 0;
    const intervalId = setInterval(() => {
      current++;
      if (current >= max) {
        current = max;
        setProgress(current);
        clearInterval(intervalId);
      } else {
        setProgress(current);
      }
    }, updateInterval);

    return () => clearInterval(intervalId);
  }, [max, duration]);

  return (
    <div className="bg-gray-200 h-4 w-96 rounded-md overflow-hidden">
      <div
        className="bg-green-500 h-full transition-all ease-linear"
        style={{ width: `${(progress / max) * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;
