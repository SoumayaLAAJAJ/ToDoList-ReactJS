import '../styles/globals.css';
import Head from 'next/head';
import "../styles/Todo.css";


function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
