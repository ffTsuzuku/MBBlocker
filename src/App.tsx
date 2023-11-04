import { useEffect, useState } from 'react'
import './App.css'

import { CgLock, CgLockUnlock } from 'react-icons/cg'

import { Flex } from '@chakra-ui/react'

import { getSiteStatus, addSiteToBlackList } from './utility/storage'

import { getActiveTabUrl, urlToSiteRecord } from './utility/tabs'

function App() {
    const [blocked, setBlocked] = useState(false)

    useEffect(() => {
        const setBlockedStatus = async () => {
            const site = await getActiveTabUrl()
            if (!site) return
            try {
                const record = urlToSiteRecord(site)
                setBlocked(await getSiteStatus(record))
            } catch (e: any) {}
        }
        setBlockedStatus()
    }, [])

    const blockSite = () => {
        const toggleState = async () => {
            const site = (await getActiveTabUrl()) ?? ''
            const url = new URL(site)
            addSiteToBlackList({
                domain: url.origin,
                path: url.pathname,
            })
            setBlocked(true)
        }

        toggleState()
    }

    const blockedIconJSX = (
        <CgLock fontSize={'10rem'} color={'red'} onClick={() => blockSite()} />
    )
    const unBlockedIconJSX = (
        <CgLockUnlock
            color='green'
            fontSize={'10rem'}
            onClick={() => blockSite()}
        />
    )

    const iconJSX = blocked ? blockedIconJSX : unBlockedIconJSX
    return (
        <Flex
            w={'300px'}
            h={'300px'}
            p={3}
            justifyContent={'center'}
            alignItems={'center'}
            bg={'blue.100'}
        >
            {iconJSX}
        </Flex>
    )
}

export default App
