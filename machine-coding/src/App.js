import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Virtualization from "./component/Virtualization";
import Toast from "./component/Toast";
import Traffic from "./component/Traffic";
import Calendar from "./component/Calendar";
import FileExplorer from "./component/FileExplorer";
import KanbanBoard from "./component/KanbanBoard";
import DragAndDrop from "./component/DragAndDrop";
import MultiLevelDropDown from "./component/MultiLevelDropdown";
import CommentContainer from "./component/comment";
import ModalContainer from "./component/Modal/ModalContainer";
import GridLight from "./component/GridLight";
import FileExplorerWithCrud from "./component/FileExplorer/FileExplorerWithCrud";
import KanBanWithTaskAndBoardAdd from "./component/KanbanBoard/KanBanWithTaskAndBoardAdd";
import Timer from "./component/Timer";

const PageRoutes = [
  {
    title: "File Explorer",
    path: "/file-explorer",
    component: FileExplorer,
  },
  {
    title: "File Explorer w/ CRUD",
    path: "/file-explorer-crud",
    component: FileExplorerWithCrud,
  },
  {
    title: "Kanban Board",
    path: "/kanban-board",
    component: KanbanBoard,
  },
  {
    title: "Kanban w/ task/board add",
    path: "/kanban-board-crud",
    component: KanBanWithTaskAndBoardAdd,
  },
  {
    title: "Drag & Drop",
    path: "/drag-and-drop",
    component: DragAndDrop,
  },
  {
    title: "Toast",
    path: "/toast",
    component: Toast,
  },
  {
    title: "Traffic Light",
    path: "/traffic",
    component: Traffic,
  },
  {
    title: "Virtualization",
    path: "/virtual",
    component: Virtualization,
  },
  {
    title: "Calendar",
    path: "/calendar",
    component: Calendar,
  },
  {
    title: "Multi Level dropdown",
    path: "/multi-Level-dropdown",
    component: MultiLevelDropDown,
  },
  {
    title: "Nested Comment",
    path: "/comment",
    component: CommentContainer,
  },
  {
    title: "Modal",
    path: "/modal",
    component: ModalContainer,
  },
  {
    title: "Grid Light",
    path: "/grid-light",
    component: GridLight,
  },
  {
    title: "Timer",
    path: "/timer",
    component: Timer,
  },
];
function App() {
  return (
    <main className="min-w-full flex justify-center px-10 py-4">
      <div className="flex flex-col items-center my-10">
        <a
          href="/"
          className="text-3xl font-sm py-2 px-5 rounded-md mb-8 bg-[#5959a0] text-white"
        >
          Home
        </a>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home PageRoutes={PageRoutes} />} />
            {PageRoutes.map((page) => (
              <Route
                key={page.title}
                path={page.path}
                element={<page.component />}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
