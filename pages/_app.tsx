import React, { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { theme } from "../styles/theme";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // 윤년 판단 플러그인.
import "dayjs/locale/ko"; // 한국어 가져오기.
dayjs.extend(isLeapYear); // 플러그인 등록.
dayjs.locale("ko"); // 언어 등록.

const [client] = useState(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          // 데이터가 stale 상태일 경우 윈도우 포커싱 될 때 마다 refetch를 실행하는 옵션. (boolean | "always")
          refetchOnWindowFocus: false,
          staleTime: 60 * 1000, // 1분.
        },
      },
    })
);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <QueryClientProvider client={client}>
        <RecoilRoot>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
            />
            <meta property="og:title" content="KBOrder" />
            <meta property="og:description" content="KBOrder" />
            <meta property="og:image" content="" />
            <link rel="icon" href="/favicon.ico" />
            <title>🍙 KBOrder</title>
          </Head>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Header />
            <main>
              <Component {...pageProps} />
            </main>
            <Footer />
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
