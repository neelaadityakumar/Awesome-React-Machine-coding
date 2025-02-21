import React from "react";
import FileList from "./FileList";
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
  return <FileList dataSet={dataSet} />;
};

export default FileExplorer;
