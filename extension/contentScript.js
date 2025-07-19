// Track selected text
let selectedText = "";

// Listen for selection events
document.addEventListener("mouseup", (event) => {
  const text = window.getSelection().toString().trim();
  if (text) {
    selectedText = text;
    showFloatingButtons(event);
  }
});

// Create floating buttons container
function showFloatingButtons(event) {
  // Remove existing buttons if any
  const existingContainer = document.getElementById(
    "floating-buttons-container"
  );
  if (existingContainer) existingContainer.remove();

  // Create container for buttons
  const container = document.createElement("div");
  container.id = "floating-buttons-container";
  container.style.position = "absolute";
  container.style.top = `${event.pageY + 10}px`;
  container.style.left = `${event.pageX}px`;
  container.style.zIndex = "9999";
  container.style.display = "flex";
  container.style.gap = "5px";
  container.style.backgroundColor = "white";
  container.style.padding = "5px";
  container.style.borderRadius = "4px";
  container.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

  // Button styles
  const buttonStyle = {
    padding: "5px 8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    color: "white",
    fontSize: "12px",
  };

  // Summarize Button (Blue)
  const summarizeBtn = document.createElement("button");
  summarizeBtn.textContent = "Summarize";
  Object.assign(summarizeBtn.style, buttonStyle, {
    backgroundColor: "#4285f4",
  });
  summarizeBtn.addEventListener("click", () => {
    console.log("Summarizing:");
    showDialog("Summarize", "Summarizing your selected text...");
    chrome.runtime.sendMessage(
      {
        action: "processText",
        type: "summarize",
        text: selectedText,
      },
      (response) => {
        console.log("Background response:", response);
      }
    );
    container.remove();
  });

  // Explain Button (Green)
  const explainBtn = document.createElement("button");
  explainBtn.textContent = "Explain";
  Object.assign(explainBtn.style, buttonStyle, {
    backgroundColor: "#34a853",
  });
  explainBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({
      action: "processText",
      type: "explain",
      text: selectedText,
    });
    container.remove();
  });

  // Convert to Voice Button (Red)
  const voiceBtn = document.createElement("button");
  voiceBtn.textContent = "Convert to Voice";
  Object.assign(voiceBtn.style, buttonStyle, {
    backgroundColor: "#ea4335",
  });
  voiceBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({
      action: "processText",
      type: "voice",
      text: selectedText,
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

// Dialog box function
function showDialog(title, message) {
  // Remove existing dialog if any
  const existingDialog = document.getElementById("summAIze-dialog");
  if (existingDialog) existingDialog.remove();
  const existingOverlay = document.getElementById("summAIze-dialog-overlay");
  if (existingOverlay) existingOverlay.remove();

  // Overlay
  const overlay = document.createElement("div");
  overlay.id = "summAIze-dialog-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0,0,0,0.3)";
  overlay.style.zIndex = "10000";

  // Dialog
  const dialog = document.createElement("div");
  dialog.id = "summAIze-dialog";
  dialog.style.position = "fixed";
  dialog.style.top = "50%";
  dialog.style.left = "50%";
  dialog.style.transform = "translate(-50%, -50%)";
  dialog.style.background = "white";
  dialog.style.padding = "24px 32px";
  dialog.style.borderRadius = "8px";
  dialog.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
  dialog.style.zIndex = "10001";
  dialog.style.minWidth = "300px";

  // Title
  const titleElem = document.createElement("h3");
  titleElem.textContent = title;
  titleElem.style.marginTop = "0";

  // Message
  const messageElem = document.createElement("div");
  messageElem.textContent = message;
  messageElem.style.margin = "16px 0";

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.style.marginTop = "12px";
  closeBtn.style.padding = "6px 16px";
  closeBtn.style.background = "#4285f4";
  closeBtn.style.color = "white";
  closeBtn.style.border = "none";
  closeBtn.style.borderRadius = "4px";
  closeBtn.style.cursor = "pointer";
  closeBtn.onclick = () => {
    overlay.remove();
    dialog.remove();
  };

  dialog.appendChild(titleElem);
  dialog.appendChild(messageElem);
  dialog.appendChild(closeBtn);

  document.body.appendChild(overlay);
  document.body.appendChild(dialog);
}
