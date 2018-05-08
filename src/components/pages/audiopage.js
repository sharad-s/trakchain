import React, { Component } from 'react'

// components
import SoundFile from "../constants/SoundFile"

class AudioPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      web3: this.props.web3,
      audioElements: [],
      currentSound: {},      //Crurent Sound Object
      currentColor:'383f51',
      isPlaying:null,
      isRinkeby:false
    }
  }

  componentDidMount() {
    // // Instantiate contract once web3 provided.
    // this.instantiateContract()

    // Get Queried Beats. Localstorage Hack for immediate response
    // this.getAudioElements()
    let audioElements = JSON.parse(localStorage.getItem('audioJSON'));
    this.setState({ audioElements });
  }

  getAudioElements() {
    return JSON.parse(this.state.audioElements);
  }

  //Recieves: Object soundFileObject from the Child SoundFile Component
  //Calls: function playSound on Parent component, passing soundFileObject
  playSound = async (soundFileObject) => {
    // console.log("FUNCTION PLAYSOUND RECIEVES: ", soundFileObject)
    this.props.playSound(soundFileObject);
  }

  render() {
    // For each item in audioElements, return a Soundfile component
    let allSoundFiles = this.state.audioElements.map(sounditem => {
      return <SoundFile
        key={sounditem.fileID}
        {...sounditem}
        playSound={(soundFileObject) => this.playSound(soundFileObject)}/>
    })

    return (
      <div className="ui container">

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Audio</h1>
            </div>
          </div>

          <div className="flex-container" style={{ backgroundColor: this.state.currentColor}} >
            {allSoundFiles}
          </div>
        </main>

      </div>
    );
  }
}

AudioPage.PropTypes = {
  // isAuthenticated: PropTypes.bool.isRequired
};


export default (AudioPage);
