import fetchHarperDB from "../../lib/fetchHarperDB";

export default async (req, res) => {
  const { id, title, description, categoryId = null } = JSON.parse(req.body);

  const updateFeedbackRequest = await fetchHarperDB(
    `
      UPDATE dev.feedbacks
      SET title = '${title}', description = '${description}', category_id = '${categoryId}'\
      WHERE id = '${id}';
    `
  );

  res.status(200).json({});
};
