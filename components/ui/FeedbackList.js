import Feedback from "./Feedback";

const FeedbackList = ({
  feedbacks,
  setFeedbackForEdit,
  showAddFeedbackModal,
  fetchFeedbacks,
  categories,
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
      categories={categories}
    />
  ));

export default FeedbackList;
