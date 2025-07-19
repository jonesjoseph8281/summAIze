// When the popup loads, check if there's text to summarize
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['textToSummarize'], function(result) {
      if (result.textToSummarize) {
        document.getElementById('status').textContent = "Text ready for summarization!";
        // Here you would typically send the text to your AI summarization API
        // For now, we'll just display the original text
        document.getElementById('summary').textContent = result.textToSummarize;
      }
    });
  });