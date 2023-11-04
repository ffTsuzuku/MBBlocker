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

function urlToSiteRecord(url: string): site {
    try {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url
        }
        const urlObj = new URL(url)
        return {
            domain: urlObj.host,
            path: urlObj.pathname,
        }
    } catch (e: any) {
        throw new TypeError(e)
    }
}

function siteRecordToUrl(site: site): string {
    return `${site.domain}${site.path}`
}

function createValidURL(domain: string) {
    if (!domain.startsWith('http://') && !domain.startsWith('https://')) {
        domain = 'https://' + domain
    }
    return new URL(domain)
}

export {
    getActiveTabUrl,
    isBlockedSite,
    urlToSiteRecord,
    siteRecordToUrl,
    createValidURL,
}
