// send the webpage url as a response to the extension request
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "hello") {
            sendResponse({ "url": document.location.href });
        }
    }
);