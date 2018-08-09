import React from "react";

// components

//links

const AboutPage = props => (
  <div className="ui container">
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>About TRAKCHAIN</h1>
          <p>Trakchain is an Invite-only beat marketplace for independent artists and producers. Built with blockchain.</p>
          <p>This is only the beginning.</p>
          <a href="http://trakchain.info/"> trakchain.info</a>
        </div>
      </div>
    </main>
  </div>
);

AboutPage.PropTypes = {
  // isAuthenticated: PropTypes.bool.isRequired
};

export default AboutPage;
