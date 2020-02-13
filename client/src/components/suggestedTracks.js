import React from 'react'

export default function suggestedTracks(props) {
let suggestedTracks = props.state.returnTracks

    return (

 
      <div className="artists">
        {suggestedTracks.length > 1
          ? suggestedTracks.map(item => (
              <div
                className="container backImage"
                style={{
                  backgroundImage: `url(${item.album.images[0].url})`
                }}
                key={item.id}
              ></div>
            ))
          : null}
      </div>


    )
}
