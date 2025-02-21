import React, { useState, useCallback } from "react";

const FileList = ({ dataSet }) => (
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

export default FileList;
