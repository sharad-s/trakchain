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
    // e.preventDefault();
    // Call playSound function from props
    const soundFileObject = {
      "name": this.state.name,
      "artist": this.state.artist,
      "fileHash": this.state.fileHash,
      "imageHash": this.state.imageHash,
      "fileID": this.state.fileID
    }
    console.log("SOUNDFILE OBJECT: ", soundFileObject)
    this.props.playSound(soundFileObject)
  }

  render() {
    // let color="#" + this.state.color
    let imageURL = "http://localhost:8080/ipfs/" + this.state.imageHash;

    return (
      <div className="flex-box">
        <div className="flex-item" style={{backgroundColor: this.state.color}} onClick={this.handleClick.bind(this)}>
          <img src={imageURL} />
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
