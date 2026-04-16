import { useState } from "react";

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
    <section>
      <h1>Add Feedback</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Feedback title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <textarea
          name="description"
          placeholder="Feedback detail"
          value={formData.description}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </section>
  );
}

export default AddFeedback;