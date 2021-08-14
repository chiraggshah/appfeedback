import fetchHarperDB from "../../lib/fetchHarperDB";

export default async (req, res) => {
  const { sub, email, nickname } = JSON.parse(req.body);

  const fetchUserRequest = await fetchHarperDB(
    `SELECT * from dev.users WHERE auth0_id = '${sub}'`
  );

  const fetchUserData = await fetchUserRequest.json();
  let userId;

  if (fetchUserData.length === 0) {
    const createUserRequest = await fetchHarperDB(
      `
        INSERT INTO dev.users (auth0_id, email, nickname)\
        VALUES ('${sub}', '${email}', '${nickname}');\
      `
    );

    const createUserData = await createUserRequest.json();
    userId = createUserData.inserted_hashes[0];
  } else {
    userId = fetchUserData[0].id;
  }

  res.status(200).json({ token: userId });
};
