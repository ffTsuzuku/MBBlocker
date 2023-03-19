const getActiveTabUrl = async (): Promise<string | undefined> => {
    return await new Promise((resolve) => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                // The URL of the active tab is available in the tabs array
                resolve(tabs[0].url)
            }
        )
    })
}

export { getActiveTabUrl }
