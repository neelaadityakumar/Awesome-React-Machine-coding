import { useEffect, useState } from "react";

function ProgressBar({ completed, active, onCompleted }) {
  const [startTransition, setStartTransition] = useState(false);

  useEffect(() => {
    // If the bar is already completed, or it's not active,
    // or its transition has already started, do nothing.
    if (completed || !active || startTransition) {
      return;
    }
    setStartTransition(true);
  }, [completed, active, startTransition]);

  // If the bar is completed, we always show it as filled.
  const fillClass = completed || startTransition ? "scale-x-100" : "scale-x-0";

  return (
    <div className="h-2 bg-gray-300 w-full rounded-md overflow-hidden">
      <div
        className={`h-full bg-green-500 origin-left transition-transform duration-[2000ms] ${fillClass}`}
        onTransitionEnd={() => {
          // Only trigger onCompleted for an active bar that wasn't already completed.
          if (active && !completed) {
            onCompleted();
          }
        }}
      />
    </div>
  );
}

const CONCURRENCY_LIMIT = 3;

export default function Simple() {
  const [bars, setBars] = useState(0);
  const [completedTill, setCompletedTill] = useState(0);

  return (
    <div className="min-w-[384px] flex flex-col items-center gap-4 p-4">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        onClick={() => setBars((prev) => prev + 1)}
      >
        Add
      </button>
      <div className="flex flex-col gap-2 w-full">
        {Array(bars)
          .fill(null)
          .map((_, index) => {
            // A bar is completed if its index is less than completedTill.
            const completed = index < completedTill;
            // A bar is active if it isn't completed and is within the concurrency limit.
            const active =
              !completed && index < completedTill + CONCURRENCY_LIMIT;
            return (
              <ProgressBar
                key={index}
                completed={completed}
                active={active}
                onCompleted={() => setCompletedTill((prev) => prev + 1)}
              />
            );
          })}
      </div>
    </div>
  );
}
