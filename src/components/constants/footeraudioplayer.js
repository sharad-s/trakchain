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
      currentSoundHash: '',
      isPlaying: this.props.isPlaying,
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log("Compoent will recieve props: ",  nextProps)
    this.setState({
      currentSoundHash : nextProps.currentSoundHash,
      isPlaying : nextProps.isPlaying
    })
  }

  break;

  render() {
    let url=  this.state.baseUrl + this.state.currentSoundHash
    console.log("URL : " + url)
    return (
      <div className="footer">
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
