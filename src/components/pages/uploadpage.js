import React, {Component} from 'react'

// components
import UploadForm from "../forms/UploadForm";

//links

// Smart Contracts
import getWeb3 from '../../utils/getWeb3'
import AudioStorageContract from '../../../build/contracts/AudioStorage.json'
import Web3 from 'web3'

class UploadPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      simpleStorageInstance: {},
      simpleStorage: {}
    }
    this.onAdd.bind(this);
  }

  componentDidMount() {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    const web3 = new Web3(provider);
    getWeb3
    .then(results => {
      this.setState({
        // web3: results.web3
        web3 : web3
      })
      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    console.log("Contract Instantiated on UploadPage.js");

  }


   onAdd = async (uploadObject) => {
     // Smart contract instantiaion
     const contract = require('truffle-contract')
     const simpleStorage = contract(AudioStorageContract)
     simpleStorage.setProvider(this.state.web3.currentProvider)

     var simpleStorageInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance;

        // Upload track data to the chain. Gas required ~ 500k D:
        return simpleStorageInstance.createAudioEntry(
          uploadObject.name,
          uploadObject.artist,
          uploadObject.audioHash,
          uploadObject.imageHash,
          {from: accounts[0], gas:1000000 })
      }).then((result) => {
        // Get the value of AudioCount from the contract to prove it worked.

        console.log("TX Receipt for createAudioEntry on UploadPage.js: " ,result)
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
        </div>
      </main>

    <UploadForm
      onAdd={(uploadObject) => this.onAdd(uploadObject)}
    />
    </div>
  )
  }

}



export default (UploadPage);
