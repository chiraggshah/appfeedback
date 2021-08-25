import fetchHarperDB from "../../lib/fetchHarperDB";

export default async (req, res) => {
  const fetchCategoriesRequest = await fetchHarperDB(
    `
      SELECT * FROM dev.categories;
    `
  );
  const categories = await fetchCategoriesRequest.json();

  res.status(200).json(categories);
};
