chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'modelCopied') {
    const tabId = sender.tab.id;

    chrome.action.setBadgeText({ tabId, text: '✔️' });
    chrome.action.setBadgeBackgroundColor({ tabId, color: '#4caf50' });

    setTimeout(() => {
      chrome.action.setBadgeText({ tabId, text: '' });
    }, 2000);
  }
});
