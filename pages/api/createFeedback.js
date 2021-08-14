export default async (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${process.env.HARPERDB_KEY}`,
  };

  const userId = req.headers.token;
  const { title, description, categoryId = null } = JSON.parse(req.body);

  const createFeedbackRequest = await fetch(process.env.HARPERDB_URL, {
    method: "POST",
    headers,
    redirect: "follow",
    body: JSON.stringify({
      operation: "sql",
      sql: `INSERT INTO dev.feedbacks (user_id, title, description, vote_count, category_id)\
        VALUES ('${userId}', '${title}', '${description}', 1, ${categoryId});\
      `,
    }),
  });

  if (createFeedbackRequest.status === 200) {
    const createFeedbackResponseData = await createFeedbackRequest.json();
    const feedbackId = createFeedbackResponseData.inserted_hashes[0];
    const createUserVote = await fetch(process.env.HARPERDB_URL, {
      method: "POST",
      headers,
      redirect: "follow",
      body: JSON.stringify({
        operation: "sql",
        sql: `INSERT INTO dev.votes (user_id, feedback_id)\
          VALUES ('${userId}', '${feedbackId}');\
        `,
      }),
    });
  }

  res.status(200).json({});
};
