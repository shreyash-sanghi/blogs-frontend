import React from "react";

const Modal = ({ showModal, onClose, children, title }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-3/4 md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div>{children}</div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
