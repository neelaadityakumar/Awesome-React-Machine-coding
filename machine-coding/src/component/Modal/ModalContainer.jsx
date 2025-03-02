import React, { useState, useRef, useEffect } from "react";

// Main Modal Component
const Modal = ({ isOpen, closeModal }) => {
  const modalContainerRef = useRef();

  // Handle click outside modal content
  const handleClickOutside = (e) => {
    if (
      modalContainerRef.current &&
      !modalContainerRef.current.contains(e.target)
    ) {
      closeModal();
    }
  };

  // Add event listener for clicks outside the modal
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"></div>
      {/* Modal Container */}
      <div
        ref={modalContainerRef}
        className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-1/2"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold">Modal</h1>
          <button
            onClick={closeModal}
            className="cursor-pointer hover:text-red-500 font-semibold text-lg"
          >
            &#x2716;
          </button>
        </div>
        <hr className="my-2" />
        <p className="text-center mb-4 text-gray-700">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
    </>
  );
};

const ModalContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-3xl font-bold mb-4">React Modal with Tailwind</h1>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Open Modal
      </button>{" "}
      <button
        onClick={openModal2}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Open Modal
      </button>
      {/* Modal Component */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
      <Modal isOpen={isModalOpen2} closeModal={closeModal2} />
    </div>
  );
};

export default ModalContainer;
