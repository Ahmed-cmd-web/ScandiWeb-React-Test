/** @format */

import "./App.css";
import React, { Component } from "react";
import CategoryPage from "./Pages/CategoryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PDP from "./Pages/PDP";
import Header from "./components/Header";
import Cart from "./Pages/Cart";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/*" element={<CategoryPage />} />
          <Route path="/PDP/:ID" element={<PDP />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
