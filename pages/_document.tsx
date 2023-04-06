import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/svg" />
          <meta property="og:title" content="KB-Order" />
          <meta property="og:image" content="/images/img_meta.png" />
          <meta
            property="og:description"
            content="삼성동 이레 김밥주문 페이지"
          />
          <meta property="og:url" content="https://kb-order.vercel.app" />
          <meta name="description" content="삼성동 이레 김밥주문 페이지" />
          <meta name="keywords" content="김밥주문" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800;900&display=swap"
            rel="preload"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <div id="_modal"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
