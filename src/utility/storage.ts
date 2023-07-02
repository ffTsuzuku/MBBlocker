const dataKey = 'MbBlock'

type extensionData = {
    list: { [key: string]: boolean }
}

const getExtensionData = async (): Promise<extensionData> => {
    return (await chrome.storage.local.get(dataKey))[dataKey]
}

const getSiteStatus = async (href: string): Promise<boolean> => {
    const { list = {} } = (await getExtensionData()) ?? {}

    console.log('Site status', list[href])
    return list[href]
}

const setSiteStatus = async (site: string, status: boolean) => {
    const extensionData = (await getExtensionData()) ?? {
        list: {},
    }
    const { list } = extensionData
    list[site] = status
    chrome.storage.local.set({
        MbBlock: extensionData,
    })
}

export { getSiteStatus, dataKey, setSiteStatus, getExtensionData }

export type { extensionData }
