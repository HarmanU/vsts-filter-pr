let branchFilterText = document.getElementById("branchFilterText");
let titleFilterText = document.getElementById("titleFilterText");
// let pagesToLoad = document.getElementById("pagesToLoad");

let filterActiveDisplay = document.getElementById("filterActiveDisplay")
let filterActive = document.getElementById("filterActive")
let saveButton = document.getElementById("saveButton")

chrome.storage.local.get("branchFilter", function (data) {
    branchFilterText.value = data.branchFilter;
})

chrome.storage.local.get("titleFilter", function (data) {
    titleFilterText.value = data.titleFilter;
})

// chrome.storage.local.get('pagesToLoad', function (data) {
//     pagesToLoad.value = data.pagesToLoad;
// })

chrome.storage.local.get("active", function (data) {
    filterActive.checked = data.active;
})

saveButton.onclick = function(element) {
    chrome.storage.local.set({ "active": filterActive.checked }, function() {});
    chrome.storage.local.set({ "branchFilter": branchFilterText.value }, function () {})
    chrome.storage.local.set({ "titleFilter": titleFilterText.value }, function () {})
    // chrome.storage.local.set({ "pagesToLoad": pagesToLoad.value }, function () { })

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: "location.reload();"
        });
    });
};