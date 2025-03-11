import { useEffect, useState } from "react";

function Hand({ height = 1, width = 1, angle }) {
  return (
    <div
      aria-hidden="true"
      className="absolute bg-gray-400"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: "50%",
        top: "50%",
        transformOrigin: "0 50%",
        // // translateY(-50%) moves the hand so its left-center aligns with the clock center,
        // // then we rotate (subtracting 90° so that 0° points upward)
        transform: `translateY(-50%) rotate(${angle - 90}deg)`,
      }}
    />
  );
}

function useCurrentDate() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDate(new Date());
    }, 100);

    return () => window.clearInterval(timer);
  }, []);

  return date;
}

function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

export default function Clock() {
  const date = useCurrentDate();
  // Use full hours then convert to 12-hour format in ClockImpl.
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return (
    <ClockImpl hours={hours} minutes={minutes} seconds={seconds} size={300} />
  );
}

const FULL_ROTATION_DEGREES = 360;

function ClockImpl({ hours, minutes, seconds, size }) {
  // Convert hours to 12-hour format.
  const hours12 = hours % 12;

  // Compute smooth transitions.
  const secondsPercentage = seconds / 60;
  const minutesPercentage = (minutes + secondsPercentage) / 60;
  const hoursPercentage = (hours12 + minutesPercentage) / 12;

  // Determine the rotation angle for each hand.
  const hourAngle = hoursPercentage * FULL_ROTATION_DEGREES;
  const minutesAngle = minutesPercentage * FULL_ROTATION_DEGREES;
  const secondsAngle = secondsPercentage * FULL_ROTATION_DEGREES;

  const dateTimeDisplay = `${padTwoDigit(hours12 || 12)}:${padTwoDigit(
    minutes
  )}:${padTwoDigit(seconds)}`;

  return (
    <time
      className="relative flex items-center justify-center rounded-full border-2 border-gray-400"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      dateTime={dateTimeDisplay}
    >
      <Hand width={50} angle={hourAngle} height={3} />
      <Hand width={90} angle={minutesAngle} height={2} />
      <Hand width={80} angle={secondsAngle} height={1} />
    </time>
  );
}
