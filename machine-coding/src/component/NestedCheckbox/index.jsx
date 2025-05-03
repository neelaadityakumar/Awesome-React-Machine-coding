import { useEffect, useRef, useState } from "react";

const data = [
  {
    id: 1,
    name: "Electronics",
    children: [
      {
        id: 2,
        name: "Mobile phones",
        children: [
          { id: 3, name: "iPhone" },
          { id: 4, name: "Android" },
        ],
      },
      {
        id: 5,
        name: "Laptops",
        children: [
          { id: 6, name: "MacBook" },
          { id: 7, name: "Surface Pro" },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Books",
    children: [
      { id: 9, name: "Fiction" },
      { id: 10, name: "Non-fiction" },
    ],
  },
  { id: 11, name: "Toys" },
];

function initialize(items) {
  return items.map((item) => ({
    ...item,
    checked: false,
    indeterminate: false,
    children: item.children ? initialize(item.children) : undefined,
  }));
}

function propagateDown(items, checked) {
  return items.map((item) => ({
    ...item,
    checked,
    indeterminate: false,
    children: item.children ? propagateDown(item.children, checked) : undefined,
  }));
}

function updateTree(items, id, checked) {
  return items.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        checked,
        indeterminate: false,
        children: item.children
          ? propagateDown(item.children, checked)
          : undefined,
      };
    }

    if (item.children) {
      const updatedChildren = updateTree(item.children, id, checked);
      const all = updatedChildren.every((c) => c.checked);
      const some = updatedChildren.some((c) => c.checked || c.indeterminate);

      return {
        ...item,
        checked: all,
        indeterminate: !all && some,
        children: updatedChildren,
      };
    }

    return item;
  });
}

function Checkbox({ item, onToggle }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = item.indeterminate;
    }
  }, [item.indeterminate]);

  return (
    <div className="ml-4">
      <label className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          className="w-4 h-4"
          checked={item.checked}
          onChange={(e) => onToggle(item.id, e.target.checked)}
        />
        {item.name}
      </label>
      {item.children &&
        item.children.map((child) => (
          <Checkbox key={child.id} item={child} onToggle={onToggle} />
        ))}
    </div>
  );
}

export default function NestedCheckbox() {
  const [tree, setTree] = useState(() => initialize(data));

  const handleToggle = (id, checked) => {
    setTree((prev) => updateTree(prev, id, checked));
  };

  return (
    <div className="p-4 border rounded-lg w-64 bg-gray-50">
      {tree.map((item) => (
        <Checkbox key={item.id} item={item} onToggle={handleToggle} />
      ))}
    </div>
  );
}
