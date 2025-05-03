import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Creates a new Date object for the 0th day of the next month.
  // Since day 0 means "the last day of the previous month" in JavaScript, it gives us the last day of the current month.
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  //month & day is 0-indexed
  //0 = Sunday, 1 = Monday, ..., 6 = Saturday
  // 0 January
  const onDateClick = (day) => {
    setSelectedDate(new Date(year, month, day));
  };

  const changeMonth = (offset) => {
    setCurrentMonthDate(new Date(year, month + offset, 1));
  };

  return (
    <div className="w-80 mx-auto border rounded-lg shadow-md p-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <button
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => changeMonth(-1)}
        >
          ◀
        </button>
        <div className="text-center font-bold text-lg">
          {year} - {month + 1}
        </div>
        <button
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => changeMonth(1)}
        >
          ▶
        </button>
      </div>
      <div className="grid grid-cols-7 text-center font-medium">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2 text-gray-600">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div key={i} className="py-2"></div>
        ))}
        {[...Array(daysInMonth)].map((_, day) => {
          const dayNumber = day + 1;
          const isSelected =
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === dayNumber;

          const isToday =
            new Date().getFullYear() === year &&
            new Date().getMonth() === month &&
            new Date().getDate() === dayNumber;

          return (
            <div
              key={dayNumber}
              className={`py-2 text-center rounded cursor-pointer transition-all ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : isToday
                  ? "bg-green-400 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => onDateClick(dayNumber)}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
