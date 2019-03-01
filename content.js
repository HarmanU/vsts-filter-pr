// console.log("Site is VSTS Pull Requests")
var pullRequests = document.getElementsByClassName("ms-List-cell")
var branchFilter = ''
var titleFilter = ''
var filterActive = false

var body = document.getElementsByTagName("body").item(0)
var alert = document.createElement("DIV")
alert.className = 'alert hide'
body.appendChild(alert)
var alertDiv = document.getElementsByClassName('alert').item(0)

chrome.storage.local.get("branchFilter", function (data) { branchFilter = data.branchFilter })
chrome.storage.local.get("titleFilter", function (data) { titleFilter = data.titleFilter })
chrome.storage.local.get("active", function (data) { filterActive = data.active })

setTimeout(() => {
  if (filterActive && (branchFilter !== '' || titleFilter !== '')) {
    let values = {
      active: filterActive,
      branchFilter: branchFilter,
      titleFilter: titleFilter
    }
  
    filter(values)
  }
}, 1000)

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // console.log('Message Recieved')
    if (request.method === 'refreshResults')
    {
      filter(request.params)
      sendResponse({ farewell: "goodbye" })
    }
  })

function filter (values) {
  branchFilter = values.branchFilter
  titleFilter = values.titleFilter
  filterActive = values.active

  // console.log('Correct Recieved')
  // console.log('active: ' + filterActive)
  // console.log('branch: ' + branchFilter)
  // console.log('title: ' + titleFilter)
  // console.log(filterActive && (branchFilter !== '' || titleFilter !== ''))

  // console.log('Running Filter')
  let nodesToHide = []
  let nodesToShow = []

  if (filterActive && (branchFilter === '' && titleFilter === '')) {
    nodesToShow = [...pullRequests]
    showAlert('Showing all Pull Requests. Turn off filter to hide this message')
  } else if (!filterActive) {
    nodesToShow = [...pullRequests]
    document.getElementsByClassName('full-size').item(0).className = 'full-size'
    alertDiv.className += ' hide'
  } else {
    for (let item of pullRequests) {
      let branchMatch = false
      let titleMatch = false

      // Branch filter
      if (branchFilter !== '') {
        let branchName = item.getElementsByClassName('vc-pullrequest-detail-branch-name').item(0).textContent.toLowerCase().trim()
        let branchFilterText = branchFilter.toLowerCase().trim()
        branchMatch = branchName.includes(branchFilterText)
      }

      // Title filter
      if (titleFilter !== '') {
        let titleName = item.getElementsByClassName('ms-Link primary-text').item(0).firstChild.textContent.toLowerCase().trim()
        let titleFilterText = titleFilter.toLowerCase().trim()
        titleMatch = titleName.includes(titleFilterText)
      }

      if (((branchFilter !== '' && titleFilter === '') && branchMatch)
        || ((branchFilter === '' && titleFilter !== '') && titleMatch)
        || ((branchFilter !== '' && titleFilter !== '') && (branchMatch && titleMatch))) {
          nodesToShow.push(item)
      } else {
        nodesToHide.push(item)
      }
    }
    
    // add alert to body
    let branchBannerText = `branch name "${branchFilter}"`
    let titleBannerText = `${branchFilter !== '' ? ' and ' : ''}title name "${titleFilter}"`
    let alertText = `Filtering pull requests by ${branchFilter !== '' ? branchBannerText : ''}${titleFilter !== '' ? titleBannerText : ''}`
    showAlert(alertText)
  }
  nodesToHide.forEach(element => {
    if (!element.className.includes('hide')) {
      element.className += " hide"
    }
  })

  nodesToShow.forEach(element => {
    if (element.className.includes('hide')) {
      element.className = element.className.substring(0, element.className.length - 4)
    }
  })
}

function showAlert (message) {
  if (!document.getElementsByClassName('full-size').item(0).className.includes('padTop')) {
    document.getElementsByClassName('full-size').item(0).className += ' padTop'
  }

  alertDiv.className = 'alert'
  alertDiv.textContent = message
}


