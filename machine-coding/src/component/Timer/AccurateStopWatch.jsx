import { useRef, useState } from "react";

const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const MS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;
const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;

function formatTime(timeParam) {
  let time = timeParam;
  const parts = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0,
  };
  if (time > MS_IN_HOUR) {
    parts.hours = Math.floor(time / MS_IN_HOUR);
    time %= MS_IN_HOUR;
  }

  if (time > MS_IN_MINUTE) {
    parts.minutes = Math.floor(time / MS_IN_MINUTE);
    time %= MS_IN_MINUTE;
  }

  if (time > MS_IN_SECOND) {
    parts.seconds = Math.floor(time / MS_IN_SECOND);
    time %= MS_IN_SECOND;
  }

  parts.ms = time;

  return parts;
}

function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

export default function AccurateStopWatch() {
  const lastTickTiming = useRef(null);
  const [totalDuration, setTotalDuration] = useState(0);
  // Timer ID of the active interval, if one is running.
  const [timerId, setTimerId] = useState(null);

  // Derived state to determine if there's a timer running.
  const isRunning = timerId != null;

  function startTimer() {
    lastTickTiming.current = Date.now();
    setTimerId(
      window.setInterval(() => {
        const now = Date.now();
        const timePassed = now - lastTickTiming.current;
        setTotalDuration(
          (duration) =>
            // Use the callback form of setState to ensure
            // we are using the latest value of duration.
            duration + timePassed
        );
        lastTickTiming.current = now;
      }, 1)
    );
  }

  function stopInterval() {
    window.clearInterval(timerId);
    setTimerId(null);
  }

  function resetTimer() {
    stopInterval();
    setTotalDuration(0);
  }

  function toggleTimer() {
    if (isRunning) {
      stopInterval();
    } else {
      startTimer();
    }
  }

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
          {isRunning ? "Pause" : "Start"}
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
