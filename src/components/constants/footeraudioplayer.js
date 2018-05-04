import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'

// Props
import PropTypes from "prop-types";

class FooterAudioPlayer extends Component {

  // Instantiate Props
  constructor(props) {
    super(props)
    this.state = {
      baseUrl: "https://ipfs.io/ipfs/",
      currentSound: {},
      isPlaying: this.props.isPlaying,
    }
  }

  //Upon prop update, update the state
  componentWillReceiveProps(nextProps) {
    console.log(" Player Component will recieve props: ",  nextProps)
    this.setState({
      currentSound : nextProps.currentSound,
      isPlaying : nextProps.isPlaying
    })
  }

  render() {
    //Construct audio source URL and render audio element
    let url=  this.state.baseUrl + this.state.currentSound.fileHash
    return (
      <div className="footer">
        <p> <strong> {this.state.currentSound.name}</strong> - {this.state.currentSound.artist}</p>
        <ReactAudioPlayer className="audio" src={url} controls autoPlay={this.props.autoPlay}/>
      </div>
    )
  }
}

FooterAudioPlayer.PropTypes = {
  currentSoundHash: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired
}

export default FooterAudioPlayer;
