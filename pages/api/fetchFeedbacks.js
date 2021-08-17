import fetchHarperDB from "../../lib/fetchHarperDB";

export default async (req, res) => {
  const fetchFeedbacksRequest = await fetchHarperDB(
    `
      SELECT * FROM dev.feedbacks;
    `
  );
  const feedbacks = await fetchFeedbacksRequest.json();

  res.status(200).json(feedbacks);
};
