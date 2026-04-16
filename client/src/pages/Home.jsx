import { useEffect, useState } from "react";

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
    <section>
      <h1>Product Feedback</h1>

      <div>
        <button onClick={() => handleCategoryClick("All")}>All</button>
        <button onClick={() => handleCategoryClick("UI")}>UI</button>
        <button onClick={() => handleCategoryClick("UX")}>UX</button>
        <button onClick={() => handleCategoryClick("Enhancement")}>
          Enhancement
        </button>
        <button onClick={() => handleCategoryClick("Bug")}>Bug</button>
        <button onClick={() => handleCategoryClick("Feature")}>Feature</button>
      </div>

      <p>Selected category: {selectedCategory}</p>

      {suggestions.length === 0 ? (
        <p>There is no feedback.</p>
      ) : (
        suggestions.map((suggestion) => (
          <div key={suggestion.id}>
            <h2>{suggestion.title}</h2>
            <p>{suggestion.description}</p>
            <p>{suggestion.category}</p>
          </div>
        ))
      )}
    </section>
  );
}

export default Home;