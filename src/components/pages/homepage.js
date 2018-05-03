import React from 'react';

// Components/Props
import PropTypes from "prop-types";

//links
import { Link } from 'react-router-dom';



const HomePage = (props) => (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
        <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
        <p>The stored value is: { props.storageValue }</p>
      </div>
    </div>
  </main>
)



HomePage.PropTypes = {
  // isAuthenticated: PropTypes.bool.isRequired
};

export default (HomePage);
