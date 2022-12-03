import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <h1>Search Giphy</h1>
    </div>
  );
}
