import React from "react";
import App from "../App";
import "react-bulma-components/dist/react-bulma-components.min.css";

export default function Genre(props) {
  let genres = props.state.genres;
  let addGenre = props.addGenre;
  let typeGenre = props.typeGenre.onChangeHandler;

  console.log({ props });
 
  return (
    <div className="Genres">
      <form onSubmit={() => addGenre}>
        <input
          type="text"
          className="input is-danger input is-large"
          list="data"
          onChange={() => typeGenre}
        />
        <input type="submit" value="Submit" />
      </form>

      <datalist id="data">
        {genres.length > 1
          ? genres.map((genre, key) => (
              <div>
                <option key={key} value={genre} /> )}
              </div>
            ))
          : null}
      </datalist>
    </div>
  );
}
