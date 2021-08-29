import "tailwindcss/tailwind.css";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop;

  return (
    <UserProvider>
      <Head>
        <title>AppFeedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
