import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter'
import { system } from './theme';
import { Toaster } from './components/UI/chakra/toaster';

function App() {
    return (
        <ChakraProvider value={system}>
            <Toaster />
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </ChakraProvider>
    )
}

export default App;
