import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

function Hero() {
  return (
    <div className="hero">
      <section className="hero is-small is-light is-bold has-bg-img">
        <div className="hero-body">
          <div className="container">
            {/* <h1 className="title">Discover music</h1> */}
            <img className="image"
              src="https://1vynswmg7x-flywheel.netdna-ssl.com/wp-content/uploads/2018/02/sound-waves.png"
              alt="Soundwave"
            />
            {/* <h2 className="subtitle">Primary bold subtitle</h2> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
