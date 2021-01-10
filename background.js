
chrome.runtime.onInstalled.addListener(function () {

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: 'developer.chrome.com'}
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: 'leetcode.com'}
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

});

//
//
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//    chrome.tabs.executeScript(null,{file:"content.js"});
// });