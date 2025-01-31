import React from "react";

const ImageModal = ({ selectedImage, onClose }) => {
  if (!selectedImage) return null;

  return (
    <div className="image-modal" onClick={onClose}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <img src={selectedImage} alt="Expanded View" className="modal-image" />
      </div>
    </div>
  );
};

export default ImageModal;
