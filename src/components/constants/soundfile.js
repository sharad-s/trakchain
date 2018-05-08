import React, { Component } from 'react'


// Props
import PropTypes from "prop-types";

class SoundFile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      artist: this.props.artist,
      fileHash: this.props.fileHash,
      imageHash: this.props.imageHash,
      fileID: this.props.fileID,
      color: "purple"
    }
  }

  componentDidMount(){

  }

  handleClick(e) {
    e.preventDefault();

    // Destructure vars from state
    const { name, artist, fileHash, imageHash, fileID } = this.state;

    // Create object to be passed to playSound function
    const soundFileObject = { name, artist, fileHash, imageHash, fileID }

    // Call playSound function from parent
    this.props.playSound(soundFileObject)
  }

  render() {
    let imageURL = "http://localhost:8080/ipfs/" + this.state.imageHash;

    return (
      <div className="flex-box">
        <div className="flex-item" style={{backgroundColor: this.state.color}} onClick={this.handleClick.bind(this)}>
          <img alt="soundFile" src={imageURL} />
        </div>
        <span> {this.state.artist} </span> <br/>
        <span> {this.state.name} </span>
      </div>

    );
  }
}

SoundFile.PropTypes = {

}

export default SoundFile
