import fetchHarperDB from "../../lib/fetchHarperDB";

export default async (req, res) => {
  const userId = req.headers.token;
  const { title, description, categoryId = null } = JSON.parse(req.body);

  const createFeedbackRequest = await fetchHarperDB(
    `
      INSERT INTO dev.feedbacks (user_id, title, description, vote_count, category_id)\
      VALUES ('${userId}', '${title}', '${description}', 1, ${categoryId});
    `
  );

  if (createFeedbackRequest.status === 200) {
    const createFeedbackResponseData = await createFeedbackRequest.json();
    const feedbackId = createFeedbackResponseData.inserted_hashes[0];
    const createUserVote = await fetchHarperDB(
      `
        INSERT INTO dev.votes (user_id, feedback_id)\
        VALUES ('${userId}', '${feedbackId}');
      `
    );
  }

  res.status(200).json({});
};
