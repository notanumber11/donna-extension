import React from "react";
import { createRoot } from "react-dom/client";

import PopUp from "@/components/Popup";

const rootDivElement = document.createElement("div");
rootDivElement.id = "default-pop-up";
document.body.append(rootDivElement);
const root = createRoot(rootDivElement as HTMLDivElement);

console.log("Start main.tsx");
root.render(
  <React.StrictMode>
    <PopUp selectedText={""} closeCallback={() => window.close()} />
  </React.StrictMode>
);
console.log("Finish main.tsx");
