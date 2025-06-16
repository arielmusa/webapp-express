import express from "express";
import "dotenv/config";
import { connection } from "../data/db.js";

const router = express.Router();

const { APP_PORT, APP_URI } = process.env;

const url = `${APP_URI}${APP_PORT ? "" + APP_PORT : ""}`;

router.get("", (req, res) => {
  const sql = `SELECT * FROM movies`;

  connection.query(sql, (err, results) => {
    res.json(results);
  });
});

export { router };
