let filterText = document.getElementById("filterText")
let filterActiveDisplay = document.getElementById("filterActiveDisplay")
let filterActive = document.getElementById("filterActive")
let saveButton = document.getElementById("saveButton")

chrome.storage.local.get("branchFilter", function (data) {
    filterText.value = data.branchFilter
    filterActiveDisplay.innerText = `Filter Active: ${data.filterActive}`
})

saveButton.onclick = function (element) {
    chrome.storage.local.set({ "filterActive": filterActive.checked }, function () {})
    chrome.storage.local.set({ "branchFilter": filterText.value }, function () { location.reload() })

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: "location.reload()"
        })
    })
}