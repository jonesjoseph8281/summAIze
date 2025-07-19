let selectedText = "";

document.addEventListener("mouseup", (event) => {
  const text = window.getSelection().toString().trim();
  if (text) {
    selectedText = text;
    window.getSelection().removeAllRanges(); // Deselect the text immediately
    showFloatingButtons(event);
  }
});

function showFloatingButtons(event) {
  // Remove existing buttons
  const old = document.getElementById("floating-buttons-container");
  if (old) old.remove();

  const container = document.createElement("div");
  container.id = "floating-buttons-container";
  // Try to use fixed positioning for reliability
  container.style.position = "fixed";
  container.style.top = `${event.clientY + 10}px`;
  container.style.left = `${event.clientX}px`;
  container.style.zIndex = "2147483647"; // Maximum z-index
  container.style.display = "flex";
  container.style.gap = "5px";
  container.style.background = "white";
  container.style.padding = "5px";
  container.style.borderRadius = "6px";
  container.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";

  const style = {
    padding: "5px 10px",
    fontSize: "12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#fff"
  };

  const buttons = [
    { label: "Summarize", color: "#4285f4" },
    { label: "Explain", color: "#34a853" },
    { label: "Convert to Voice", color: "#ea4335" }
  ];

  buttons.forEach(btn => {
    const b = document.createElement("button");
    b.innerText = btn.label;
    Object.assign(b.style, style, { backgroundColor: btn.color });
    b.onmousedown = (e) => { // Use onmousedown instead of onclick
      e.preventDefault();
      e.stopPropagation();
      if (btn.label === "Summarize") {
        b.style.backgroundColor = "yellow";
        console.log("Summarize button clicked");
        showDialog("Summarize", "helloo", container);
      } else {
        console.log(`${btn.label} button clicked`);
        // Do nothing for other buttons
      }
    };
    container.appendChild(b);
  });

  document.body.appendChild(container);

  setTimeout(() => {
    if (container && container.parentNode) container.remove();
  }, 6000);
}

function showDialog(title, message, container) {
  const oldDialog = document.getElementById("floating-dialog");
  const oldOverlay = document.getElementById("floating-overlay");
  if (oldDialog) oldDialog.remove();
  if (oldOverlay) oldOverlay.remove();

  const overlay = document.createElement("div");
  overlay.id = "floating-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0, 0, 0, 0.3)";
  overlay.style.zIndex = "9998";

  const dialog = document.createElement("div");
  dialog.id = "floating-dialog";
  dialog.style.position = "fixed";
  dialog.style.top = "50%";
  dialog.style.left = "50%";
  dialog.style.transform = "translate(-50%, -50%)";
  dialog.style.background = "#fff";
  dialog.style.padding = "20px";
  dialog.style.borderRadius = "10px";
  dialog.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
  dialog.style.zIndex = "9999";

  const titleElem = document.createElement("h3");
  titleElem.textContent = title;
  const msgElem = document.createElement("p");
  msgElem.textContent = message;

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "Close";
  closeBtn.style.marginTop = "10px";
  closeBtn.style.padding = "6px 12px";
  closeBtn.style.border = "none";
  closeBtn.style.borderRadius = "4px";
  closeBtn.style.backgroundColor = "#4285f4";
  closeBtn.style.color = "white";
  closeBtn.style.cursor = "pointer";
  closeBtn.onclick = () => {
    dialog.remove();
    overlay.remove();
    if (container && container.parentNode) container.remove();
  };

  dialog.appendChild(titleElem);
  dialog.appendChild(msgElem);
  dialog.appendChild(closeBtn);
  document.body.appendChild(overlay);
  document.body.appendChild(dialog);
}