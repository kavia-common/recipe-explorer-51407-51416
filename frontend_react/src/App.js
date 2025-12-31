import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";

/**
 * App router shell.
 */

// PUBLIC_INTERFACE
function App() {
  /** Main application entry component (SPA routing). */
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Keep it SPA: redirect unknown paths back to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
