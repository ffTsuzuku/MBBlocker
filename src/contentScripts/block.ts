// import { getSiteStatus } from '../utility/storage'
// // import { getActiveTabUrl } from '../utility/tabs'

// const main = async () => {
//     // const site = getActiveTabUrl()
//     const site = window.location.href
//     if (!site) return
//     console.log('site', site)
//     const blocked = await getSiteStatus(site)

//     if (blocked) {
//         window.location.href = chrome.runtime.getURL('../block.html')
//     }
// }

// main()

chrome.runtime.sendMessage(
    { action: 'getLocalStorage', key: 'MbBlock' },
    (response) => {
        const { list } = response ?? {}
        const blocked = list[window.location.href]

        if (blocked) {
            window.location.href =
                chrome.runtime.getURL('../block.html')
        }
    }
)

export {}
