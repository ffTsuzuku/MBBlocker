import { getSiteStatus } from '../utility/storage'

const main = async () => {
    const blocked = await getSiteStatus(window.location.href)

    if (blocked) {
        window.location.href = chrome.runtime.getURL('../block.html')
    }
}

main()

export {}
