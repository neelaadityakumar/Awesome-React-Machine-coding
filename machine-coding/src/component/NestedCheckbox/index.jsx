import { useState } from "react";

const checkboxesData = [
  {
    id: 1,
    name: "Electronics",
    checked: false,
    children: [
      {
        id: 2,
        name: "Mobile phones",
        checked: false,
        children: [
          { id: 3, name: "iPhone", checked: false },
          { id: 4, name: "Android", checked: false },
        ],
      },
      {
        id: 5,
        name: "Laptops",
        checked: false,
        children: [
          { id: 6, name: "MacBook", checked: false },
          { id: 7, name: "Surface Pro", checked: false },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Books",
    checked: false,
    children: [
      { id: 9, name: "Fiction", checked: false },
      { id: 10, name: "Non-fiction", checked: false },
    ],
  },
  { id: 11, name: "Toys", checked: false },
];

const updateCheckboxState = (items, id, checked) => {
  return items.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        checked,
        children: item.children
          ? updateCheckboxState(item.children, id, checked)
          : item.children,
      };
    }
    if (item.children) {
      return {
        ...item,
        children: updateCheckboxState(item.children, id, checked),
      };
    }
    return item;
  });
};

const propagateState = (items, checked) => {
  return items.map((item) => ({
    ...item,
    checked,
    children: item.children
      ? propagateState(item.children, checked)
      : item.children,
  }));
};

const calculateState = (items) => {
  const allChecked = items.every((item) => item.checked);
  const someChecked = items.some((item) => item.checked || item.indeterminate);
  return { checked: allChecked, indeterminate: someChecked && !allChecked };
};

const updateStates = (items) => {
  return items.map((item) => {
    if (item.children) {
      const updatedChildren = updateStates(item.children);
      const { checked, indeterminate } = calculateState(updatedChildren);
      return { ...item, checked, indeterminate, children: updatedChildren };
    }
    return item;
  });
};

const NestedCheckbox = () => {
  const [checkboxes, setCheckboxes] = useState(updateStates(checkboxesData));

  const handleCheckboxChange = (id, checked) => {
    const updateTree = (items) => {
      return items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked,
            children: item.children
              ? propagateState(item.children, checked)
              : item.children,
          };
        }
        if (item.children) {
          return { ...item, children: updateTree(item.children) };
        }
        return item;
      });
    };

    let updatedCheckboxes = updateTree(checkboxes);
    updatedCheckboxes = updateStates(updatedCheckboxes);
    setCheckboxes(updatedCheckboxes);
  };

  const renderCheckboxes = (items) => {
    return items.map((item) => (
      <div key={item.id} className="ml-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.checked}
            ref={(el) => el && (el.indeterminate = item.indeterminate || false)}
            onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
            className="w-4 h-4"
          />
          <span>{item.name}</span>
        </label>
        {item.children && (
          <div className="ml-4">{renderCheckboxes(item.children)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="p-4 border rounded-lg w-64 bg-gray-50">
      {renderCheckboxes(checkboxes)}
    </div>
  );
};

export default NestedCheckbox;
