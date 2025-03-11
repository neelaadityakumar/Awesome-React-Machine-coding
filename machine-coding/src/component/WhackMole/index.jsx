import { useEffect, useRef, useState } from "react";

// Fisher-Yates shuffle.
function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateMolePositions(molesAtOnce, totalCount) {
  const indices = Array.from({ length: totalCount }, (_, index) => index);
  shuffle(indices);
  return new Set(indices.slice(0, molesAtOnce));
}

function WhackAMole({
  rows = 3,
  cols = 3,
  roundDuration = 30,
  molesAtOnce = 1,
  molesAppearingInterval = 1500,
}) {
  const totalCount = rows * cols;
  const [visible, setVisible] = useState(new Set());
  const [score, setScore] = useState(null);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(roundDuration);
  const countdownTimerId = useRef(null);

  useEffect(() => {
    let timerId;
    if (running) {
      timerId = setInterval(() => {
        setVisible(generateMolePositions(molesAtOnce, totalCount));
      }, molesAppearingInterval);
    }
    return () => {
      clearInterval(timerId);
      setVisible(new Set());
    };
  }, [running, molesAtOnce, molesAppearingInterval, totalCount]);

  function startGame() {
    setRunning(true);
    setTimeLeft(roundDuration);
    setScore(0);
    countdownTimerId.current = setInterval(() => {
      setTimeLeft((currTimeLeft) => {
        if (currTimeLeft <= 0) {
          clearInterval(countdownTimerId.current);
          setRunning(false);
          return 0;
        }
        return currTimeLeft - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    return () => clearInterval(countdownTimerId.current);
  }, []);

  function whackMole(index) {
    if (!visible.has(index)) return;
    const newVisible = new Set(visible);
    newVisible.delete(index);
    setVisible(newVisible);
    setScore((score ?? 0) + 1);
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-700 mx-auto min-w-[400px]">
      <div className="flex justify-center gap-5 items-center space-x-4 mb-4">
        {score == null ? (
          <button
            className="px-4 py-2 bg-white text-black font-bold rounded"
            onClick={startGame}
          >
            Start Game
          </button>
        ) : (
          <div className="flex justify-between gap-5 items-center w-full font-bold">
            <p>Score: {score}</p>
            {!running && (
              <div>
                <button
                  className="px-4 py-2 bg-white text-black font-bold rounded"
                  onClick={startGame}
                >
                  Play Again
                </button>{" "}
              </div>
            )}
            <p>Time Left: {timeLeft}</p>
          </div>
        )}
      </div>
      <div
        className={`grid aspect-square gap-2 w-full max-w-xs`}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array(totalCount)
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              className="relative w-full h-full bg-transparent"
              onClick={() => whackMole(index)}
            >
              <img
                src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png"
                alt="Mole hill"
                className="absolute transform w-full h-1/4"
              />{" "}
              <img
                src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png"
                alt="Mole head"
                className={`absolute top-0 z-10 transform transition-transform duration-100 cursor-pointer w-full h-3/4  ${
                  visible.has(index)
                    ? "translate-y-0 scale-100"
                    : "translate-y-full scale-0"
                }`}
              />
            </button>
          ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <WhackAMole
      rows={3}
      cols={3}
      roundDuration={15}
      molesAtOnce={2}
      molesAppearingInterval={1500}
    />
  );
}
