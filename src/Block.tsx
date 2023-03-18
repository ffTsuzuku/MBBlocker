import React from 'react'
import ReactDOM from 'react-dom/client'
import BlockPage from './BlockPage'

import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <ChakraProvider>
            <BlockPage />
        </ChakraProvider>
    </React.StrictMode>
)
