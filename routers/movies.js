import express from "express";
import "dotenv/config";
import { connection } from "../data/db.js";

const router = express.Router();

/* const { APP_PORT, APP_URI } = process.env;
const url = `${APP_URI}${APP_PORT ? "" + APP_PORT : ""}`; */

router.get("", (req, res) => {
  const sql = `SELECT * FROM movies`;

  connection.query(sql, (err, results) => {
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
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
});

export { router };
