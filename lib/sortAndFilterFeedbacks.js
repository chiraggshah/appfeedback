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

export default sortAndFilterFeedbacks;
