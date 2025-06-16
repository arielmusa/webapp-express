import express from "express";
import "dotenv/config";
import "./data/db.js";
const app = express();

app.listen(3000, () => {
  console.log(`Listening http://localhost:3000`);
});
