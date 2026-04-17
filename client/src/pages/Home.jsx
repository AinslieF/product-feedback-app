import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // gets all suggestions from the backend
  async function getAllSuggestions() {
    const response = await fetch("/api/get-all-suggestions");
    const data = await response.json();
    setSuggestions(data);
  }

  // gets suggestions by category from the backend
  async function getSuggestionsByCategory(category) {
    const response = await fetch(
      `/api/get-suggestions-by-category/${category}`
    );
    const data = await response.json();
    setSuggestions(data);
  }

  // runs when the page loads
  useEffect(() => {
    getAllSuggestions();
  }, []);

  // handles clicking category buttons
  function handleCategoryClick(category) {
    setSelectedCategory(category);

    if (category === "All") {
      getAllSuggestions();
    } else {
      getSuggestionsByCategory(category);
    }
  }

  return (
    <section className="home-layout">
      <aside className="sidebar">
        <div className="brand-box">
          <h2>My Company</h2>
          <p>Feedback board</p>
        </div>

        <div className="filter-panel">
          <button
            className={selectedCategory === "All" ? "active-filter" : ""}
            onClick={() => handleCategoryClick("All")}
          >
            All
          </button>
          <button
            className={selectedCategory === "UI" ? "active-filter" : ""}
            onClick={() => handleCategoryClick("UI")}
          >
            UI
          </button>
          <button
            className={selectedCategory === "UX" ? "active-filter" : ""}
            onClick={() => handleCategoryClick("UX")}
          >
            UX
          </button>
          <button
            className={selectedCategory === "Enhancement" ? "active-filter" : ""}
            onClick={() => handleCategoryClick("Enhancement")}
          >
            Enhancement
          </button>
          <button
            className={selectedCategory === "Bug" ? "active-filter" : ""}
            onClick={() => handleCategoryClick("Bug")}
          >
            Bug
          </button>
          <button
            className={selectedCategory === "Feature" ? "active-filter" : ""}
            onClick={() => handleCategoryClick("Feature")}
          >
            Feature
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <p className="suggestion-count">{suggestions.length} suggestions</p>
          <Link className="add-feedback-link" to="/add-feedback">
            + Add Feedback
          </Link>
        </div>

        {suggestions.length === 0 ? (
          <p className="empty-message">There is no feedback.</p>
        ) : (
          suggestions.map((suggestion) => (
            <div className="suggestion-card" key={suggestion.id}>
              <h2>{suggestion.title}</h2>
              <p>{suggestion.description}</p>
              <p className="category-tag">{suggestion.category}</p>
            </div>
          ))
        )}
      </main>
    </section>
  );
}

export default Home;