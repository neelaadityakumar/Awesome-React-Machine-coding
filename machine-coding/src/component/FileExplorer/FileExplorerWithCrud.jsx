import React, { useState, useCallback } from "react";

const initialDataSet = [
  {
    id: 1,
    name: "Men",
  },
  {
    id: 2,
    name: "Women",
    isOpen: false,
    children: [
      {
        id: 3,
        name: "Item 1",
        isOpen: false,
        children: [{ id: 4, name: "Dress", children: [] }],
      },
    ],
  },
];

const FileExplorer = () => {
  const [dataSet, setDataSet] = useState(initialDataSet);

  const toggleFolder = useCallback((id) => {
    const toggle = (nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: toggle(node.children) };
        }
        return node;
      });
    setDataSet((prev) => toggle(prev));
  }, []);

  const addItem = useCallback((parentId, name, isFolder) => {
    const newItem = {
      id: Date.now(),
      name,
      ...(isFolder ? { children: [], isOpen: false } : {}),
    };

    const updateTree = (nodes) =>
      nodes.map((node) => {
        if (node.id === parentId) {
          const children = Array.isArray(node.children)
            ? [...node.children, newItem]
            : [newItem];
          return { ...node, isOpen: true, children };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });

    setDataSet((prev) => updateTree(prev));
  }, []);

  return (
    <div style={{ marginLeft: "16px" }}>
      {dataSet.map((node) =>
        Array.isArray(node.children) ? (
          <Folder
            key={node.id}
            node={node}
            onAdd={addItem}
            toggleOpen={toggleFolder}
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

const Folder = ({ node, onAdd, toggleOpen }) => {
  const [showInput, setShowInput] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isFolder, setIsFolder] = useState(true);

  const handleAddClick = (type) => {
    setShowInput(true);
    setIsFolder(type === "folder");
  };

  const handleSubmit = () => {
    if (!newItemName.trim()) return;
    onAdd(node.id, newItemName, isFolder);
    setNewItemName("");
    setShowInput(false);
  };

  return (
    <div style={{ marginLeft: "20px", marginBottom: "8px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          onClick={() => toggleOpen(node.id)}
          role="button"
          tabIndex={0}
          aria-expanded={node.isOpen}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {node.children?.length > 0 ? (
            <p>
              {node.isOpen ? "-" : "+"} {node.name}
            </p>
          ) : (
            <p>{node.name}</p>
          )}
        </div>

        <div style={{ marginLeft: "8px" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddClick("folder");
            }}
            style={{ background: "none", color: "green", marginRight: "4px" }}
          >
            +📁
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddClick("file");
            }}
            style={{ background: "none", color: "blue" }}
          >
            +📄
          </button>
        </div>
      </div>

      {showInput && (
        <div style={{ marginLeft: "24px", marginTop: "5px" }}>
          <input
            type="text"
            value={newItemName}
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

      {node.isOpen &&
        node.children?.map((child) =>
          Array.isArray(child.children) ? (
            <Folder
              key={child.id}
              node={child}
              onAdd={onAdd}
              toggleOpen={toggleOpen}
            />
          ) : (
            <File key={child.id} node={child} />
          )
        )}
    </div>
  );
};

export default FileExplorer;
