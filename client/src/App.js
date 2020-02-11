import React, { Component } from 'react';
import axios from 'axios';
import "./App.css"

export default class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const id = params.id;
    this.state = {
      id: id,
      name: "",
      country: "",
      playlists: [],
      genres: []
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getData() {
    let id = this.state.id;
    axios.get(`http://127.0.0.1:5000/user/${id}`)
      .then(response => {
        const data = response.data;
        // console.log(data.data[0].name)
        this.setState({
          name: data.data[0].name,
          country: data.data[0].country
        })
      }).catch(err => {
        console.log(err)
      })
  };

  getPlaylists() {
    const params = this.getHashParams();
    const token = params.code;
    let id = this.state.id
    axios.get(`http://127.0.0.1:5000/get_playlists/${token}/${id}`)
      .then(response => {
        this.setState({ playlists: response.data.items })
      }).catch(err => {
        console.log(err)
      })
  }

  getGenres() {
    const params = this.getHashParams();
    const token = params.code;
    axios.get(`http://127.0.0.1:5000/get_genres/${token}`)
      .then(response => {
        // console.log( response.data.genres)
        this.setState({ genres: response.data.genres })
      }).catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getData();
    this.getPlaylists();
    this.getGenres();
  }
  render() {
    return (
      <div className="App">
        {this.state.name ? <h1>Hi {this.state.name} from {this.state.country}</h1> : null}
        <div className="Lists">
          {this.state.playlists.length > 1 ? this.state.playlists.map((item) =>
            (
              <div className="container backImage"
                style={{ backgroundImage: `url(${item.images.map(i => (i.url))})` }}
                key={item.id}>

              </div>
            )
          ) : null}

        </div>
        <div className="Genres">
          {this.state.genres.length > 1 ?
            this.state.genres.map((genre) =>
              (<div>
                <a href="" key={genre}>{genre}</a>
              </div>
              )
            ) : null}
        </div>
      </div>
    )
  }
}
