let filterText = document.getElementById("filterText");
let filterActiveDisplay = document.getElementById("filterActiveDisplay");
let filterActive = document.getElementById("filterActive");
let saveButton = document.getElementById("saveButton");

chrome.storage.local.get("filter", function (data) {
    filterText.value = data.filter;
    filterActiveDisplay.innerText = `Filter Active: ${data.filterActive}`;
    console.log(data);
});

saveButton.onclick = function (element) {
    chrome.storage.local.set({ "filterActive": filterActive.checked }, function () {
    });
    chrome.storage.local.set({ "filter": filterText.value }, function () {
        location.reload();
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: "location.reload();"
        });
    });
};