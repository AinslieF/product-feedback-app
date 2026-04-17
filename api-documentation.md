# 📘 Product Feedback API Documentation

Base URL: `https://ainslie-product-feedback-app.onrender.com`

## Overview

| Resource         | Method | Endpoint                      | Description                              |
|------------------|--------|-------------------------------|------------------------------------------|
| `suggestions`    | GET    | /get-all-suggestions          | Returns all suggestions from the database              |
| `suggestions`    | GET    | /get-suggestions-by-category  | Returns suggestions filtered by category             |
| `suggestions`    | POST   | /add-one-suggestion           | Adds a new suggestion to the database              |

---

### 🔹 GET `/get-all-suggestions`

**Description:** Returns all suggestions from the database.

**Example Response:**

```json
[
  {
    "id": 1,
    "title": "Add dark mode",
    "description": "It would help people who prefer dark mode.",
    "category": "Feature"
  },
  {
    "id": 2,
    "title": "Improve loading speed",
    "description": "The app should load faster.",
    "category": "UX"
  }
]
```

---

### 🔹 GET `/get-suggestions-by-category/:category`

**Description:** Returns suggestions filtered by a specific category.

**Example Response:**

```json
[
  {
    "id": 1,
    "title": "Add dark mode",
    "description": "It would help people who prefer dark mode.",
    "category": "Feature"
  }
]
```

---

### 🔹 POST `/add-one-suggestion`

**Description:** Adds a new suggestion to the database.

**Example Request Body:**

```json
{
  "title": "Add notifications",
  "description": "Users want notifications.",
  "category": "Enhancement"
}
```

**Example Response:**

```text
Suggestion added successfully
```
---

