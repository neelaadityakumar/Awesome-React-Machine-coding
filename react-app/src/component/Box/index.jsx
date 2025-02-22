import React, { useEffect, useState } from "react";

const Box = ({ item, handleClicked, setChangeColor }) => {
  return item.isVisible ? (
    <div
      className={
        "border w-14 h-14 " +
        (item.isClicked ? "bg-green-500 " : "bg-yellow-400 ")
      }
      key={item.id}
      onClick={() => handleClicked(item)}
    >
      {item.id}
    </div>
  ) : (
    <div></div>
  );
};
export default function BoxContainer() {
  const [queue, setQueue] = useState([]);
  const [grid, setGrid] = useState([
    {
      id: 1,
      isClicked: false,
      isVisible: true,
    },
    {
      id: 2,
      isClicked: false,
      isVisible: true,
    },
    {
      id: 3,
      isClicked: false,
      isVisible: true,
    },
    {
      id: 4,
      isClicked: false,
      isVisible: true,
    },
    {
      id: 5,
      isClicked: false,
      isVisible: false,
    },
    {
      id: 6,
      isClicked: false,
      isVisible: false,
    },
    {
      id: 7,
      isClicked: false,
      isVisible: true,
    },
    {
      id: 8,
      isClicked: false,
      isVisible: true,
    },
    {
      id: 9,
      isClicked: false,
      isVisible: true,
    },
  ]);

  // Sets grid item isClicked to true when clicked and add
  // its to our queue if it is not already in the queue
  // Queue is array that stores the order in which
  // divs were clicked
  const handleClicked = (item) => {
    grid.map((gridItem) => {
      if (!queue.includes(gridItem)) {
        if (gridItem.id === item.id) {
          return setQueue((queueItem) => [...queueItem, gridItem]);
        }
      }
    });
    setGrid(
      grid.map((gridItem) => {
        if (gridItem.id === item.id) {
          gridItem.isClicked = true;
        }
        return gridItem;
      })
    );
  };

  // Logic to be added for settimeout and changing back color
  // in every 1 sec
  // setGrid()
  // if id of queue is equal to id of grid array
  // update is clicked to false
  // also set queue to empty after each div is reset

  useEffect(() => {
    let copyQueue = [...queue];
    if (queue.length === 7) {
      for (let i = 0; i < 7; i++) {
        let x = copyQueue.shift(); // Removes first item from copyQueue
        setTimeout(() => {
          setGrid((grid) => {
            return grid.map((gridItem, id) => {
              return x.id === gridItem.id
                ? { ...gridItem, isClicked: false }
                : gridItem;
            });
          });
        }, i * 1000);
      }
    }
  }, [queue]);

  return (
    <div className="text-center">
      <div className="grid grid-cols-3 w-1/2 justify-center gap-2">
        {grid.map((item, id) => {
          return <Box item={item} key={id} handleClicked={handleClicked} />;
        })}
      </div>
    </div>
  );
}
