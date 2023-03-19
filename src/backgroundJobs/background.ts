chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.action === 'getLocalStorage') {
            chrome.storage.local.get(request.key, (data) => {
                sendResponse(data[request.key])
            })
        } else if (request.action === 'setLocalStorage') {
            chrome.storage.local.set(
                { [request.key]: request.value },
                () => {
                    sendResponse('done')
                }
            )
        }
        // Important: Return true to indicate that the sendResponse method will be called asynchronously
        return true
    }
)

export {}
