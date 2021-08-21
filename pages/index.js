import { useState } from "react";
import useSWR from "swr";

import FeedbackList from "../components/ui/FeedbackList";
import AddFeedbackModal from "../components/ui/AddFeedbackModal";

export default function Feedback() {
  const { data: feedbacks = [], mutate } = useSWR("/api/fetchFeedbacks");
  const [addFeedbackModalIsOpen, setAddFeedbackModalIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [feedbackForEdit, setFeedbackForEdit] = useState();

  const closeAddFeedbackModal = () => setAddFeedbackModalIsOpen(false);
  const showAddFeedbackModal = () => setAddFeedbackModalIsOpen(true);

  const searchIn = (attr = "") =>
    String(attr).toLowerCase().includes(search.toLowerCase());

  const feedbacksBySearch = feedbacks.filter(
    ({ title, description }) => searchIn(title) || searchIn(description)
  );

  return (
    <div className="grid grid-cols-8 gap-4">
      <div />
      <div className="col-span-2 text-2xl">All Feedbacks</div>

      <div className="flex flex-row col-span-4 justify-end items-center space-x-4">
        <input
          placeholder="Search"
          className="border rounded-md p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className="border rounded-md p-2 bg-indigo-600 text-white cursor-pointer"
          onClick={() => {
            setFeedbackForEdit();
            showAddFeedbackModal();
          }}
        >
          Add Feedback
        </div>
      </div>
      <div />

      <div />
      <div className="col-span-2">
        <div className="border rounded-md bg-white shadow-sm my-4">
          <div className="flex flex-row justify-between p-4 border-b items-center">
            <div>Categories</div>
          </div>
          <div className="p-4">
            <CategoryItem label="All" count="0" />
            <CategoryItem label="General ✋🏻" count="0" />
            <CategoryItem label="Features ❤️" count="0" />
            <CategoryItem label="Integrations 🤩" count="0" />
          </div>
        </div>
        <div className="border rounded-md bg-white shadow-sm my-6">
          <div className="flex flex-row justify-between p-4 border-b">
            Filter
          </div>
          <div className="p-4">
            <FilterItem label="Sort By" filterBy="Top" />
            <FilterItem label="Status" filterBy="All" />
            <FilterItem label="Tags" filterBy="All" />
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <FeedbackList
          feedbacks={feedbacksBySearch}
          setFeedbackForEdit={setFeedbackForEdit}
          showAddFeedbackModal={showAddFeedbackModal}
          fetchFeedbacks={mutate}
        />
      </div>
      <div />
      <AddFeedbackModal
        closeModal={closeAddFeedbackModal}
        isOpen={addFeedbackModalIsOpen}
        fetchFeedbacks={mutate}
        feedback={feedbackForEdit}
      />
    </div>
  );
}

const CategoryItem = ({ label, count }) => (
  <div className="flex flex-row justify-between py-3">
    <h4 className="">{label}</h4>
    <div className="rounded-full px-3 bg-indigo-100 text-sm text-indigo-500 self-center border border-indigo-500">
      {count}
    </div>
  </div>
);

const FilterItem = ({ label, filterBy }) => (
  <div className="flex flex-row justify-between py-3">
    <h4 className="">{label}</h4>
    <div className="">{filterBy}</div>
  </div>
);
