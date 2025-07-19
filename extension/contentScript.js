// Track selected text
let selectedText = '';

// Listen for selection events
document.addEventListener('mouseup', (event) => {
  const text = window.getSelection().toString().trim();
  if (text) {
    selectedText = text;
    showFloatingButtons(event);
  }
});

// Create floating buttons container
function showFloatingButtons(event) {
  // Remove existing buttons if any
  const existingContainer = document.getElementById('floating-buttons-container');
  if (existingContainer) existingContainer.remove();

  // Create container for buttons
  const container = document.createElement('div');
  container.id = 'floating-buttons-container';
  container.style.position = 'absolute';
  container.style.top = `${event.pageY + 10}px`;
  container.style.left = `${event.pageX}px`;
  container.style.zIndex = '9999';
  container.style.display = 'flex';
  container.style.gap = '5px';
  container.style.backgroundColor = 'white';
  container.style.padding = '5px';
  container.style.borderRadius = '4px';
  container.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

  // Button styles
  const buttonStyle = {
    padding: '5px 8px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '12px'
  };

  // Summarize Button (Blue)
  const summarizeBtn = document.createElement('button');
  summarizeBtn.textContent = 'Summarize';
  Object.assign(summarizeBtn.style, buttonStyle, {
    backgroundColor: '#4285f4'
  });
  summarizeBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ 
      action: "processText", 
      type: "summarize",
      text: selectedText 
    });
    container.remove();
  });

  // Explain Button (Green)
  const explainBtn = document.createElement('button');
  explainBtn.textContent = 'Explain';
  Object.assign(explainBtn.style, buttonStyle, {
    backgroundColor: '#34a853'
  });
  explainBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ 
      action: "processText", 
      type: "explain",
      text: selectedText 
    });
    container.remove();
  });

  // Convert to Voice Button (Red)
  const voiceBtn = document.createElement('button');
  voiceBtn.textContent = 'Convert to Voice';
  Object.assign(voiceBtn.style, buttonStyle, {
    backgroundColor: '#ea4335'
  });
  voiceBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ 
      action: "processText", 
      type: "voice",
      text: selectedText 
    });
    container.remove();
  });

  // Add buttons to container
  container.appendChild(summarizeBtn);
  container.appendChild(explainBtn);
  container.appendChild(voiceBtn);

  // Add container to document
  document.body.appendChild(container);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(container)) {
      container.remove();
    }
  }, 5000);
}