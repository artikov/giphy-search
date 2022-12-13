import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <p>
          <Link href="/">Home</Link>
        </p>
        <p>
          <Link href="/about">About</Link>
        </p>
        <p>
          Thanks for <a href="https://giphy.com/">giphy.com</a> for their
          awesome API
        </p>
      </div>
    </>
  );
}
