import fetchHarperDB from "../../lib/fetchHarperDB";

export default async (req, res) => {
  const userId = req.headers.token;
  const { feedbackId, voteCount } = JSON.parse(req.body);

  const fetchVoteRequest = await fetchHarperDB(
    `
      SELECT * FROM dev.votes
      WHERE feedback_id = '${feedbackId}' AND user_id = '${userId}'
    `
  );

  const fetchVoteResponse = await fetchVoteRequest.json();

  if (fetchVoteResponse.length === 0) {
    const createVoteRequest = await fetchHarperDB(
      `
        INSERT INTO dev.votes (user_id, feedback_id)\
        VALUES ('${userId}', '${feedbackId}');
      `
    );

    const updateVoteCount = await fetchHarperDB(
      `
        UPDATE dev.feedbacks
        SET vote_count = ${voteCount + 1}
        WHERE id = '${feedbackId}'
      `
    );
  } else {
    const deleteVoteRequest = await fetchHarperDB(
      `
        DELETE FROM dev.votes
        WHERE feedback_id = '${feedbackId}' AND user_id = '${userId}';
      `
    );

    const updateVoteCount = await fetchHarperDB(
      `
        UPDATE dev.feedbacks
        SET vote_count = ${voteCount - 1}
        WHERE id = '${feedbackId}'
      `
    );
  }

  res.status(200).json({});
};
