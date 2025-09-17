import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  const assetVersion = process.env.NEXT_PUBLIC_ASSET_VERSION || 'v=1'
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href={`/favicon.png?${assetVersion}`} />
        <link rel="apple-touch-icon" href={`/favicon.png?${assetVersion}`} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
