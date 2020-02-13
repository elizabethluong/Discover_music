import React from "react";
import { Link } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";

function Navbar() {
  return (
    <div className="hero-head">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item">
              <Link to="/dash">
                <img
                  src="https://ph-files.imgix.net/653154fb-1c09-432f-8005-8a5ae8298079?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=760&h=380&fit=max"
                  alt="Logo"
                /><p>Discover Music</p>
              </Link>
            </a>
            <span
              className="navbar-burger burger"
              data-target="navbarMenuHeroA"
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroA" className="navbar-menu">
            <div className="navbar-end">
              <a className="navbar-item is-active is-dark">
                <Link to="/dash">HOME</Link>
              </a>
              {/* <a className="navbar-item">
                <Link to="/user_profile">Profile</Link>
              </a> */}
              <span className="navbar-item">
                <a className="button is-danger is-inverted">
                  <span>
                    <Link to="/">logout</Link>
                  </span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
