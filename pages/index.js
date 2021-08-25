import { useState } from "react";
import useSWR from "swr";
import cn from "classnames";

import FeedbackList from "../components/ui/FeedbackList";
import AddFeedbackModal from "../components/ui/AddFeedbackModal";
import fetchHarperDB from "../lib/fetchHarperDB";

export async function getServerSideProps({ req }) {
  const fetchCategoriesRequest = await fetchHarperDB(
    `
      SELECT * FROM dev.categories
      ORDER BY __createdtime__;
    `
  );
  const categories = await fetchCategoriesRequest.json();

  // Pass data to the page via props
  return { props: { categories } };
}

export default function Feedback({ categories }) {
  const { data: feedbacks = [], mutate } = useSWR("/api/fetchFeedbacks");
  const [addFeedbackModalIsOpen, setAddFeedbackModalIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [feedbackForEdit, setFeedbackForEdit] = useState();

  const closeAddFeedbackModal = () => setAddFeedbackModalIsOpen(false);
  const showAddFeedbackModal = () => setAddFeedbackModalIsOpen(true);

  const searchIn = (attr = "") =>
    String(attr).toLowerCase().includes(search.toLowerCase());

  const feedbacksBySearch = feedbacks.filter(
    ({ title, description }) => searchIn(title) || searchIn(description)
  );

  const feedbackByCategory =
    selectedCategory === 0
      ? feedbacksBySearch
      : feedbacksBySearch.filter(
          ({ category_id }) => category_id === selectedCategory
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
          <div>
            <CategoryItem
              label="All"
              count={feedbacks.length}
              selected={selectedCategory === 0}
              onClick={() => {
                setSelectedCategory(0);
              }}
            />
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                label={category.name}
                selected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
                count={
                  feedbacks.filter(
                    (feedback) => feedback.category_id === category.id
                  ).length
                }
              />
            ))}
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
        {feedbackByCategory.length === 0 ? (
          <div className="my-4">No Feedbacks Found</div>
        ) : (
          <FeedbackList
            feedbacks={feedbackByCategory}
            setFeedbackForEdit={setFeedbackForEdit}
            showAddFeedbackModal={showAddFeedbackModal}
            fetchFeedbacks={mutate}
          />
        )}
      </div>
      <div />
      <AddFeedbackModal
        closeModal={closeAddFeedbackModal}
        isOpen={addFeedbackModalIsOpen}
        fetchFeedbacks={mutate}
        feedback={feedbackForEdit}
        categories={categories}
      />
    </div>
  );
}

const CategoryItem = ({ label, count, selected, onClick }) => (
  <div
    className="flex flex-row justify-between py-3 px-4 cursor-pointer hover:bg-indigo-200"
    onClick={onClick}
  >
    <h4 className={cn({ "text-indigo-500": selected })}>{label}</h4>
    <div
      className={cn(
        "rounded-full px-3 text-sm self-center border",
        { "border-indigo-500 text-indigo-500 bg-indigo-100": selected },
        { "border-gray-300 bg-white text-gray-300": !selected }
      )}
    >
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
