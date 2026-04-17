import express from "express";
import pg from "pg";
import config from "./config.js";

// connects to the database
const db = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: true,
});

// creates server
const app = express();

// allows JSON
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// gets all suggestions
async function getAllSuggestions() {
  const result = await db.query("SELECT * FROM suggestions;");
  return result.rows;
}

// gets suggestions by category
async function getSuggestionsByCategory(category) {
  const result = await db.query(
    "SELECT * FROM suggestions WHERE category = $1;",
    [category]
  );
  return result.rows;
}

// adds one suggestion
async function addOneSuggestion(title, description, category) {
  const result = await db.query(
    `INSERT INTO suggestions (title, description, category)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [title, description, category]
  );
  return result.rows[0];
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// GET all suggestions
app.get("/get-all-suggestions", async (req, res) => {
  const suggestions = await getAllSuggestions();
  res.json(suggestions);
});

// GET suggestions by category
app.get("/get-suggestions-by-category/:category", async (req, res) => {
  const category = req.params.category;
  const suggestions = await getSuggestionsByCategory(category);
  res.json(suggestions);
});

// POST add one suggestion
app.post("/add-one-suggestion", async (req, res) => {
  const { title, description, category } = req.body;

  const suggestion = await addOneSuggestion(title, description, category);

  res.send(`Success! ${suggestion.title} was added.`);
});

// runs server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});