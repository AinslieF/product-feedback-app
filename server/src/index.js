import express from "express";
import pg from "pg";
import config from "./config.js";

// connect to database
const db = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: true,
});

// create server
const app = express();

// allow JSON
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// run server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});