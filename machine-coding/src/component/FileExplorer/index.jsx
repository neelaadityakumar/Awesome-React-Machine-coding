import React, { useCallback, useState } from "react";
const dataSet = [
  {
    id: 1,
    name: "Men",
    children: [],
  },
  {
    id: 2,
    name: "Women",
    children: [
      {
        id: 3,
        name: "Item 1",
        children: [
          {
            id: 4,
            name: "Dress",
            children: [],
          },
          {
            id: 5,
            name: "Shoes",
            children: [],
          },
          {
            id: 6,
            name: "Toys",
            children: [
              {
                id: 7,
                name: "Toy 1",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 8,
        name: "Item 2",
        children: [
          {
            id: 9,
            name: "Folder 1",
            children: [],
          },
          {
            id: 10,
            name: "Folder 2",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 11,
    name: "Child",
    children: [
      {
        id: 12,
        name: "Item 2",
        children: [
          {
            id: 13,
            name: "Kurtis",
            children: [],
          },
          {
            id: 14,
            name: "Frocks",
            children: [],
          },
          {
            id: 15,
            name: "Shoes",
            children: [],
          },
        ],
      },
    ],
  },
];
const FileExplorer = () => {
  return (
    <div className="ml-4">
      {dataSet.map((node) =>
        node.children?.length ? (
          <Folder key={node.id} node={node} />
        ) : (
          <File key={node.id} node={node} />
        )
      )}
    </div>
  );
};

const File = ({ node }) => (
  <div className="ml-6 text-gray-700">{node.name}</div>
);

const Folder = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="ml-5 mb-2">
      <div
        onClick={toggleOpen}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleOpen()}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        className="cursor-pointer font-bold text-blue-600 select-none"
      >
        {isOpen ? "-" : "+"} {node.name}
      </div>
      {isOpen && (
        <div>
          {node.children.map((child) =>
            child.children?.length ? (
              <Folder key={child.id} node={child} />
            ) : (
              <File key={child.id} node={child} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
