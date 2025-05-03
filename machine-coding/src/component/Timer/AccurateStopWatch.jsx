import { useState, useRef, useCallback } from "react";

const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const MS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;
const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;

function formatTime(time) {
  let remainingTime = time;
  const hours = Math.floor(remainingTime / MS_IN_HOUR);
  remainingTime %= MS_IN_HOUR;

  const minutes = Math.floor(remainingTime / MS_IN_MINUTE);
  remainingTime %= MS_IN_MINUTE;

  const seconds = Math.floor(remainingTime / MS_IN_SECOND);
  remainingTime %= MS_IN_SECOND;

  const ms = remainingTime;

  return { hours, minutes, seconds, ms };
}

function padTwoDigit(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

export default function AccurateStopWatch() {
  const lastTickTime = useRef(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const timerId = useRef(null);
  const startTimer = useCallback(() => {
    lastTickTime.current = Date.now();
    timerId.current = setInterval(() => {
      const now = Date.now();
      const timePassed = now - lastTickTime.current;
      setTotalDuration((prevDuration) => prevDuration + timePassed);
      lastTickTime.current = now;
    }, 16); // Updates at around 60 FPS (16ms interval)
  }, []);

  const stopInterval = () => {
    if (timerId.current) {
      clearInterval(timerId.current); // Use .current for the ref
      timerId.current = null; // Reset the timer reference
    }
  };

  const resetTimer = () => {
    stopInterval();
    setTotalDuration(0); // Reset the time
  };

  const toggleTimer = () => {
    if (timerId.current) {
      stopInterval(); // Pause the timer
    } else {
      startTimer(); // Start the timer
    }
  };

  const formattedTime = formatTime(totalDuration);

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Stopwatch</h1>

      <button
        className="text-5xl font-mono mb-4 focus:outline-none"
        onClick={toggleTimer}
      >
        {formattedTime.hours > 0 && (
          <span>
            {formattedTime.hours}
            <span className="text-xl">h</span>{" "}
          </span>
        )}
        {formattedTime.minutes > 0 && (
          <span>
            {formattedTime.minutes}
            <span className="text-xl">m</span>{" "}
          </span>
        )}
        <span>
          {formattedTime.seconds}
          <span className="text-xl">s</span>{" "}
        </span>
        <span className="text-xl">
          {padTwoDigit(Math.floor(formattedTime.ms / 10))}
        </span>
      </button>

      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={toggleTimer}
        >
          {timerId.current ? "Pause" : "Start"}
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
