import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../src/styles/global-style";
import { theme } from "../src/styles/theme";
import Header from "@components/Header";
import Footer from "@components/Footer";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // 윤년 판단 플러그인.
import "dayjs/locale/ko"; // 한국어 가져오기.
dayjs.extend(isLeapYear); // 플러그인 등록.
dayjs.locale("ko"); // 언어 등록.

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <RecoilRoot>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
          />
          <meta property="og:title" content="KBOrder" />
          <meta
            property="og:description"
            content="삼성동 이레 김밥주문 페이지"
          />
          <meta property="og:image" content="/images/img_meta.png" />
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
    </>
  );
};

export default MyApp;
