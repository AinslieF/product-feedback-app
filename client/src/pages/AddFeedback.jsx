import { useState } from "react";
import { Link } from "react-router-dom";

function AddFeedback() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // updates form data when user types
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // sends form data to backend
  async function addOneSuggestion() {
    const response = await fetch("/api/add-one-suggestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.text();
    console.log(result);
  }

  // handles form submit
  async function handleSubmit(e) {
    e.preventDefault();

    if (
      formData.title === "" ||
      formData.description === "" ||
      formData.category === ""
    ) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setErrorMessage("");

    await addOneSuggestion();

    setFormData({
      title: "",
      description: "",
      category: "",
    });
  }

  return (
    <section className="form-page">
      <Link to="/" className="back-link">
        ← Go Back
      </Link>

      <div className="form-card">
        <h1>Create New Feedback</h1>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Feedback Title</label>
            <p>Add a short, descriptive headline</p>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <p>Choose a category for your feedback</p>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select category</option>
              <option value="UI">UI</option>
              <option value="UX">UX</option>
              <option value="Enhancement">Enhancement</option>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
            </select>
          </div>

          <div className="form-group">
            <label>Feedback Detail</label>
            <p>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-buttons">
            <Link to="/" className="cancel-btn">
              Cancel
            </Link>
            <button type="submit">Add Feedback</button>
          </div>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </section>
  );
}

export default AddFeedback;