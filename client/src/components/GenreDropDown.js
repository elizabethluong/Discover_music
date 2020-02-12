import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

function GenreDropDown() {
  return (
    <div className="genreDropDown">
      <div className="field">
        <div className="control">
          <div className="select is-danger">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenreDropDown;
