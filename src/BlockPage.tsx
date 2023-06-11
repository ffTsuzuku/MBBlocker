import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import Footer from './components/Footer'
import AlternativeSites from './components/AlternativeSites'

import { Button, Flex, Grid } from '@chakra-ui/react'

function App() {
    return (
        <div className='App'>
            <Grid
                w={'100vw'}
                h={'100vh'}
                bgColor={'blackAlpha.800'}
                gridTemplateRows={'6fr .5fr'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <AlternativeSites />
                <Footer />
            </Grid>
        </div>
    )
}

export default App
