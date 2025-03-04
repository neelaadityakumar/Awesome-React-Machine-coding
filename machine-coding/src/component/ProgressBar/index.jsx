import React, { useEffect, useState } from "react";

const ProgressBar = ({ max = 25, duration = 4000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrameId;

    const updateProgress = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const nextProgress = Math.min((elapsed / duration) * max, max);
      setProgress(nextProgress);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [max, duration]);

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
