# Plover URL Shusher (for Chromium)
Full disclosure: ChatGPT made this for me after one prompt.

When you begin typing into Chromium's URL bar, it fills in the rest of the search with a search suggestion from previous searches and visited URLs, so you can hit Enter to use that suggestion. It selects the part it filled in, too, so that if you keep typing, you immediately overwrite it.

This works fine with steno, if you write all one-stroke words, like "how do I play poker" (HOU/TKOEU/PHRAEU/POERBG). If your word is two or more strokes, however, and requires the first stroke to be deleted—like if you write "stenography" as STPHOG/TPEU, which outputs "snog" on the first stroke, then deletes that and outputs "stenography" on the second—the issue is that Plover sends out one too few backspaces, because the first one only takes out the selected text. So, if you stroke STPHOG, and it writes "snog", and Chromium fills in "snog[ging at work]", then when you stroke TPEU, it leaves you with "sstenography". It's a minor annoyance, but I'm tired of it. ChatGPT fixed it for me tonight, to my satsification.

## Usage
Just follow ChatGPT's usage instructions in the chat transcript below.

## Installation Instructions
Just follow ChatGPT's install info in the chat transcript below.

## ChatGPT's Solution
For posterity, here's my question (with typo), and ChatGPT's solution.
I changed its "x" keyword to "shh", which I write with the chord SH:
```
Me:
Write me an extension for Chromium for Linux that lets
me, from the URL bar, write something (a word, or a
modifier+letter) turn off autocomplete and suggestions in
the URL bar.
```
ChatGPT:

Here's a minimal, clean Chromium extension for Linux that allows you to disable autocomplete and suggestions in the URL bar dynamically using a keyword or modifier+letter. This approach leverages Chromium's built-in Omnibox API.
```
// manifest.json
{
  "manifest_version": 3,
  "name": "Disable Omnibox Autocomplete",
  "version": "1.0",
  "description": "Disables autocomplete and suggestions in the URL bar when activated via keyword.",
  "omnibox": { "keyword": "x" }, // "x" can be changed to your preferred keyword
  "permissions": ["tabs"],
  "background": {
    "service_worker": "background.js"
  }
}
```
Next, create the `background.js` file in the same directory as follows:
```
// background.js
chrome.omnibox.onInputEntered.addListener((text) => {
  const url = text.includes('://') ? text : `https://www.google.com/search?q=${encodeURIComponent(text)}`;
  chrome.tabs.update({ url });
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  // Explicitly return no suggestions to disable autocomplete.
  suggest([]);
});
```
### Installation Instructions:

1. **Save** both files (`manifest.json` and `background.js`) in a folder.
2. Go to Chromium → `chrome://extensions`
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select your extension folder.

### Usage:
* Type your chosen keyword (x, or any keyword you've set) into the URL bar followed by a space.
* Chromium autocomplete and suggestions will be disabled temporarily for whatever you type next. Press Enter to perform a basic Google search or navigate directly to the URL you've typed.

```
Me:
If I make my keyword "shh", then my query will look like
"shh whatever I search for here". Will that "shh" then be
part of my query to Google?
```
ChatGPT:

No, the keyword (`shh`) itself won't be sent as part of your search query.

For example, if your keyword is set to `shh` and you type this in your URL bar:

```shh my search query```

Then the query sent to Google will be exactly:

```my search query```
