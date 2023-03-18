if (window.location.href.indexOf('https://www.youtube.com/') > -1) {
    window.location.href = chrome.runtime.getURL('../block.html')
}

export {}
