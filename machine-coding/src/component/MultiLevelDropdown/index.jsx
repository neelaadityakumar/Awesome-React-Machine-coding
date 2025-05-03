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
            submenu: [{ label: "Sub sub menu 1" }, { label: "Sub sub menu 2" }],
          },
        ],
      },
    ],
  },
  { label: "Option 3" },
];

const DropdownItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
        <span>{item.label}</span>
        {item.submenu && <span className="ml-2 text-sm">▶</span>}
      </div>

      {item.submenu && open && (
        <ul className="absolute top-0 left-full mt-0 w-40 bg-white border rounded shadow-md z-10">
          {item.submenu.map((subItem, idx) => (
            <DropdownItem key={idx} item={subItem} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default function MultiLevelDropdown() {
  return (
    <ul className="w-48 bg-white border rounded shadow-md p-1 space-y-1">
      {menuData.map((item, idx) => (
        <DropdownItem key={idx} item={item} />
      ))}
    </ul>
  );
}
