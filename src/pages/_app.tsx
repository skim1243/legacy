import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import Head from "next/head";
import {Open_Sans} from "@next/font/google";

const opensans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={opensans.className}>
      <Head>
        <title>Minerva Identity</title>
        <meta name="description" content="Your Minerva Identity" />
        <link rel="icon" href="/minerva.svg" />
      </Head>
      <Component {...pageProps} />
    </main>
  )
};

export default MyApp;
