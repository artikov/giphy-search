import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "../../components/Footer";

const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API;

export default function Search(initialData) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Search</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <p>
        GO <Link href="/">Home</Link>
      </p>
      <h1>Search results for: {router.query.searchTerm}</h1>

      <div className="giphy-search-results">
        {initialData.giphys.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.title.substring(0, item.title.indexOf("GIF"))}</h3>
              <img src={item.images.original.url} alt={item.title} />
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const searchTerm = context.query.searchTerm;
  let giphys = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=10`
  );
  giphys = await giphys.json();
  return { props: { giphys: giphys.data } };
}
