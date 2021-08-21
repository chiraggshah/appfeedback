import fetchHarperDB from "../../lib/fetchHarperDB";

export default async (req, res) => {
  const { id } = JSON.parse(req.body);

  const deleteFeedbackRequest = await fetchHarperDB(
    `
      DELETE FROM dev.feedbacks
      WHERE id = '${id}';
    `
  );

  res.status(200).json({});
};
