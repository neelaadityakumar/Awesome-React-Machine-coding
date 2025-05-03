import { useState } from "react";

const DEFAULT_ITEMS_LEFT = [
  { label: "HTML", checked: false },
  { label: "JavaScript", checked: false },
  { label: "CSS", checked: false },
  { label: "TypeScript", checked: false },
];

const DEFAULT_ITEMS_RIGHT = [
  { label: "React", checked: false },
  { label: "Angular", checked: false },
  { label: "Vue", checked: false },
  { label: "Svelte", checked: false },
];

function ItemList({ items, setItems }) {
  return (
    <div className="p-4 flex flex-col gap-2">
      {items.map((item, index) => (
        <label key={index} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].checked = e.target.checked;
              setItems(newItems);
            }}
          />
          {item.label}
        </label>
      ))}
    </div>
  );
}

export default function TransferList() {
  const [itemsLeft, setItemsLeft] = useState(DEFAULT_ITEMS_LEFT);
  const [itemsRight, setItemsRight] = useState(DEFAULT_ITEMS_RIGHT);

  const hasSelected = (items) => items.some((item) => item.checked);

  const transferSelected = (from, setFrom, to, setTo) => {
    const selected = from.filter((item) => item.checked);
    const remaining = from.filter((item) => !item.checked);
    setTo([...to, ...selected.map((item) => ({ ...item, checked: false }))]);
    setFrom(remaining);
  };

  const transferAll = (from, setFrom, to, setTo) => {
    setTo([...to, ...from.map((item) => ({ ...item, checked: false }))]);
    setFrom([]);
  };

  return (
    <div className="flex gap-4 p-6 border border-gray-300 max-w-lg mx-auto">
      <ItemList items={itemsLeft} setItems={setItemsLeft} />
      <div className="flex flex-col items-center gap-2">
        <button
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={itemsRight.length === 0}
          onClick={() =>
            transferAll(itemsRight, setItemsRight, itemsLeft, setItemsLeft)
          }
        >
          &lt;&lt;
        </button>
        <button
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={!hasSelected(itemsRight)}
          onClick={() =>
            transferSelected(itemsRight, setItemsRight, itemsLeft, setItemsLeft)
          }
        >
          &lt;
        </button>
        <button
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={!hasSelected(itemsLeft)}
          onClick={() =>
            transferSelected(itemsLeft, setItemsLeft, itemsRight, setItemsRight)
          }
        >
          &gt;
        </button>
        <button
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={itemsLeft.length === 0}
          onClick={() =>
            transferAll(itemsLeft, setItemsLeft, itemsRight, setItemsRight)
          }
        >
          &gt;&gt;
        </button>
      </div>
      <ItemList items={itemsRight} setItems={setItemsRight} />
    </div>
  );
}
