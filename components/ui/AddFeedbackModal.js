import { useState } from "react";
import cn from "classnames";
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
    transform: "translate(-50%, -50%)",
  },
};

Modal.defaultStyles.overlay.backgroundColor = "#999999CC";

const AddFeedbackModal = ({ isOpen, closeModal, fetchFeedbacks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, showLoading] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const onCloseModal = () => {
    setTitle("");
    setDescription("");
    setTitleError(false);
    setDescriptionError(false);
    closeModal();
  };

  const isInputValid = () => {
    if (!title) {
      setTitleError(true);
    }

    if (!description) {
      setDescriptionError(true);
    }

    return title && description;
  };

  const addFeedback = async () => {
    if (!isInputValid()) {
      return;
    }

    showLoading(true);
    await fetch("/api/createFeedback", {
      method: "POST",
      headers: {
        token: Cookies.get("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    await fetchFeedbacks();
    showLoading(false);
    onCloseModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex flex-col">
        <div>
          <div className="flex flex-row">
            <div className="text-gray-800 font-light">Title</div>
            {titleError && (
              <div className="text-red-600 font-light"> (Required)</div>
            )}
          </div>
          <input
            className="border border-gray-400 appearance-none rounded w-full px-2 py-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="my-3">
          <div className="flex flex-row">
            <div className="text-gray-800 font-light">Description</div>
            {descriptionError && (
              <div className="text-red-600 font-light"> (Required)</div>
            )}
          </div>
          <textarea
            className="border border-gray-400 appearance-none rounded w-full px-2 py-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
            value={description}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-row justify-around content-end items-end">
          <button
            className="border rounded-md p-2 bg-red-600 text-white w-40 text-center"
            onClick={onCloseModal}
          >
            Cancel
          </button>

          <button
            className={cn(
              "border rounded-md p-2 bg-indigo-600 text-white w-40 text-center",
              {
                "cursor-not-allowed": loading,
              }
            )}
            onClick={addFeedback}
            disabled={loading}
          >
            {loading ? <Loader /> : "Submit"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const Loader = () => (
  <div class="h-6 flex items-center justify-center space-x-2 animate-pulse">
    <div class="w-2 h-2 bg-white rounded-full"></div>
    <div class="w-2 h-2 bg-white rounded-full"></div>
    <div class="w-2 h-2 bg-white rounded-full"></div>
  </div>
);

export default AddFeedbackModal;
