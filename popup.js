let filterText = document.getElementById("filterText");
let filterActiveDisplay = document.getElementById("filterActiveDisplay");
let filterActive = document.getElementById("filterActive");
let saveButton = document.getElementById("saveButton");

chrome.storage.local.get("filter", function (data) {
    filterText.value = data.filter;
 
});

chrome.storage.local.get("active", function (data) {
    filterActive.checked = data.active;
});

saveButton.onclick = function(element) {
    chrome.storage.local.set({ "active": filterActive.checked }, function() {});
    chrome.storage.local.set({ "filter": filterText.value }, function () {
        location.reload();
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: "location.reload();"
        });
    });
};