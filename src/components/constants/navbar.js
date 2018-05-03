import React from 'react';

// Components/Props
import PropTypes from "prop-types";

//links
import { Link } from 'react-router-dom';



const NavBar = () => (
  <nav className="navbar pure-menu pure-menu-horizontal">
      <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
  </nav>
)

NavBar.PropTypes = {
  // isAuthenticated: PropTypes.bool.isRequired
};

export default (NavBar);
