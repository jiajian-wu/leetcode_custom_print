chrome.runtime.sendMessage({
    action: "getSource",
    source: document.documentElement.outerHTML
});

function onWindowLoad() {

    var message = document.querySelector('#message');

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    });

}

window.onload = onWindowLoad;