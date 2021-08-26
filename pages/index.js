import { useState } from "react";
import useSWR from "swr";
import cn from "classnames";

import FeedbackList from "../components/ui/FeedbackList";
import AddFeedbackModal from "../components/ui/AddFeedbackModal";
import fetchHarperDB from "../lib/fetchHarperDB";

const sortAndFilterFeedbacks = (
  feedbacks,
  searchStr,
  selectedCategory,
  sortBy
) => {
  const searchIn = (attr = "") =>
    String(attr).toLowerCase().includes(searchStr.toLowerCase());

  const feedbacksBySearch = feedbacks
    .filter(
      ({ title, description }) => searchIn(title) || searchIn(description)
    )
    .filter(({ category_id }) =>
      selectedCategory === 0 ? true : category_id === selectedCategory
    );

  switch (sortBy) {
    case "CREATED_AT_ASC":
      return feedbacksBySearch.sort(
        (a, b) => b.__createdtime__ - a.__createdtime__
      );
    case "CREATED_AT_DESC":
      return feedbacksBySearch.sort(
        (a, b) => a.__createdtime__ - b.__createdtime__
      );
    case "MOST_VOTES":
      return feedbacksBySearch.sort((a, b) => b.vote_count - a.vote_count);
  }
};

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
  const [sortOrder, setSortOrder] = useState("CREATED_AT_ASC");

  const closeAddFeedbackModal = () => setAddFeedbackModalIsOpen(false);
  const showAddFeedbackModal = () => setAddFeedbackModalIsOpen(true);

  const sortedAndFilteredFeedbacks = sortAndFilterFeedbacks(
    feedbacks,
    search,
    selectedCategory,
    sortOrder
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
          <div className="flex flex-row justify-between p-4 border-b">
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
          <div className="flex flex-row justify-between p-4 border-b">Sort</div>
          <div>
            <SortItem
              label="Recent First"
              selected={sortOrder === "CREATED_AT_ASC"}
              onClick={() => setSortOrder("CREATED_AT_ASC")}
            />
            <SortItem
              label="Oldest First"
              selected={sortOrder === "CREATED_AT_DESC"}
              onClick={() => setSortOrder("CREATED_AT_DESC")}
            />
            <SortItem
              label="Most Votes"
              selected={sortOrder === "MOST_VOTES"}
              onClick={() => {
                console.log(123);
                setSortOrder("MOST_VOTES");
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-4">
        {sortedAndFilteredFeedbacks.length === 0 ? (
          <div className="my-4">No Feedbacks Found</div>
        ) : (
          <FeedbackList
            feedbacks={sortedAndFilteredFeedbacks}
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

const SortItem = ({ label, onClick, selected }) => (
  <div
    className="flex flex-row justify-between py-3 px-4 cursor-pointer hover:bg-indigo-200"
    onClick={onClick}
  >
    <h4 className={cn({ "text-indigo-500": selected })}>{label}</h4>
    <div
      className={cn("flex border-2 rounded-full w-2 h-2 p-2", {
        "bg-indigo-100 border-indigo-500": selected,
        "border-gray-300 bg-white": !selected,
      })}
    />
  </div>
);
