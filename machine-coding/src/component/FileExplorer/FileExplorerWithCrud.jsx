import React, { useState, useCallback } from "react";

const initialDataSet = [
  {
    id: 1,
    name: "Men",
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
        ],
      },
    ],
  },
];

const FileExplorer = () => {
  const [dataSet, setDataSet] = useState(initialDataSet);

  return (
    <div style={{ marginLeft: "16px" }}>
      {dataSet.map((node) =>
        Array.isArray(node.children) ? (
          <Folder
            key={node.id}
            node={node}
            dataSet={dataSet}
            updateData={setDataSet}
          />
        ) : (
          <File key={node.id} node={node} />
        )
      )}
    </div>
  );
};

const File = ({ node }) => (
  <div style={{ marginLeft: "24px", color: "#4A5568" }}>{node.name}</div>
);

const Folder = ({ node, dataSet, updateData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isFolder, setIsFolder] = useState(true);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleAddClick = (type) => {
    setShowInput(true);
    setIsFolder(type === "folder");
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    if (!newItemName.trim()) return;

    if (!node.children) {
      node.children = [];
    }

    node.children.push({
      id: Date.now(),
      name: newItemName,
      children: isFolder ? [] : undefined,
    });

    setNewItemName("");
    setShowInput(false);
    updateData([...dataSet]);
  };

  return (
    <div style={{ marginLeft: "20px", marginBottom: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={toggleOpen}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
        >
          <p>
            {isOpen ? "-" : "+"} {node.name}{" "}
          </p>
        </div>

        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddClick("folder");
            }}
            style={{
              background: "none",
              width: "20px",

              color: "green",
            }}
          >
            +
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddClick("file");
            }}
            style={{
              background: "none",
              color: "blue",
              width: "20px",
            }}
          >
            +
          </button>
        </div>

        {showInput && (
          <div style={{ marginLeft: "24px", marginTop: "5px" }}>
            <input
              type="text"
              value={newItemName}
              onBlur={() => setShowInput(false)}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`Enter ${isFolder ? "folder" : "file"} name`}
              style={{
                padding: "4px",
                fontSize: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginRight: "5px",
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                fontSize: "12px",
                padding: "4px 8px",
                cursor: "pointer",
                border: "1px solid #ddd",
                borderRadius: "4px",
                background: "#eee",
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div>
          {node.children?.map((child) =>
            Array.isArray(child.children) ? (
              <Folder
                key={child.id}
                node={child}
                dataSet={dataSet}
                updateData={updateData}
              />
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
