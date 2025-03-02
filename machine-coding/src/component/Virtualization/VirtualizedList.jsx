import React, { useRef, useState, useEffect } from "react";

const VirtualizedList = ({ items, itemHeight, containerHeight }) => {
  const containerRef = useRef(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 0 });

  useEffect(() => {
    const calculateRange = () => {
      const scrollTop = containerRef.current.scrollTop;
      const start = Math.floor(scrollTop / itemHeight);
      const end = Math.min(
        items.length - 1,
        Math.ceil((scrollTop + containerHeight) / itemHeight)
      );
      setVisibleRange({ start, end });
    };

    const container = containerRef.current;
    calculateRange();
    container.addEventListener("scroll", calculateRange);

    return () => {
      container.removeEventListener("scroll", calculateRange);
    };
  }, [itemHeight, containerHeight, items.length]);

  const totalHeight = items.length * itemHeight;
  const paddingTop = visibleRange.start * itemHeight;
  const visibleItems = items.slice(visibleRange.start, visibleRange.end + 1);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${containerHeight}px`,
        overflowY: "auto",
        position: "relative",
      }}
    >
      <div style={{ height: `${totalHeight}px`, position: "relative" }}>
        <div
          style={{
            transform: `translateY(${paddingTop}px)`,
            position: "absolute",
            width: "100%",
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={visibleRange.start + index}
              style={{
                height: `${itemHeight}px`,
                boxSizing: "border-box",
                borderBottom: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;
