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
      currentSoundHash: "Qmdw3m5ZdoDT4Z8JHE6JMPwz8gtbVyvUY1B2wMBCxPgCv6",
      isPlaying: this.props.isPlaying,
    }
  }

  componentWillMount() {
  }

  render() {
    let url=  this.state.baseUrl + this.state.currentSoundHash
    console.log("URL : " + url)
    return (
      <div className="footer">
        <ReactAudioPlayer className="audio" src={this.state.baseUrl + this.state.currentSoundHash} controls autoPlay={this.props.autoPlay}/>
      </div>
    )
  }
}

FooterAudioPlayer.PropTypes = {

}

export default FooterAudioPlayer;
