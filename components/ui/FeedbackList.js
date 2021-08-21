import Cookies from "js-cookie";

const FeedbackList = ({
  feedbacks,
  setFeedbackForEdit,
  showAddFeedbackModal,
  fetchFeedbacks,
}) =>
  feedbacks.map((item) => (
    <Feedback
      key={item.id}
      {...item}
      onEdit={() => {
        setFeedbackForEdit(item);
        showAddFeedbackModal();
      }}
      fetchFeedbacks={fetchFeedbacks}
    />
  ));

const Feedback = ({
  title,
  vote_count,
  description,
  id,
  user_id,
  onEdit,
  fetchFeedbacks,
}) => {
  const currentUserId = Cookies.get("token");

  const deleteFeedback = async () => {
    await fetch("/api/deleteFeedback", {
      method: "POST",
      headers: {
        token: Cookies.get("token"),
      },
      body: JSON.stringify({ id }),
    });
    fetchFeedbacks();
  };

  return (
    <div className="flex flex-row border rounded-md my-4 p-5 bg-white justify-between shadow-sm">
      <div className="flex flex-row">
        <div className="flex flex-shrink-0 flex-col border rounded-md h-12 w-12 bg-indigo-600 items-center justify-center text-white">
          <CaretUp />
          {vote_count}
        </div>
        <div className="flex flex-col px-5">
          <div className="font-medium">{title}</div>
          <div className="font-light flex-wrap text-sm mt-1">{description}</div>
        </div>
      </div>
      <div className="flex">
        {currentUserId === user_id && (
          <div className="flex flex-row space-x-1">
            <div className="cursor-pointer" onClick={onEdit}>
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

const CaretUp = () => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 16 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 8.5L7.99996 0.499962L0 8.5L16 8.5Z" fill="white"></path>
  </svg>
);

const Edit = () => (
  <svg
    fill="#000000"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18px"
    height="18px"
  >
    <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z" />
  </svg>
);

const Delete = () => (
  <svg
    fill="#fc9a9a"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
  >
    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
  </svg>
);

export default FeedbackList;
