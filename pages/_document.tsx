import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="theme-color" content="#40ae3e"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous'}/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
