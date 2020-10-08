import React from 'react';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { GlobalStyle } from 'styles/Global.style';
import Header from 'components/base/Header';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <GlobalStyle />
            <Header />
            <Component {...pageProps} />
        </>
    );
}

export default wrapper.withRedux(MyApp);
