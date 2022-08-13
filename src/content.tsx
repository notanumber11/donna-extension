import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootDivElement = document.createElement("div");
rootDivElement.id = "crx-root";
document.body.append(rootDivElement);
const root = createRoot(rootDivElement as HTMLDivElement);

console.log("Start content.tsx");

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log("End content.tsx");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Start receiving a message");
  if (request.selectedText) {
    console.log(
      "Content.tsx has received selectedText=" + request.selectedText
    );
    sendResponse({ status: "messageReceived" });
  }
  sendResponse({ status: "problem receiving message" });
  console.log("Finish receiving a message");
});
