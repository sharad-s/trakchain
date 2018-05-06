import React, { Component } from 'react'
import ipfs from "../../utils/ipfs";

// TODO: DRY this component.
// With help from:
// https://itnext.io/build-a-simple-ethereum-interplanetary-file-system-ipfs-react-js-dapp-23ff4914ce4e

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFormValue: '',
      artistFormValue: '',
      audioBuffer: {},
      imageBuffer: {},
      audioHash: '',
      imageHash: '',
      uploadObject: {}
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleArtistChange = this.handleArtistChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({nameFormValue: event.target.value});
  }

  handleArtistChange(event) {
    this.setState({artistFormValue: event.target.value});
  }

// Capture File from file upload
  captureAudioFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertAudioToBuffer(reader)
  };

  // Convert file to Buffer
  convertAudioToBuffer = async (reader) => {
   //file is converted to a buffer for upload to IPFS
     const audioBuffer = await Buffer.from(reader.result);
   //set this buffer -using es6 syntax
     await this.setState({audioBuffer});
     // console.log(this.state.audioBuffer);
   };

 // Capture File from file upload
   captureImageFile = (event) => {
     event.stopPropagation()
     event.preventDefault()
     const file = event.target.files[0]
     let reader = new window.FileReader()
     reader.readAsArrayBuffer(file)
     reader.onloadend = () => this.convertImageToBuffer(reader)
   };

   // Convert file to Buffer
   convertImageToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS
      const imageBuffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
      await this.setState({imageBuffer});
      // console.log(this.state.imageBuffer);
    };

// On Form Submit
  onSubmit = async (event) => {

    event.preventDefault();

    let uploadObject = {
        "name" : this.state.nameFormValue,
        "artist" : this.state.artistFormValue,
        "audioHash" : '',
        "imageHash" : ''
    }



    // bring in the user's metamask account address
    // obtain contract address from storehash.js
    //save audio to IPFS,return its hash#, and set hash# to state

    await ipfs.add(this.state.audioBuffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash
        this.setState({ audioHash:ipfsHash[0].hash });
        uploadObject.audioHash = this.state.audioHash;
    })

    await ipfs.add(this.state.imageBuffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash
        this.setState({ imageHash:ipfsHash[0].hash });
        uploadObject.imageHash = this.state.imageHash;
    })

    await this.setState({uploadObject})

  }

  // uploadObject = async () => {
  //   return {
  //     "name" : this.state.nameFormValue,
  //     "artist" : this.state.artistFormValue,
  //     "audioHash" : await this.ipfsAdd(this.state.audioBuffer),
  //     "imageHash" : await this.ipfsAdd(this.state.imageBuffer)
  //   }
  // }
  //
  // ipfsAdd = async (buffer) => {
  //   await ipfs.add(buffer, (err, ipfsHash) => {
  //     console.log(err,ipfsHash);
  //     //setState by setting ipfsHash to ipfsHash[0].hash
  //     return ipfsHash
  //   })
  // }

  render() {
    return (
      <form className="upload-form"onSubmit={this.onSubmit}>

        <label>
          Name:
          <input type="text" value={this.state.nameFormValue} onChange={this.handleNameChange} />
          <span>{ this.state.uploadObject.name }</span>
        </label>
        <br />

        <label>
          Artist:
          <input type="text" value={this.state.artistFormValue} onChange={this.handleArtistChange} />
          <span>{ this.state.uploadObject.artist }</span>
        </label>
        <br />

        <label>
          File:
          <input type="file" onChange={this.captureAudioFile} />
          <span>{ this.state.uploadObject.audioHash }</span>
        </label>
        <br />

        <label>
          Photo:
          <input type="file" onChange={this.captureImageFile} />
          <span>{ this.state.uploadObject.imageHash }</span>
        </label>
        <br />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default (UploadForm);
