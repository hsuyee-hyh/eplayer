import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyApp from "./MyApp.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/css/main.css";

import ReactDOM from "react-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MyApp />
    </BrowserRouter>
  </React.StrictMode>
);
