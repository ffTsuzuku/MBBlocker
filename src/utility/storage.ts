import { isBlockedSite } from './tabs'

const dataKey = 'MbBlock'

type site = {
    domain: string
    path: string
}
type extensionData = {
    list: site[]
}

const getExtensionData = async (): Promise<extensionData> => {
    return (await chrome.storage.local.get(dataKey))[dataKey]
}

const getSiteStatus = async (href: site): Promise<boolean> => {
    const { list = [] } = (await getExtensionData()) ?? {}

    return isBlockedSite(href.domain + href.path, list)
}

const addSiteToBlackList = async (site: site) => {
    const extensionData = (await getExtensionData()) ?? {
        list: [],
    }
    const { list } = extensionData
    list.push(site)
    chrome.storage.local.set({
        MbBlock: extensionData,
    })
}

const removeSiteFromBlackList = async (site: site): Promise<true> => {
    const extensionData = (await getExtensionData()) ?? {
        list: {},
    }
    let { list } = extensionData
    list = list.filter((blockedSite) => {
        const sameDomain = blockedSite.domain === site.domain
        const samePath = blockedSite.path === site.path

        return sameDomain && samePath ? false : true
    })
    chrome.storage.local.set({
        MbBlock: extensionData,
    })
    return true
}

export {
    getSiteStatus,
    dataKey,
    addSiteToBlackList,
    getExtensionData,
    removeSiteFromBlackList,
}

export type { extensionData, site }
