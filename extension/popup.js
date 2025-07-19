document.getElementById('summarize').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getSelection" }, (response) => {
      if (response && response.text) {
        document.getElementById('summary').textContent = "Processing...";
        // In a real app, you would send this to your summarization API
        // For now, we'll just show a shortened version
        setTimeout(() => {
          document.getElementById('summary').textContent = 
            response.text.substring(0, 100) + "... [Summary would appear here]";
        }, 500);
      }
    });
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    document.getElementById('summary').textContent = "Processing...";
    // This is where you'd normally call your summarization API
    setTimeout(() => {
      document.getElementById('summary').textContent = 
        request.text.substring(0, 100) + "... [Summary would appear here]";
    }, 500);
  }
});