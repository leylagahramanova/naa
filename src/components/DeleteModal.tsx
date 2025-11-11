import React from "react";
import "./DeleteModal.css";

interface DeleteModalProps {
  isOpen: boolean;
  postTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  postTitle,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Delete Post</h3>
        <p>
          Are you sure you want to delete the post – <strong>{postTitle}</strong>?
        </p>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>
            No
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
