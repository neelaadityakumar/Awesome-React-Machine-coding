import React, { useEffect, useRef, useState } from "react";

const SmoothProgress = ({ max = 25, duration = 4000 }) => {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * max, max);
      setProgress(newProgress);

      if (elapsed < duration) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      startTimeRef.current = null;
    };
  }, [max, duration]);

  return (
    <div className="w-96 h-4 bg-gray-300 rounded overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default SmoothProgress;
