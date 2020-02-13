import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import Login from "./components/login";
import Hero from "./components/hero";
import Genre from "./components/genre";
import GenreDropDown from "./components/GenreDropDown";
import ArtistList from "./components/ArtistList";
import UserInfo from "./containers/userInfo";
import Playlist from "./components/playlist";
import SuggestedTracks from "./components/suggestedTracks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const id = params.id;
    this.state = {
      id: id,
      name: "",
      country: "",
      playlists: [],
      genres: [],
      selectGenres: "",
      returnTracks: [],
      loggedIn: false
    };
  }

  handleSubmit = event => {
    window.location.assign("http://localhost:5000/");
    event.preventDefault();
  };

  onChangeHandler = event => {
    event.preventDefault();
    this.setState({ selectGenres: event.target.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    if (this.state.selectGenres === "") {
      alert("Type a genre in the search box!");
    }
    let genre = this.state.selectGenres;
    const params = this.getHashParams();
    const token = params.code;
    axios
      .get(`http://127.0.0.1:5000/get_tracks/${token}/${genre}`)
      .then(response => {
        console.log(response);
        this.setState({ returnTracks: response.data.tracks, selectGenres: "" });
      })
      .catch(err => {
        console.log(err);
      });
    // alert("Getting tracks!");
    // let genreInput = event.target.value = ""
  };

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getData() {
    let id = this.state.id;
    axios
      .get(`http://127.0.0.1:5000/user/${id}`)
      .then(response => {
        const data = response.data;
        // console.log(data.data[0].name)
        this.setState({
          name: data.data[0].name,
          country: data.data[0].country
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getPlaylists() {
    const params = this.getHashParams();
    const token = params.code;
    let id = this.state.id;
    axios
      .get(`http://127.0.0.1:5000/get_playlists/${token}/${id}`)
      .then(response => {
        this.setState({ playlists: response.data.items });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getGenres() {
    const params = this.getHashParams();
    const token = params.code;
    axios
      .get(`http://127.0.0.1:5000/get_genres/${token}`)
      .then(response => {
        // console.log( response.data.genres)
        this.setState({ genres: response.data.genres });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getData();
    this.getPlaylists();
    this.getGenres();
  }
  render() {
    return (
      <div className="App">
        <Router className="App">
          <Switch>
            <Route exact path="/">
              <Hero />
              <Login log={this.handleSubmit} top={this.spotifyRedirect} />
            </Route>
            <Route path="/dash">
              <NavBar />
              <Hero />
              {/* <Playlist playlists={this.state} /> */}
              <UserInfo state={this.state} />
              <Genre
                state={this.state}
                addGenre={this.onSubmitHandler}
                typeGenre={this.onChangeHandler}
              />
              <SuggestedTracks state={this.state} />
            </Route>
            <Route path="/user_profile">
              <NavBar />
              <Hero />
              <GenreDropDown />
              <ArtistList />
            </Route>
            <Route path="/logout">
              <Hero />
              <Login />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
