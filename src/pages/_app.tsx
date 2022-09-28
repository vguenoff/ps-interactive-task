import Head from 'next/head'
import type { AppProps } from 'next/app'

import '@/styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Ps Interactive Task</title>
                <meta name="description" content="Technical Assignment" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Component {...pageProps} />
        </>
    )
}

export default MyApp
