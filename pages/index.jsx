import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API;

export default function Home(initialData) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("cats");
  const [formInputs, setFormInputs] = useState();

  useEffect(() => {
    setSearchResults(initialData.catGiphys.data);
  }, [initialData]);

  const handleInput = (event) => {
    let { value, name } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const search = async (event) => {
    event.preventDefault();
    let giphys = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=${API_KEY}&limit=10`
    );
    giphys = await giphys.json();
    console.log(giphys);
    setSearchResults(giphys.data);
    setSearchTerm(formInputs.searchTerm);
  };

  return (
    <>
      <div className="container">
        <Head>
          <title>Giphy App</title>
          <meta name="description" content="Web app to search giphys online!" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/styles.css" />
        </Head>

        <h1>Search Giphy</h1>

        <form onSubmit={search}>
          <input name="searchTerm" onChange={handleInput} type="text" />
          <button>Search</button>
        </form>

        <h1>Search results for: {searchTerm}</h1>

        <p>
          Share the result:{" "}
          <Link
            href="/search/[pid]"
            as={`/search/${searchTerm}`}
          >{`http://localhost:3000/search/${searchTerm}`}</Link>
        </p>

        <div className="giphy-search-results">
          {searchResults.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.title.substring(0, item.title.indexOf("GIF"))}</h3>
                <img src={item.images.original.url} alt={item.title} />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  let catGiphys = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=cats&api_key=${API_KEY}&limit=10`
  );
  catGiphys = await catGiphys.json();
  return { props: { catGiphys: catGiphys } };
}
