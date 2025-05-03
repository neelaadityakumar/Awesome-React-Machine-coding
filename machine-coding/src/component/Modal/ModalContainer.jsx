import React, { useState, useRef, useEffect } from "react";

const Modal = ({ isOpen, onClose, title = "Modal", children }) => {
  const modalRef = useRef();
  const [show, setShow] = useState(false);

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      setShow(true);
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      setShow(false);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Modal Content */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className={`fixed z-50 top-1/2 left-1/2
           -translate-x-1/2 -translate-y-1/2
          bg-white p-6 rounded-lg shadow-lg w-1/2
          transition-all duration-[1000ms] ease-out
          ${show ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition text-xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <hr className="mb-4" />
        <div className="text-gray-700 text-sm">{children}</div>
      </div>
    </>
  );
};

const ModalContainer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (id) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
      <h1 className="text-3xl font-bold mb-4">React Modal with Tailwind</h1>

      <button
        onClick={() => openModal(1)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Open Modal 1
      </button>

      <button
        onClick={() => openModal(2)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Open Modal 2
      </button>

      <Modal
        isOpen={activeModal === 1}
        onClose={closeModal}
        title="First Modal"
      >
        Lorem Ipsum is dummy text of the printing and typesetting industry.
      </Modal>

      <Modal
        isOpen={activeModal === 2}
        onClose={closeModal}
        title="Second Modal"
      >
        This is another modal with separate content. Customize as needed.
      </Modal>
    </div>
  );
};

export default ModalContainer;
