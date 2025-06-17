import express from "express";
import "dotenv/config";
import "./data/db.js";
import cors from "cors";
import { router } from "./routers/moviesRouter.js";
const app = express();

const { APP_PORT, APP_URI } = process.env;

const url = `${APP_URI}${APP_PORT ? ":" + APP_PORT : ""}`;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/movies", router);

app.listen(3000, () => {
  console.log(`Listening ${url}`);
});
