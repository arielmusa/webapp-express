import express from "express";
import "dotenv/config";
import { connection } from "../data/db.js";
import { index, show } from "../controllers/moviesController.js";

const router = express.Router();

/* const { APP_PORT, APP_URI } = process.env;
const url = `${APP_URI}${APP_PORT ? "" + APP_PORT : ""}`; */

router.get("", index);

router.get("/:id", show);

export { router };
