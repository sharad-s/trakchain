import React from 'react'

// components
import UploadForm from "../forms/UploadForm";

//links

const UploadPage = (props) => (
  <div className="ui container">
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>Upload Audio</h1>
          <p>Upload Here.</p>
        </div>
      </div>
    </main>

  <UploadForm></UploadForm>
  </div>
)




export default (UploadPage);
