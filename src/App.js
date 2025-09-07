import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import One from "./components/one.jsx";
import Landing from "./components/Landing.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/1" element={<One />} />
          <Route path="/" element={<Landing />} />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
