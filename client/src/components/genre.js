import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

export default function Genre(props) {
  let genres = props.state.genres;
  let aGenre = props.addGenre;
  let tGenre = props.typeGenre;

  console.log({ props });

  return (
    <div className="Genres">
      <form onSubmit={event => aGenre(event)}>
        <input
          type="text"
          className="input is-danger input is-large"
          list="data"
          placeholder="Search genre"
          onChange={event => tGenre(event)}
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
