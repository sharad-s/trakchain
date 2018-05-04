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
      currentSoundHash: 'QmWL4AKE52rWc2YxfVVyE5MNNDWBRSKkqqZCPZWsK6PmJf',
      isPlaying: this.props.isPlaying,
    }
  }

  componentWillMount() {
  }

  render() {
    let url=  this.state.baseUrl + this.state.currentSoundHash
    return (
      <div className="footer">
        <ReactAudioPlayer className="audio" src={url} controls autoPlay={this.props.autoPlay}/>
      </div>
    )
  }
}

FooterAudioPlayer.PropTypes = {

}

export default FooterAudioPlayer;
