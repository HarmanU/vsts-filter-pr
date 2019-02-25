console.log("Site is VSTS Pull Requests")

var pullRequests = document.getElementsByClassName("ms-List-cell");
var branchFilter = ''
var titleFilter = ''
var filterActive = false
var pagesToLoad = 1

chrome.storage.local.get('branchFilter', function (data) {
  branchFilter = data.branchFilter;
})

chrome.storage.local.get('titleFilter', function (data) {
  titleFilter = data.titleFilter;
})

// chrome.storage.local.get('pagesToLoad', function (data) {
//   pagesToLoad = data.pagesToLoad;
// })

chrome.storage.local.get('active', function (data) {
    filterActive = data.active;
})

setTimeout(function() {  
  if (filterActive && (branchFilter !== '' || titleFilter !== '')) {
    // while(pullRequests.length <= (pagesToLoad * 50)) {
    //   let showmoreButton = document.getElementsByClassName('vc-pullrequest-showmore-link').item(0)
    //   if (showmoreButton == null || showmoreButton == 'undefined') {
    //     continue
    //   } else {
    //     pullRequests = document.getElementsByClassName("ms-List-cell")
    //   }
    // }
    let nodesToHide = []
    let nodesToShow = []

    for (let item of pullRequests) {

      if (branchFilter !== '') {
        let branchName = item
          .getElementsByClassName('vc-pullrequest-detail-branch-name')
          .item(0).textContent

        if (branchName !== branchFilter) {
          nodesToHide.push(item)
        } else {
          nodesToShow.push(item)
        }
      }

      if (titleFilter !== '') {
        let titleName = item
          .getElementsByClassName('ms-Link primary-text')
          .item(0)
          .firstChild.textContent.toLowerCase()
        let filterText = titleFilter.toLowerCase().trim()
  
        let match = titleName.split(' ').includes(filterText)

        if (match) {
          nodesToShow.push(item)
        } else {
          nodesToHide.push(item)
        }

      }
    }

    nodesToHide.forEach(element => {
      element.className += " hide";
    });

    // add alert to body
    let body = document.getElementsByTagName("body").item(0)
    let alert = document.createElement("DIV")
    alert.className += "alert";
    let branchBannerText = `branch name "${branchFilter}"`
    let titleBannerText = `${branchFilter !== '' ? ' and ' : ''}title name "${titleFilter}"`
    alert.textContent = `Filtering pull requests by ${branchFilter !== '' ? branchBannerText : ''}${titleFilter !== '' ? titleBannerText : ''}`
    body.appendChild(alert);
    document
      .getElementsByClassName("full-size")
      .item(0).classList += " padTop"
    }
}, 3000);
