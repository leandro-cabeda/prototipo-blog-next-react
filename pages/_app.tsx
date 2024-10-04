import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import '../app/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalClasses withStaticClasses>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
