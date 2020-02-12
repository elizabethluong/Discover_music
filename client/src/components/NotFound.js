import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="errorPage">
      <div className="imageBox">
        <img
          className="errorImage"
          src="https://icons-for-free.com/iconfiles/png/512/emoji+mobile+mood+robot+sad+icon-1320085848127321402.png"
        />
      </div>
      <h1>404</h1>
      <p>Something went wrong :(</p>
      <Link className="submit_button" to="/">
        Home
      </Link>
    </div>
  );
}
