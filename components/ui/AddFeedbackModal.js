import { useState } from "react";
import Cookies from "js-cookie";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "60%",
    height: "40%",
    transform: "translate(-50%, -50%)",
  },
};

const AddFeedbackModal = ({ isOpen, closeModal, fetchFeedbacks }) => {
  const addFeedback = async () => {
    await fetch("/api/createFeedback", {
      method: "POST",
      headers: {
        token: Cookies.get("token"),
      },
      body: JSON.stringify({
        title: "Feedback Title",
        description: "Feedback Description",
      }),
    });
    fetchFeedbacks();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex flex-col">
        <h2 className="text-red-400">Hello</h2>
        <d onClick={closeModal}>close</d>
        <div>I am a modal</div>
      </div>
    </Modal>
  );
};

export default AddFeedbackModal;
