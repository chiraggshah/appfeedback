import { useState } from "react";
import Cookies from "js-cookie";
import router from "next/router";

import Delete from "../svgs/Delete";
import Edit from "../svgs/Edit";
import CaretUp from "../svgs/CaretUp";

const Loader = () => (
  <div class="h-6 flex items-center justify-center space-x-1 animate-pulse">
    <div class="w-2 h-2 bg-white rounded-full"></div>
    <div class="w-2 h-2 bg-white rounded-full"></div>
  </div>
);

const Feedback = ({
  title,
  vote_count,
  description,
  id,
  user_id,
  onEdit,
  fetchFeedbacks,
  category_id,
  categories,
}) => {
  const [loading, showLoading] = useState(false);
  const categoryName = categories.find(({ id }) => category_id === id).name;

  const onEditFeedback = () => {
    if (Cookies.get("token")) {
      onEdit();
    } else {
      router.push("/api/auth/login");
    }
  };

  const deleteFeedback = async () => {
    if (Cookies.get("token")) {
      await fetch("/api/deleteFeedback", {
        method: "POST",
        headers: {
          token: Cookies.get("token"),
        },
        body: JSON.stringify({ id }),
      });
      fetchFeedbacks();
    } else {
      router.push("/api/auth/login");
    }
  };

  const updateVote = async () => {
    if (Cookies.get("token")) {
      showLoading(true);
      await fetch("/api/updateVote", {
        method: "POST",
        headers: {
          token: Cookies.get("token"),
        },
        body: JSON.stringify({
          feedbackId: id,
          voteCount: vote_count,
        }),
      });

      await fetchFeedbacks();
      showLoading(false);
    } else {
      router.push("/api/auth/login");
    }
  };

  return (
    <div className="flex flex-row border rounded-md my-4 p-5 bg-white justify-between shadow-sm">
      <div className="flex flex-row">
        <div
          className="flex flex-shrink-0 flex-col border rounded-md h-12 w-12 bg-indigo-600 items-center justify-center text-white cursor-pointer"
          onClick={updateVote}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <CaretUp />
              {vote_count}
            </>
          )}
        </div>
        <div className="flex flex-col px-5">
          <div className="font-medium">{title}</div>
          <div className="font-light flex-wrap text-sm mt-1">{description}</div>
          <div class="border-indigo-500 text-indigo-500 bg-indigo-100 text-xs px-2 py-1 rounded-full w-max mt-3">
            {categoryName}
          </div>
        </div>
      </div>
      <div className="flex">
        {Cookies.get("token") === user_id && (
          <div className="flex flex-row space-x-1">
            <div className="cursor-pointer" onClick={onEditFeedback}>
              <Edit />
            </div>
            <div className="cursor-pointer" onClick={deleteFeedback}>
              <Delete />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
