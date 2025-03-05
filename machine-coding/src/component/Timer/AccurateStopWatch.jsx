import React, { useEffect, useRef, useState } from "react";

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
  if (time >= MS_IN_HOUR) {
    parts.hours = Math.floor(time / MS_IN_HOUR);
    time %= MS_IN_HOUR;
  }
  if (time >= MS_IN_MINUTE) {
    parts.minutes = Math.floor(time / MS_IN_MINUTE);
    time %= MS_IN_MINUTE;
  }
  if (time >= MS_IN_SECOND) {
    parts.seconds = Math.floor(time / MS_IN_SECOND);
    time %= MS_IN_SECOND;
  }
  parts.ms = time;
  return parts;
}

function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

const AccurateStopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const lastStartTimeRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    if (timerRef.current != null) return;

    lastStartTimeRef.current = Date.now() - time; // Adjust start time
    setIsRunning(true);

    timerRef.current = setInterval(() => {
      setTime(Date.now() - lastStartTimeRef.current);
    }, 10);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    }
  };

  const toggleTimer = () => {
    isRunning ? pauseTimer() : startTimer();
  };

  const resetTimer = () => {
    pauseTimer();
    setTime(0);
    lastStartTimeRef.current = null;
  };

  const formattedTime = formatTime(time);

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4 text-2xl font-bold text-center">Stopwatch</div>
      <button
        className="w-full p-4 bg-gray-200 text-xl rounded shadow"
        onClick={toggleTimer}
      >
        {formattedTime.hours > 0 && (
          <span>
            <span>{formattedTime.hours}</span>
            <span>h </span>
          </span>
        )}
        {formattedTime.minutes > 0 && (
          <span>
            <span>{formattedTime.minutes}</span>
            <span>m </span>
          </span>
        )}
        <span>
          <span>{formattedTime.seconds}</span>
          <span>s </span>
        </span>
        <span className="text-sm">
          {padTwoDigit(Math.floor(formattedTime.ms / 10))}
        </span>
      </button>
      <div className="flex justify-between mt-4">
        <button
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded mr-2 hover:bg-gray-800 transition"
          onClick={toggleTimer}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
export default AccurateStopWatch;
