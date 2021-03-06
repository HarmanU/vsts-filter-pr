chrome.runtime.onInstalled.addListener(function () {

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
          {
            conditions: [
              new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                  urlContains:
                    "pullrequests"
                }
              })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
          }
        ])
    })
    
    chrome.storage.local.set({ "branchFilter": "" }, function() { })
    chrome.storage.local.set({ "titleFilter": "" }, function () { })
    // chrome.storage.local.set({ "pagesToLoad": 1 }, function () { })
    chrome.storage.local.set({ "active": false }, function() {})
})