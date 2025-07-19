// Track selected text
let selectedText = '';

// Listen for mouse up events (when selection ends)
document.addEventListener('mouseup', (event) => {
  const text = window.getSelection().toString().trim();
  if (text) {
    selectedText = text;
    showFloatingButton(event);
  }
});

// Listen for copy events (alternative selection method)
document.addEventListener('copy', () => {
  setTimeout(() => {
    navigator.clipboard.readText().then(text => {
      if (text.trim()) {
        selectedText = text.trim();
        // You might want to show the button here too
      }
    });
  }, 100);
});

// Show floating button near selection
function showFloatingButton(event) {
  // Remove existing button if any
  const existingButton = document.getElementById('floating-summarize');
  if (existingButton) existingButton.remove();

  // Create new button
  const button = document.createElement('button');
  button.id = 'floating-summarize';
  button.textContent = 'Summarize';
  button.style.position = 'absolute';
  button.style.top = `${event.pageY + 10}px`;
  button.style.left = `${event.pageX}px`;
  button.style.zIndex = '9999';
  button.style.padding = '5px';
  button.style.backgroundColor = '#4285f4';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '4px';
  button.style.cursor = 'pointer';

  // Add click handler
  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "summarize", text: selectedText });
    button.remove();
  });

  document.body.appendChild(button);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(button)) {
      button.remove();
    }
  }, 5000);
}
// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelection") {
    sendResponse({ text: window.getSelection().toString().trim() });
  }
  return true; // Required for async response
});