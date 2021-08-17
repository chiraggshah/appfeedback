import Cookies from "js-cookie";

const FeedbackList = ({ feedbacks }) =>
  feedbacks.map((item) => <Feedback key={item.id} {...item} />);

const Feedback = ({ title, vote_count, description, id, user_id, ...rest }) => {
  const currentUserId = Cookies.get("token");

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
      <div className="flex">{currentUserId === user_id ? "..." : ""}</div>
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

export default FeedbackList;
