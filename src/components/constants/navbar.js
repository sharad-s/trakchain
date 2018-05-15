import React from "react";

// Components/Props

//links
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="navbar pure-menu pure-menu-horizontal">
    <Link to="/" className="pure-menu-heading pure-menu-link">
      ⛓ TRAKCHAIN{" "}
    </Link>
    <Link to="/about">About</Link>
    <Link to="/audio">Audio</Link>
    <Link to="/upload">Upload</Link>
  </nav>
);

export default NavBar;
