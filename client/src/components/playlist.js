import React from "react";
import App from "../App";

export default function Playlist(props) {
  let playlists = props.playlists.playlists;

  console.log(playlists);

  return (
    <div>
      <div className="Lists">
        {playlists.length > 1
          ? playlists.map(item => (
              <div
                className="container backImage"
                style={{
                  backgroundImage: `url(${item.images.map(i => i.url)})`
                }}
                key={item.id}
              ></div>
            ))
          : null}
      </div>
    </div>
  );
}
