import React from "react";

export default function main() {
  return (
    <div>
      {this.state.name ? (
        <h1>
          Hi {this.state.name} from {this.state.country}
        </h1>
      ) : null}
      <div className="Lists">
        {this.state.playlists.length > 1
          ? this.state.playlists.map(item => (
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
      <div className="Genres">
        <form onSubmit={this.onSumbitHandler}>
          <input
            type="text"
            className="input is-danger input is-large"
            list="data"
            onChange={this.onChangeHandler}
          />
          <input type="submit" value="Submit" />
        </form>

        <datalist id="data">
          {this.state.genres.length > 1
            ? this.state.genres.map((genre, key) => (
                <div>
                  <option key={key} value={genre} /> )}
                </div>
              ))
            : null}
        </datalist>
      </div>
    </div>
  );
}
