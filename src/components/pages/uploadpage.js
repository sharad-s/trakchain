import React, {Component} from 'react'

// components
import UploadForm from "../forms/UploadForm";

//links

class UploadPage extends Component {

  constructor(props){
    super(props);

    this.onAdd.bind(this);
  }


   onAdd = async (uploadObject) => {

    let audioJSON = JSON.parse(localStorage.getItem('audioJSON'));
    audioJSON.push(uploadObject)
    localStorage.setItem('audioJSON', JSON.stringify(audioJSON));
    console.log("Done")
  }

  render() {

    return (
    <div className="ui container">

      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Upload Audio</h1>
            <p>Upload Here.</p>
          </div>
        </div>
      </main>

    <UploadForm
      onAdd={(uploadObject) => this.onAdd(uploadObject)}
    />
    </div>
  )
  }

}



export default (UploadPage);
