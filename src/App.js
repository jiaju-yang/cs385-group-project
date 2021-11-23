import SearchView from "./search/SearchView"
import IntakeView from './intake/IntakeView';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./Navigation";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/search" />}
          />
          <Route path="/search" element={<SearchView />} />
          <Route path="/intake" element={<IntakeView />} />
        </Routes>
        <Navigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
