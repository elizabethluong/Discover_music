import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

function Genre() {
  return (
    <div className="genre">
      <input
        class="input is-danger input is-large"
        type="text"
        placeholder="Search Genre"
      ></input>
    </div>
  );
}

export default Genre;
