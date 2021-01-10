var to_send = document.getElementById("base_content").outerHTML

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        switch (message.type) {
            case "getHTML":
                sendResponse(to_send);
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);