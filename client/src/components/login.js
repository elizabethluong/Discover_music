import "react-bulma-components/dist/react-bulma-components.min.css";
import React, { Component } from "react";

export default class login extends Component {
  render() {
    return (
      <div>
        <form onSubmit={event => this.props.log(event)}>
          <button className="button is-danger is-large is-fullwidth">
            login
          </button>
        </form>
      </div>
    );
  }
}
