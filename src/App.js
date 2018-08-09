// React
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Components
import MainPage from "./components/pages/MainPage";
import AboutPage from "./components/pages/AboutPage";
import AudioPage from "./components/pages/AudioPage";
import UploadPage from "./components/pages/UploadPage";
import FooterAudioPlayer from "./components/constants/FooterAudioPlayer";

// ETH Components
import AudioPageEth from "./components/pages/AudioPageEth";

// Constant Components
import NavBar from "./components/constants/NavBar";

//Smart Contracts
import AudioStorageContract from "../build/contracts/AudioStorage.json";
import getWeb3 from "./utils/getWeb3";
import Web3 from "web3";

// Css
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null,
      currentSound: {},
      isPlaying: null
    };
  }

  componentDidMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    // Use local node only for development
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    getWeb3
      .then(results => {
        this.setState({
          // web3: results.web3
          web3: web3
        });
        // Instantiate contract once web3 provided.
        this.instantiateContract();
      })
      .catch(() => {
        console.log("Error finding web3.");
      });
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require("truffle-contract");
    const simpleStorage = contract(AudioStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage
        .deployed()
        .then(instance => {
          simpleStorageInstance = instance;
          return simpleStorageInstance;

          // Store a given value, 5 by default.
          // return simpleStorageInstance.set(9, {from: accounts[1]})

          // Upload track data to the chain. Gas required ~ 500k D:
          // return simpleStorageInstance.createAudioEntry("PLAYBOY", "Joseph L'etranger", "QmbME2YQHX1wnzQUyWzujNREGsj88ASAWHX3cgkXhvR2XJ", "QmUBTAg3oVd68Yrrn887UtVwkbqbrbWCeuMVNTPT4zZQ1e", {from: accounts[0], gas:1000000 })
        })
        .then(result => {
          // Get the value of AudioCount from the contract to prove it worked.

          // console.log("TX Receipt for set on App.js: " ,result)
          return simpleStorageInstance.getAudioCount.call(accounts[0]);
        })
        .then(result => {
          // Update state with the result of call.

          return this.setState({ storageValue: result.c[0] });
        })
        .then(result => {
          // Get first item from contract storage.

          return simpleStorageInstance.getAudioEntry.call(1, {
            from: accounts[0]
          });
        });
    });
  }

  // Function recieves SoundFileObject from Child, and passes
  playSound = async soundFileObject => {
    // console.log("PLAYSOUND ON APP.JS RECIEVES: ", soundFileObject)
    await this.setState({
      currentSound: {
        name: soundFileObject.name,
        artist: soundFileObject.artist,
        audioHash: soundFileObject.audioHash,
        imageHash: soundFileObject.imageHash,
        fileID: soundFileObject.fileID
      }
    });
    await this.setState({ isPlaying: true });
  };

  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <NavBar></NavBar>
            <Route path="/" exact render={(props) => ( <AudioPageEth playSound={(soundFileObject) => this.playSound(soundFileObject)} /> )} />
            <Route path="/about" component={ AboutPage } />
            <Route path="/audio" render={(props) => ( <AudioPageEth playSound={(soundFileObject) => this.playSound(soundFileObject)} /> )}  />
            <Route path="/upload" component={ UploadPage }  />
            <FooterAudioPlayer
              currentSound={ this.state.currentSound }
              isPlaying={ this.state.isPlaying }
            />
          </div>
        </BrowserRouter>
    );
  }
}

export default App
