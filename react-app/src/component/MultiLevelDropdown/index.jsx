import React, { useState } from "react";

const menuData = [
  { label: "Menu 1" },
  {
    label: "Menu 2",
    submenu: [{ label: "Sub Menu 1" }, { label: "Sub Menu 2" }],
  },
  {
    label: "Menu 3",
    submenu: [
      { label: "Sub Menu 1" },
      { label: "Sub Menu 2" },
      { label: "Sub Menu 3" },
      {
        label: "Sub Menu 4",
        submenu: [{ label: "Sub sub menu 1" }, { label: "Sub sub menu 2" }],
      },
    ],
  },
  {
    label: "Menu 4",
    submenu: [{ label: "Sub Menu 1" }, { label: "Sub Menu 2" }],
  },
];

const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li className="cursor-pointer select-none">
        <div
          className="py-1 px-2 hover:bg-gray-200 rounded-md flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {item.label}
          {item.submenu && <span>{isOpen ? "▲" : "▼"}</span>}
        </div>
      </li>

      {item.submenu && (
        <ul
          className={`ml-4 transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {item.submenu.map((subItem, index) => (
            <MenuItem key={index} item={subItem} />
          ))}
        </ul>
      )}
    </>
  );
};

const MultiLevelDropDown = () => {
  return (
    <div className="grid place-content-center p-4">
      <ul className="bg-white shadow-md p-4 rounded-md w-64">
        {menuData.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default MultiLevelDropDown;
