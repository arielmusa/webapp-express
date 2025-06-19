import { connection } from "../data/db.js";

const index = (req, res) => {
  const sql = `SELECT * FROM movies`;

  connection.query(sql, (err, results) => {
    res.json(results);
  });
};

const show = (req, res) => {
  const id = req.params.id;
  const sqlMovies = `SELECT * FROM movies WHERE id = ?`;
  const sqlReviews = `SELECT * FROM reviews WHERE movie_id = ?`;

  connection.query(sqlMovies, [id], (err, movieResults) => {
    if (err)
      return res
        .status(500)
        .json({ error: 500, message: "Database query failed" });
    if (!movieResults.length)
      return res.status(404).json({ error: 404, message: "item not found" });
    connection.query(sqlReviews, [id], (err, reviewsResults) => {
      if (err)
        res.status(500).json({ error: 500, message: "Database query failed" });

      res.json({
        movie: movieResults,
        reviews: reviewsResults,
      });
    });
  });
};

const storeReview = (req, res) => {
  const id = req.params.id;
  const { name, vote, text } = req.body;

  const sql = `INSERT INTO reviews (movie_id, name, vote, text) VALUES (? ,? ,? ,?)`;

  connection.query(sql, [id, name, vote, text], (err, response) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    res.sendStatus(204);
  });
};

export { index, show, storeReview };
