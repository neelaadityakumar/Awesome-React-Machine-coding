import React, { useState } from "react";

const menuData = [
  { label: "Option 1" },
  {
    label: "Option 2",
    submenu: [
      { label: "Option 2.1" },
      { label: "Option 2.2" },
      {
        label: "Option 2.3",
        submenu: [
          {
            label: "Sub Menu 4",
            submenu: [
              {
                label: "Sub sub menu 1",
              },
              { label: "Sub sub menu 2" },
            ],
          },
        ],
      },
    ],
  },
  { label: "Option 3" },
];

const DropdownItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer">
        <span className="font-semibold">{item.label}</span>
        {item.submenu && <span>▶</span>}
      </div>

      {/* Nested submenu */}
      {item.submenu && isOpen && (
        <ul className="absolute left-full top-0 mt-0 ml-2 w-40 bg-white shadow-lg rounded-md border border-gray-200">
          {item.submenu?.map((subItem, index) => (
            <DropdownItem key={index} item={subItem} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default function MultiLevelDropdown() {
  return (
    <ul className="w-48 bg-white shadow-lg rounded-md border border-gray-200">
      {menuData.map((item, index) => (
        <DropdownItem key={index} item={item} />
      ))}
    </ul>
  );
}
