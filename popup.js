let branchFilterText = document.getElementById("branchFilterText")
let titleFilterText = document.getElementById("titleFilterText")

let filterActiveDisplay = document.getElementById("filterActiveDisplay")
let filterActive = document.getElementById("filterActive")
let saveButton = document.getElementById("saveButton")

chrome.storage.local.get("branchFilter", function (data) { branchFilterText.value = data.branchFilter })
chrome.storage.local.get("titleFilter", function (data) { titleFilterText.value = data.titleFilter })
chrome.storage.local.get("active", function (data) { filterActive.checked = data.active })

saveButton.onclick = function(element) {
    chrome.storage.local.set({ "active": filterActive.checked }, function () { });
    chrome.storage.local.set({ "branchFilter": branchFilterText.value }, function () { })
    chrome.storage.local.set({ "titleFilter": titleFilterText.value }, function () { })

    setTimeout(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                method: 'refreshResults',
                params: {
                    active: filterActive.checked,
                    branchFilter: branchFilterText.value,
                    titleFilter: titleFilterText.value
                }
            }, function (response) {})
        })
    }, 500)
}