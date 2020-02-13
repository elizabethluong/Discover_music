import React from "react";
import { Link } from "react-router-dom";

export default function suggestedTracks(props) {
  let suggestedTracks = props.state.returnTracks;
  return (
    <div className="artists">
      {suggestedTracks.length > 1
        ? suggestedTracks.map(item => (
            <a
              key={item.id}
              target="_blank"
              href={`https://open.spotify.com/album/${item.album.id}?${item.album.uri}`}
            >
              <div key={item.id} className="tile is-ancestor">
                <div key={item.id} className="tile is-parent">
                  <article key={item.id} className="tile is-child box">
                    <div
                      key={item.id}
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
