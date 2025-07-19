// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "summarize") {
      // Store the text to summarize
      chrome.storage.local.set({ textToSummarize: request.text });
      
      // Open the popup (this might not work in all Chrome versions)
      chrome.action.openPopup();
      
      // Alternatively, you can send a message to the popup
      // chrome.runtime.sendMessage({ action: "newText", text: request.text });
    }
  });