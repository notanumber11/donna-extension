import Tab = chrome.tabs.Tab;
import TabChangeInfo = chrome.tabs.TabChangeInfo;

export {}; // https://bobbyhadz.com/blog/typescript-cannot-be-compiled-under-isolatedmodules

chrome.runtime.onInstalled.addListener(function () {
  console.log("The extension has been installed");
  chrome.contextMenus.create({
    title: 'Search Google for "%s"',
    contexts: ["selection"],
    id: "myContextMenuId",
  });
});

chrome.tabs.onUpdated.addListener(
  (tabId: number, changeInfo: TabChangeInfo, tab: Tab) => {
    console.log("Start chrome.tabs.onUpdated...");
    console.log("Finish chrome.tabs.onUpdated...");
  }
);

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  console.log("Start chrome.contextMenus.onClicked.addListener...");
  const selecteText = info.selectionText != undefined ? info.selectionText : "";
  console.log("The selected text is: " + selecteText);

  if (!tab?.id) {
    console.error("Tab id is null. Background can not send message");
    return;
  }

  chrome.tabs.sendMessage(
    tab.id,
    { selectedText: selecteText },
    function (response) {
      console.log(response.status);
    }
  );

  console.log("Finish chrome.contextMenus.onClicked.addListener...");
});
