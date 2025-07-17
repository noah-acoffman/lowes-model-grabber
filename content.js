(function () {
  function extractModelNumber() {
    const bodyText = document.body.innerText;
    const modelMatch = bodyText.match(/Model\s*#\s*([^\n|]+)/i);
    if (modelMatch && modelMatch[1]) {
      return modelMatch[1].trim();
    }

    // Fallback: try DOM-based search
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
      alert(`Copied Model Number: ${modelNumber}`);
    }).catch((err) => {
      alert('Failed to copy Model Number');
      console.error(err);
    });
  } else {
    alert('Model Number not found on this page');
  }
})();
