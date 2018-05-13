import React, {Component} from 'react'

// components
import UploadForm from "../forms/UploadForm";

//links

// Smart Contracts
import getWeb3 from '../../utils/getWeb3'
import AudioStorageContract from '../../../build/contracts/AudioStorage.json'

class UploadPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      audioStorage: {},   //Contract Object
      web3: {},
      uploadObject: {},
      txReceipt: ""
    }
    this.onAdd.bind(this);
  }

  componentDidMount() {

    getWeb3
    .then(results => {
      // Set Web3 state
      this.setState({
        web3: results.web3
      })
    }).then( results => {
      // Instantiate Contract communication
      const contract = require('truffle-contract')
      const audioStorage = contract(AudioStorageContract)
      audioStorage.setProvider(this.state.web3.currentProvider)
      this.setState({ audioStorage })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })

  }

   onAdd = async (uploadObject) => {

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.state.audioStorage.deployed().then((audioStorageInstance) => {
        // Upload track data to the chain. Gas required ~ 500k D:
        return audioStorageInstance.createAudioEntry(
          uploadObject.name,
          uploadObject.artist,
          uploadObject.audioHash,
          uploadObject.imageHash,
          {from: accounts[0], gas:1000000})
      }).then((result) => {
        this.setState({ uploadObject, txReceipt: result })
        console.log("TX Receipt for createAudioEntry on UploadPage.js: " , result)
      })
    })
  }

  render() {

    return (
      <div className="ui container">

        <main className="container">
          <div className="pure-g">

            <div className="pure-u-1-1">
              <h1>Upload Audio</h1>
              <p>Upload Here.</p>
            </div>

            <div className="pure-u-1-2">
              <UploadForm
                onAdd={(uploadObject) => this.onAdd(uploadObject)}
              />
            </div>

            <div className="pure-u-1-2">
              { (this.state.uploadObject.name && this.state.uploadObject.artist) ? <p>{this.state.uploadObject.artist} - {this.state.uploadObject.name}</p> : <p></p>}
              { this.state.uploadObject.audioHash ? <p>Audio Hash: {this.state.uploadObject.audioHash}</p> : <p></p>}
              { this.state.uploadObject.imageHash ? <p>Image Hash: {this.state.uploadObject.imageHash}</p> : <p></p>}
              { this.state.txReceipt ? <p>Tx Receipt: {this.state.txReceipt}</p> : <p></p>}
            </div>

          </div>
        </main>


      </div>
    )
  }
}



export default (UploadPage);
