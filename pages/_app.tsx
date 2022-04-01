import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../services/apollo-client'
import { AppContextProvider } from '../context/context'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <AppContextProvider>
                <Component {...pageProps} />
            </AppContextProvider>
        </ApolloProvider>
    )
}

export default MyApp
