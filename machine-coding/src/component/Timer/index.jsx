import React, { useEffect, useState, createContext, useContext } from "react";

const TimeContext = createContext([]);
export const useTime = () => useContext(TimeContext);

const TimerItem = ({ startTime }) => {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    if (time <= 0) return;

    const timeId = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timeId);
  }, [time]);

  return time > 0 ? <div>{time}</div> : null;
};

const TimeContextProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);

  const addTimer = (time) => {
    const parsedTime = Number(time);
    if (!isNaN(parsedTime) && parsedTime > 0) {
      setTimers((prev) => [...prev, parsedTime]);
    }
  };

  return (
    <TimeContext.Provider value={{ timers, addTimer }}>
      {children}
    </TimeContext.Provider>
  );
};

const TimerMain = () => {
  const [time, setTime] = useState("");
  const { timers, addTimer } = useTime();

  const onSubmit = (e) => {
    e.preventDefault();
    const parsedTime = Number(time);
    if (!isNaN(parsedTime) && parsedTime > 0) {
      addTimer(parsedTime);
      setTime(""); // Reset input
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-black text-white"
          type="number"
        />
        <button type="submit">ADD</button>
      </form>
      {timers.map((timer, index) => (
        <TimerItem key={index} startTime={timer} />
      ))}
    </div>
  );
};
const Timer = () => {
  return (
    <TimeContextProvider>
      <TimerMain />
    </TimeContextProvider>
  );
};
export default Timer;
