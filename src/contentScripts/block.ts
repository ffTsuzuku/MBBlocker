import { extensionData } from '../utility/storage'
import { isBlockedSite } from '../utility/tabs'

chrome.runtime.sendMessage(
    { action: 'getLocalStorage', key: 'MbBlock' },
    (response) => {
        const { list } = (response ?? {}) as extensionData
        const blocked = isBlockedSite(window.location.href, list)

        if (blocked) {
            window.location.href =
                chrome.runtime.getURL('../block.html')
        }
    }
)

export {}
