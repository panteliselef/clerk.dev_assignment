import '../styles/index.scss';
import type { AppProps } from 'next/app';
import MainLayout from '@layouts/MainLayout';
import { queryClient } from '@utils/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </QueryClientProvider>
    );
}
