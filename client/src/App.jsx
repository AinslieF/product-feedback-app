import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddFeedback from "./pages/AddFeedback";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-feedback">Add Feedback</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-feedback" element={<AddFeedback />} />
      </Routes>
    </>
  );
}

export default App;