import React, { Component } from 'react'


// Props
import PropTypes from "prop-types";

class SoundFile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fileHash: this.props.fileHash,
      fileID: this.props.fileID,
      name: '',
      author: '',
      color: "383F51"
    }
  }

  componentWillMount(){
    // If color is specified, pass in color.
    if (this.props.color){
      this.setState({color: this.props.color})
    }
  }

  handleClick(e) {
    console.log("playing " + this.state.fileHash)
    // e.preventDefault();
    this.props.playSound(this.state.fileHash)
  }

  urlExists(hash){
    let http = new XMLHttpRequest();
    http.open('HEAD', "https://ipfs.io/ipfs/" + hash, false);
    http.send();
    return http.status!==404;
  }

  render() {
    // let color="#" + this.state.color
    return (
      <div className="flex-item" style={{backgroundColor: this.state.color}} onClick={this.handleClick.bind(this)}>
      </div>
    );
  }
}

SoundFile.PropTypes = {

}

export default SoundFile
