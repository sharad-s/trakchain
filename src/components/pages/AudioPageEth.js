import React, { Component } from "react";

// Prop types
import PropTypes from "prop-types";

// components
import SoundFile from "../constants/SoundFile";

// Smart Contracts
import getWeb3 from "../../utils/getWeb3";
import AudioStorageContract from "../../../build/contracts/AudioStorage.json";

class AudioPageEth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      audioElements: [],
      currentSound: {}, //Crurent Sound Object
      currentColor: "383f51",
      isPlaying: null,
      isRinkeby: false,
      audioCount: 0,
      audioStorage: {} //Contract Object
    };
  }

  componentDidMount() {
    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });
      })
      .then(results => {
        // Instantiate Contract communication
        const contract = require("truffle-contract");
        const audioStorageContract = contract(AudioStorageContract);
        audioStorageContract.setProvider(this.state.web3.currentProvider);
        const audioStorage = audioStorageContract.at(
          "0xd842665d09aa9c2f3afdd416e528aa398d1051f6"
        );
        this.setState({ audioStorage });
      })
      .then(results => {
        // Instantiate contract once web3 provided.
        this.instantiateContract();
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  }

  getAudioElements() {
    return JSON.parse(this.state.audioElements);
  }

  instantiateContract() {
    // Declaring this for later so we can chain functions on SimpleStorage.
    var audioStorageInstance = this.state.audioStorage;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log(this.state.audioStorage);
      audioStorageInstance
        .getAudioCount()
        .then(result => {
          // Update state with the result of call.
          console.log("AUDIO COUNT: ", result.c[0]);
          return this.setState({ audioCount: result.c[0] });
        })
        .then(async result => {
          // Update audioElements object with each AudioElement on chain
          for (let i = 0; i < this.state.audioCount; i++) {
            const createAudioInstance = await audioStorageInstance.getAudioEntry
              .call(i, { from: accounts[0] })
              .then(result => {
                var audioElement = {
                  name: result[0],
                  artist: result[1],
                  audioHash: result[2],
                  imageHash: result[3],
                  fileID: result[4].c[0],
                  owner: result[5]
                };
                return audioElement;
              })
              .then(audioElement => {
                // Push audioElement to state
                try {
                  var audioElements = JSON.parse(this.state.audioElements);
                } catch (err) {
                  console.log(err);
                  var audioElements = this.state.audioElements;
                }

                console.log(audioElements);
                audioElements.push(audioElement);
                this.setState({ audioElements });
              }); //end async createAudioInstance promise chain
          } //end for loop
        }); //end out promise in deployed promisechain
    }); //end getAccounts
  } //end instantiateContract

  //Recieves: Object soundFileObject from the Child SoundFile Component
  //Calls: function playSound on Parent component, passing soundFileObject
  playSound = async soundFileObject => {
    // console.log("FUNCTION PLAYSOUND RECIEVES: ", soundFileObject)
    this.props.playSound(soundFileObject);
  };

  render() {
    // For each item in audioElements, return a Soundfile component
    let allSoundFiles = this.state.audioElements.map(sounditem => {
      return (
        <div className="pure-u-1-3">
          <SoundFile
            key={sounditem.fileID}
            {...sounditem}
            playSound={soundFileObject => this.playSound(soundFileObject)}
          />
        </div>
      );
    });

    return (
      <div className="ui container">
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Audio</h1>
              <h2>OnChain Audio Elements: {this.state.audioCount}</h2>
            </div>
          </div>

          <div
            className="flex-container"
            style={{ backgroundColor: this.state.currentColor }}
          >
            {allSoundFiles}
          </div>
        </main>
      </div>
    );
  }
}

AudioPageEth.PropTypes = {
  // isAuthenticated: PropTypes.bool.isRequired
  playSound: PropTypes.func.isRequired
};

export default AudioPageEth;
