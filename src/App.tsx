import { useEffect, useState } from 'react'
import './App.css'

import { CgLock, CgLockUnlock } from 'react-icons/cg'

import { Flex } from '@chakra-ui/react'

import { getSiteStatus, setSiteStatus } from './utility/storage'

import { getActiveTabUrl } from './utility/tabs'

function App() {
    const [blocked, setBlocked] = useState(false)

    useEffect(() => {
        const setBlockedStatus = async () => {
            const site = await getActiveTabUrl()
            if (!site) return
            setBlocked(await getSiteStatus(site))
        }
        setBlockedStatus()
    }, [])

    const toggleBlock = () => {
        const toggleState = async () => {
            const site = await getActiveTabUrl()
            console.log('Site', site)
            if (!site) return
            setSiteStatus(site, !blocked)
            setBlocked(!blocked)
        }

        toggleState()
    }

    const blockedIconJSX = (
        <CgLock
            fontSize={'10rem'}
            color={'red'}
            onClick={() => toggleBlock()}
        />
    )
    const unBlockedIconJSX = (
        <CgLockUnlock
            color='green'
            fontSize={'10rem'}
            onClick={() => toggleBlock()}
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
