import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Layout from "../components/Layout";
import FeedbackList from "../components/ui/FeedbackList";
import AddFeedbackModal from "../components/ui/AddFeedbackModal";
import CategoryItem from "../components/ui/CategoryItem";
import SortItem from "../components/ui/SortItem";
import fetchHarperDB from "../lib/fetchHarperDB";
import sortAndFilterFeedbacks from "../lib/sortAndFilterFeedbacks";

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

export default function Feedbacks({ categories }) {
  const router = useRouter();
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
            if (Cookies.get("token")) {
              setFeedbackForEdit();
              showAddFeedbackModal();
            } else {
              router.push("/api/auth/login");
            }
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
              onClick={() => setSortOrder("MOST_VOTES")}
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
            categories={categories}
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

Feedbacks.Layout = Layout;
