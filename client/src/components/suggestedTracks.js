import React from "react";
import { Link } from "react-router-dom";

export default function suggestedTracks(props) {
  let suggestedTracks = props.state.returnTracks;

  return (
    <div className="artists">
      {suggestedTracks.length > 1
        ? suggestedTracks.map(item => (
            <a href={item.album.uri}>
                {console.log(item.album.uri)}
              <div class="tile is-ancestor">
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <div
                      className="container backImage"
                      style={{
                        backgroundImage: `url(${item.album.images[0].url})`
                      }}
                      key={item.id}
                    ></div>
                  </article>
                </div>
              </div>
            </a>
          ))
        : null}
    </div>
  );
}
