// background.js
chrome.omnibox.onInputEntered.addListener((text) => {
  const url = text.includes('://') ? text : `https://www.google.com/search?q=${encodeURIComponent(text)}`;
  chrome.tabs.update({ url });
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  // Explicitly return no suggestions to disable autocomplete.
  suggest([]);
});

