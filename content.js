(function () {
  function extractModelNumber() {
    const bodyText = document.body.innerText;
    const modelMatch = bodyText.match(/Model\s*#\s*([^\n|]+)/i);
    if (modelMatch && modelMatch[1]) {
      return modelMatch[1].trim();
    }

    const spans = document.querySelectorAll('span, div, td');
    for (const el of spans) {
      if (el.textContent.includes('Model #')) {
        const text = el.textContent.trim();
        const fallbackMatch = text.match(/Model\s*#\s*([^\n|]+)/i);
        if (fallbackMatch && fallbackMatch[1]) {
          return fallbackMatch[1].trim();
        }
      }
    }

    return null;
  }

  const modelNumber = extractModelNumber();
  if (modelNumber) {
    navigator.clipboard.writeText(modelNumber).then(() => {
      chrome.runtime.sendMessage({ type: 'modelCopied' });
    }).catch((err) => {
      console.error('Failed to copy model number:', err);
    });
  } else {
    console.warn('Model Number not found on this page');
  }
})();
