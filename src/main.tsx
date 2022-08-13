import "./main.css";

import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

console.log("Start main.tsx");
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log("Finish main.tsx");
