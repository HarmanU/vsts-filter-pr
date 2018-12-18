console.log("Site is Rimilia VSTS Pull Requests")

var pullRequests = document.getElementsByClassName("ms-List-cell");
var filter = "";
var filterActive = false;

chrome.storage.local.get('filter', function (data) {
    filter = data.filter;
});

chrome.storage.local.get('active', function (data) {
    filterActive = data.active;
    console.log(filterActive);
    
});

setTimeout(function() {
    if (filterActive) {
      let nodesToHide = [];
      let nodesToShow = [];

      for (let item of pullRequests) {
        let branchName = item
          .getElementsByClassName("vc-pullrequest-detail-branch-name")
          .item(0).textContent;

        if (branchName !== filter) {
          nodesToHide.push(item);
        } else {
          nodesToShow.push(item);
        }
      }

      nodesToHide.forEach(element => {
        element.className += " hide";
      });

      // add alert to body
      let body = document.getElementsByTagName("body").item(0);
      let alert = document.createElement("DIV");
      alert.className += "alert";
      alert.textContent = "Filtering is ON!";
      body.appendChild(alert);
      document
        .getElementsByClassName("full-size")
        .item(0).classList += " padTop";
    }
}, 2000);
