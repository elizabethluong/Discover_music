import "react-bulma-components/dist/react-bulma-components.min.css";
import axios from "axios";
import React, { Component } from "react";

export default class login extends Component {
  handleSubmit = event => {
    // event.preventDefault();
    axios.get("http://127.0.0.1:5000").catch(err => console.log(err));
    
  };

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <button className="button is-danger is-large is-fullwidth">
            login
          </button>
        </form>
      </div>
    );
  }
}
