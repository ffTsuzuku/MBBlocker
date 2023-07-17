import { site } from './storage'
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

function isBlockedSite(url: string, blockedSites: site[]) {
    const parsedUrl = new URL(url)

    for (const blockedSite of blockedSites) {
        const { domain, path } = blockedSite

        const isSameDomain = parsedUrl.hostname.includes(domain)
        const isSamePath = parsedUrl.pathname.startsWith(path)

        if (isSameDomain && isSamePath) {
            return true
        }
    }

    return false
}

function urlToSiteRecord

export { getActiveTabUrl, isBlockedSite }
