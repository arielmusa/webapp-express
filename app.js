import express from "express";
import "dotenv/config";
import "./data/db.js";
import { router } from "./routers/movies.js";
const app = express();

const { APP_PORT, APP_URI } = process.env;

const url = `${APP_URI}${APP_PORT ? ":" + APP_PORT : ""}`;

app.use("/movies", router);

app.listen(3000, () => {
  console.log(`Listening ${url}`);
});
