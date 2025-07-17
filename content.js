(function () {
  function extractModelNumber() {
    const labelSelectors = [
      'div:contains("Model #")',
      'span:contains("Model #")'
    ];

    // More robust method for Lowes' product pages
    const possibleText = document.body.innerText.match(/Model\s*#\s*[:\-]?\s*(\S+)/i);
    if (possibleText && possibleText[1]) {
      return possibleText[1].trim();
    }

    // Try to find via structured layout
    const labels = Array.from(document.querySelectorAll('div, span, td'));
    for (const el of labels) {
      if (el.textContent.includes('Model #')) {
        const sibling = el.nextElementSibling;
        if (sibling) {
          return sibling.textContent.trim();
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
