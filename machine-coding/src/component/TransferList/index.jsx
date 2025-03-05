import { useId, useState } from "react";

function CheckboxItem({ onChange, label, checked }) {
  const id = useId();

  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4"
      />
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </div>
  );
}

function ItemList({ items, setItems }) {
  return (
    <div className="p-5 flex-grow border rounded-md shadow-md bg-white">
      <ul className="space-y-3">
        {Array.from(items.entries()).map(([label, checked]) => (
          <li key={label}>
            <CheckboxItem
              label={label}
              checked={checked}
              onChange={() => {
                const newItems = new Map(items);
                newItems.set(label, !items.get(label));
                setItems(newItems);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

const DEFAULT_ITEMS_LEFT = ["HTML", "JavaScript", "CSS", "TypeScript"];
const DEFAULT_ITEMS_RIGHT = ["React", "Angular", "Vue", "Svelte"];

function generateItemsMap(items) {
  return new Map(items.map((label) => [label, false]));
}

function hasNoSelectedItems(items) {
  return Array.from(items.values()).every((val) => !val);
}

function transferAllItems(itemsSrc, setItemsSrc, itemsDst, setItemsDst) {
  setItemsDst(new Map([...itemsDst, ...itemsSrc]));
  setItemsSrc(new Map());
}

function transferSelectedItems(itemsSrc, setItemsSrc, itemsDst, setItemsDst) {
  const newItemsSrc = new Map(itemsSrc);
  const newItemsDst = new Map(itemsDst);

  itemsSrc.forEach((value, key) => {
    if (value) {
      newItemsDst.set(key, value);
      newItemsSrc.delete(key);
    }
  });
  setItemsSrc(newItemsSrc);
  setItemsDst(newItemsDst);
}

export default function TransferList() {
  const [itemsLeft, setItemsLeft] = useState(
    generateItemsMap(DEFAULT_ITEMS_LEFT)
  );
  const [itemsRight, setItemsRight] = useState(
    generateItemsMap(DEFAULT_ITEMS_RIGHT)
  );

  return (
    <div className="flex max-w-2xl mx-auto border p-5 shadow-lg rounded-md bg-gray-50">
      <ItemList items={itemsLeft} setItems={setItemsLeft} />
      <div className="flex flex-col items-center justify-center space-y-3 px-5">
        <button
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
          disabled={itemsRight.size === 0}
          onClick={() =>
            transferAllItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft)
          }
        >
          &lt;&lt;
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
          disabled={hasNoSelectedItems(itemsRight)}
          onClick={() =>
            transferSelectedItems(
              itemsRight,
              setItemsRight,
              itemsLeft,
              setItemsLeft
            )
          }
        >
          &lt;
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
          disabled={hasNoSelectedItems(itemsLeft)}
          onClick={() =>
            transferSelectedItems(
              itemsLeft,
              setItemsLeft,
              itemsRight,
              setItemsRight
            )
          }
        >
          &gt;
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
          disabled={itemsLeft.size === 0}
          onClick={() =>
            transferAllItems(itemsLeft, setItemsLeft, itemsRight, setItemsRight)
          }
        >
          &gt;&gt;
        </button>
      </div>
      <ItemList items={itemsRight} setItems={setItemsRight} />
    </div>
  );
}
