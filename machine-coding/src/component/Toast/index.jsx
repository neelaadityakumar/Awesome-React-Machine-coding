import React from "react";
import { useToast } from "../../context/ToastContext";

const Toast = ({ id, type, message, onClose }) => {
  return (
    <div
      className={`p-4 rounded shadow-md text-white flex items-center justify-between ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : type === "info"
          ? "bg-blue-500"
          : "bg-gray-500"
      }`}
    >
      <span>{message}</span>
      <button
        className="ml-4 text-white font-bold hover:opacity-75"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};

const ToastList = () => {
  const { addToast, toasts, removeToast } = useToast();

  const showSuccessToast = () =>
    addToast({
      type: "success",
      message: "This is a success toast!",
      duration: 3000,
    });

  const showErrorToast = () =>
    addToast({
      type: "error",
      message: "This is an error toast!",
      duration: 5000,
    });

  const showInfoToast = () =>
    addToast({ type: "info", message: "This is an info toast!" }); // No duration

  return (
    <>
      <div className="App text-center mt-10">
        <h1 className="text-2xl font-bold">React Toast Notifications</h1>
        <div className="mt-5 space-x-4">
          <button
            onClick={showSuccessToast}
            className="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600"
          >
            Show Success Toast
          </button>
          <button
            onClick={showErrorToast}
            className="bg-red-500 text-white py-2 px-4 rounded shadow-md hover:bg-red-600"
          >
            Show Error Toast
          </button>
          <button
            onClick={showInfoToast}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600"
          >
            Show Info Toast
          </button>
        </div>
      </div>

      <div className="fixed top-5 right-5 z-50 flex flex-col space-y-4">
        {toasts.map(({ id, type, message }) => (
          <Toast
            key={id}
            id={id}
            type={type}
            message={message}
            onClose={() => removeToast(id)}
          />
        ))}
      </div>
    </>
  );
};

export default ToastList;
