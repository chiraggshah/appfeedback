const fetchHarperDB = (sql) =>
  fetch(process.env.HARPERDB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    redirect: "follow",
    body: JSON.stringify({
      operation: "sql",
      sql,
    }),
  });

export default fetchHarperDB;
