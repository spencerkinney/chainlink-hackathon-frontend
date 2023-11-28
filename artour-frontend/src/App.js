import React, {useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SceneTemplate } from "./components/SceneTemplate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SceneTemplate />} />
      </Routes>
    </Router>
  );
}
export default App;