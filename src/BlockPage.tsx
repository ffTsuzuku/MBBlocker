import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import Footer from './components/Footer'
import BlockedSites from './components/BlockedSites'
import { getExtensionData } from './utility/storage'

import { Button, Flex, Grid, Box } from '@chakra-ui/react'

function App() {
    useEffect(() => {
        async function getData() {
            console.log('eData', await getExtensionData())
        }
    }, [])

    return (
        <div className='App'>
            <Grid
                p={'50px'}
                w={'100vw'}
                h={'100vh'}
                bgColor={'blackAlpha.800'}
                gridTemplateRows={'1fr'}
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
            >
                <BlockedSites />
            </Grid>
        </div>
    )
}

export default App
