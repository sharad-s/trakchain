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
      fileID: this.props.fileID,
      color: "purple",
      imageHash: ""
    }
  }

  componentWillMount(){
    // If color is specified, pass in color.
    if (this.props.color){
      this.setState({color: this.props.color})
    }
  }

  handleClick(e) {
    // e.preventDefault();
    // Call playSound function from props
    const soundFileObject = {
      "name": this.state.name,
      "artist": this.state.artist,
      "fileHash": this.state.fileHash,
      "fileID": this.state.fileID
    }
    console.log("SOUNDFILE OBJECT: ", soundFileObject)
    this.props.playSound(soundFileObject)
  }

  render() {
    // let color="#" + this.state.color
    return (
      <div className="flex-box">
        <div className="flex-item" style={{backgroundColor: this.state.color}} onClick={this.handleClick.bind(this)} />
        <span> {this.state.artist} </span> <br/>
        <span> {this.state.name} </span>

      </div>
    );
  }
}

SoundFile.PropTypes = {

}

export default SoundFile
