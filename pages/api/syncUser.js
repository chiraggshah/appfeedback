export default async (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${process.env.HARPERDB_KEY}`,
  };

  const user = JSON.parse(req.body);

  const fetchUserRequest = await fetch(process.env.HARPERDB_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      operation: "sql",
      sql: `SELECT * from dev.users WHERE auth0_id = '${user.sub}'`,
    }),
  });

  const fetchUserData = await fetchUserRequest.json();
  let userId;

  if (fetchUserData.length === 0) {
    const createUserRequest = await fetch(process.env.HARPERDB_URL, {
      method: "POST",
      headers,
      redirect: "follow",
      body: JSON.stringify({
        operation: "sql",
        sql: `INSERT INTO dev.users (auth0_id, email, nickname)\
            VALUES ('${user.sub}', '${user.email}', '${user.nickname}');\
          `,
      }),
    });

    const createUserData = await createUserRequest.json();
    userId = createUserData.inserted_hashes[0];
  } else {
    userId = fetchUserData[0].id;
  }

  res.status(200).json({ token: userId });
};
