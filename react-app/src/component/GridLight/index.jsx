import { useState } from "react";

const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

function Cell({ filled, label, onClick, isDisabled }) {
  return (
    <button
      aria-label={label}
      type="button"
      className={`w-full aspect-square min-w-10 border border-black
        ${filled ? "bg-green-500" : "bg-orange-500"}
        disabled:opacity-50`}
      onClick={onClick}
      disabled={isDisabled}
    />
  );
}

export default function GridLight() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  function deactivateCells() {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="grid border border-black p-5 gap-5"
        style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr)` }}
      >
        {config.flat().map((value, index) =>
          value ? (
            <Cell
              key={index}
              label={`Cell ${index}`}
              filled={order.includes(index)}
              isDisabled={order.includes(index) || isDeactivating}
              onClick={() => {
                const newOrder = [...order, index];
                setOrder(newOrder);

                if (newOrder.length === config.flat().filter(Boolean).length) {
                  deactivateCells();
                }
              }}
            />
          ) : (
            <span key={index} />
          )
        )}
      </div>
      <pre>order array: {order.join(", ")}</pre>
    </div>
  );
}
