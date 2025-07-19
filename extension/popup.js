// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "processText") {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Processing ${request.type} request...`;
    
    // In a real app, you would have different API calls for each type
    setTimeout(() => {
      let response;
      switch(request.type) {
        case "summarize":
          response = `Summary: ${request.text.substring(0, 100)}...`;
          break;
        case "explain":
          response = `Explanation: This text is about ${request.text.split(' ').length} words long.`;
          break;
        case "voice":
          response = `Voice conversion ready for: ${request.text.substring(0, 50)}...`;
          break;
        default:
          response = "Action completed";
      }
      resultDiv.textContent = response;
    }, 500);
  }
});