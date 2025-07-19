// Listen for text selection events
document.addEventListener('mouseup', function() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      showSummarizeButton(selectedText);
    }
  });
  
  // Listen for copy events
  document.addEventListener('copy', function() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      showSummarizeButton(selectedText);
    }
  });
  
  // Function to show the summarize button
  function showSummarizeButton(selectedText) {
    // Remove any existing button first
    const existingButton = document.getElementById('summarize-button');
    if (existingButton) existingButton.remove();
  
    // Get the position of the selected text
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
  
    // Create the button
    const button = document.createElement('button');
    button.id = 'summarize-button';
    button.textContent = 'Summarize';
    button.style.position = 'fixed';
    button.style.left = `${rect.right + window.scrollX + 10}px`;
    button.style.top = `${rect.top + window.scrollY}px`;
    button.style.zIndex = '9999';
    button.style.padding = '5px 10px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
  
    // Add click event to the button
    button.addEventListener('click', function() {
      // Send the selected text to the background script
      chrome.runtime.sendMessage({
        action: "summarize",
        text: selectedText
      });
    });
  
    // Add the button to the page
    document.body.appendChild(button);
  }