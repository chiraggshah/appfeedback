import "tailwindcss/tailwind.css";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
