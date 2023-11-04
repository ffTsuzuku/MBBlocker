import { extensionData, site } from '../utility/storage'
//import { isBlockedSite } from '../utility/tabs'

chrome.runtime.sendMessage(
    { action: 'getLocalStorage', key: 'MbBlock' },
    (response) => {
        const { list } = (response ?? {}) as extensionData
        const blocked = isBlockedSite(window.location.href, list)

        console.log({
            blocked,
        })
        // console.log('list', list)
        if (blocked) {
            window.location.href = chrome.runtime.getURL('../block.html')
        }
    }
)

function isBlockedSite(url: string, blockedSites: site[]) {
    const parsedUrl = new URL(url)

    for (const blockedSite of blockedSites) {
        const { domain, path } = blockedSite

        const normalizedDomain = normalizeDomain(parsedUrl.hostname)
        const normalizedBlockedDomain = normalizeDomain(domain)

        const isSameDomain = normalizedDomain === normalizedBlockedDomain
        const isSamePath = parsedUrl.pathname.startsWith(path)

        console.log({
            domain,
            domainPath: path,
            url,
            urlPath: parsedUrl.pathname,
            isSameDomain,
            isSamePath,
            blockedSite,
        })
        if (isSameDomain && isSamePath) {
            return true
        }
    }

    return false
}

function normalizeDomain(domain: string): string {
    // Remove "http://" or "https://" prefixes and convert to lowercase
    return domain.replace(/^(https?:\/\/)?(www\.)?/i, '').toLowerCase()
}

export {}
