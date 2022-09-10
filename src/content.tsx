import React from "react";
import { createRoot, Root } from "react-dom/client";

import ContentScriptEntry from "@/ContentScriptEntry";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Start receiving a message");
  if (request.selectedText) {
    console.log(
      "Content.tsx has received selectedText=" + request.selectedText
    );
    sendResponse({ status: "messageReceived" });
    showPopUp(request.selectedText);
  }
  sendResponse({ status: "problem receiving message" });
  console.log("Finish receiving a message");
});

let firstTime = true;
let root: Root;

function showPopUp(selectedText: string) {
  console.log("Start showPopUp");
  if (firstTime) {
    console.log("Creating root element");
    const rootDivElement = document.createElement("div");
    rootDivElement.id = "crx-root";
    document.body.append(rootDivElement);
    root = createRoot(rootDivElement as HTMLDivElement);
    firstTime = false;
  }

  if (root) {
    console.log("Executing render");
    root.render(
      <React.StrictMode>
        <ContentScriptEntry selectedText={selectedText} />
      </React.StrictMode>
    );
  }
  console.log("Finish showPopUp");
}
