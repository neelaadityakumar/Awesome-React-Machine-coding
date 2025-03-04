import React, { useState, useEffect } from "react";

const EMOJIS = [
  "🐵",
  "🐶",
  "🦊",
  "🐱",
  "🦁",
  "🐯",
  "🐴",
  "🦄",
  "🦓",
  "🦌",
  "🐮",
  "🐷",
  "🐭",
  "🐹",
  "🐻",
  "🐨",
  "🐼",
  "🐽",
  "🐸",
  "🐰",
  "🐙",
];

const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const getEmojisForGame = (totalCards, matchCount) => {
  const requiredEmojis = Math.ceil(totalCards / matchCount);
  let selectedEmojis = shuffle(EMOJIS).slice(0, requiredEmojis);

  let finalEmojis = [];
  selectedEmojis.forEach((emoji) => {
    finalEmojis.push(...Array(matchCount).fill(emoji));
  });

  return shuffle(finalEmojis).slice(0, totalCards);
};

const Game = ({ row, col, delay, matchCount }) => {
  const totalCards = row * col;
  const [emojis, setEmojis] = useState(() =>
    getEmojisForGame(totalCards, matchCount)
  );
  const [selected, setSelected] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  useEffect(() => {
    if (completed.length === totalCards) {
      setIsGameCompleted(true);
    }
  }, [completed, totalCards]);

  const resetGame = () => {
    setEmojis(getEmojisForGame(totalCards, matchCount));
    setSelected([]);
    setCompleted([]);
    setIsGameCompleted(false);
  };

  const handleEmojiClick = (index) => {
    if (selected.includes(index) || completed.includes(index)) return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === matchCount) {
      const firstEmoji = emojis[newSelected[0]];
      const isMatch = newSelected.every((i) => emojis[i] === firstEmoji);

      setTimeout(() => {
        if (isMatch) {
          setCompleted([...completed, ...newSelected]);
        }
        setSelected([]);
      }, delay);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`grid grid-cols-${col} gap-4`}>
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className={`w-20 h-20 text-3xl border border-gray-400 rounded-lg
              ${
                selected.includes(index) || completed.includes(index)
                  ? "bg-gray-500"
                  : "bg-white"
              }
            `}
            disabled={isGameCompleted}
            onClick={() => handleEmojiClick(index)}
          >
            {selected.includes(index) || completed.includes(index)
              ? emoji
              : "❓"}
          </button>
        ))}
      </div>

      {isGameCompleted && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={resetGame}
        >
          Restart
        </button>
      )}
    </div>
  );
};

const MemoryGame = () => {
  return <Game row={4} col={4} delay={1000} matchCount={2} />;
};

export default MemoryGame;
