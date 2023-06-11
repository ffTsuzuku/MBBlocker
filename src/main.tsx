import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import BlockPage from './BlockPage'
import './index.css'

import { ChakraProvider } from '@chakra-ui/react'

let ContentJSX = <App />
if (import.meta.env.VITE_RENDER_PAGE === 'BLOCK_PAGE') {
    ContentJSX = <BlockPage />
}

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <ChakraProvider>{ContentJSX}</ChakraProvider>
    </React.StrictMode>
)
