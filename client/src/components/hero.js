import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

function Hero() {
  return (
    <div className="hero">
      <section className="hero is-medium is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Primary bold title</h1>
            <h2 className="subtitle">Primary bold subtitle</h2>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
