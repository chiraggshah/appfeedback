import { useState, useEffect } from "react";
import cn from "classnames";
import Cookies from "js-cookie";
import Modal from "react-modal";

import DropDownCaret from "../svgs/DropDownCaret";

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

const Loader = () => (
  <div className="h-6 flex items-center justify-center space-x-2 animate-pulse">
    <div className="w-2 h-2 bg-white rounded-full"></div>
    <div className="w-2 h-2 bg-white rounded-full"></div>
    <div className="w-2 h-2 bg-white rounded-full"></div>
  </div>
);

Modal.defaultStyles.overlay.backgroundColor = "#999999CC";

const AddFeedbackModal = ({
  isOpen,
  closeModal,
  fetchFeedbacks,
  feedback = {},
  categories = [{}],
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [loading, showLoading] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    if (feedback.id) {
      setTitle(feedback.title || "");
      setDescription(feedback.description || "");
      setCategoryId(feedback.category_id || categories[0].id);
    }
  }, [feedback]);

  const onCloseModal = () => {
    setTitle("");
    setDescription("");
    setCategoryId(categories[0].id);
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

    let apiUrl, body;
    if (feedback.id) {
      apiUrl = "/api/updateFeedback";
      body = JSON.stringify({
        id: feedback.id,
        title,
        description,
        categoryId,
      });
    } else {
      apiUrl = "/api/createFeedback";
      body = JSON.stringify({ title, description, categoryId });
    }

    await fetch(apiUrl, {
      method: "POST",
      headers: {
        token: Cookies.get("token"),
      },
      body,
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

        <div className="mb-3">
          <div className="text-gray-800 font-light">Category</div>
          <div className="relative inline-flex self-center">
            <DropDownCaret />
            <select
              className="rounded border border-gray-400 h-10 w-auto pl-2 pr-10 bg-white focus:border-indigo-600 appearance-none"
              value={categoryId}
              defaultValue={categories[0].id}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
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

export default AddFeedbackModal;
