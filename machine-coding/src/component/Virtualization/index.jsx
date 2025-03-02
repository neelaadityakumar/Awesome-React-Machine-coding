import React from "react";
import VirtualizedList from "./VirtualizedList";

const Virtualization = () => {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
  const itemHeight = 50;
  const containerHeight = 400;

  return (
    <div>
      <h1>Virtualized List Example</h1>
      <VirtualizedList
        items={items}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
      />
    </div>
  );
};

export default Virtualization;
