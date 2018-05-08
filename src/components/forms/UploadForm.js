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
    console.log("YO")

    // IPFS add audio
    await ipfs.add(this.state.audioBuffer)
    .then( ipfsHash => {
      //  IPFS add Audio
      let audioHash = ipfsHash[0].hash
      this.setState({ audioHash })
      uploadObject.audioHash = this.state.audioHash;
      console.log("AUDIO HASH: ", this.state.audioHash)

    }).then( () => {
        return ipfs.add(this.state.imageBuffer)

    }).then( ipfsHash => {
      //  IPFS add Image
      let imageHash = ipfsHash[0].hash
      this.setState({ imageHash })
      uploadObject.imageHash = this.state.imageHash;
      console.log("IMAGE HASH: ", this.state.imageHash)

    }).then( async () => {
      alert("UPLOAD FINISHED: ", uploadObject)
      console.log("UPLOAD FINISHED: ", uploadObject)

      await this.props.onAdd(uploadObject);
      this.setState({
        "nameFormValue" : '',
        "artistFormValue" : '',
        "audioBuffer" : {},
        "imageBuffer" : {},
        "uploadObject": uploadObject
      });
    })
 }

  ipfsAdd(buffer) {
    console.log("Promise begun")
    return new Promise((resolve, reject) => {
      console.log("It is Beginning.");
      try {
        ipfs.add(buffer, (ipfsHash) => {
          // console.log(ipfsHash);
          console.log("It has ended.")
          resolve(ipfsHash)
        })
     } catch(err) {
         reject(err);
     }
   })
 }


  render() {
    return (
      <form className="upload-form" onSubmit={this.onSubmit}>

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
          <input type="file" accept=".mp3, .wav, .m4a" onChange={this.captureAudioFile} />
          <span>{ this.state.uploadObject.audioHash }</span>
        </label>
        <br />

        <label>
          Photo:
          <input type="file" accept=".jpg,.png, .jpeg" onChange={this.captureImageFile} />
          <span>{ this.state.uploadObject.imageHash }</span>
        </label>
        <br />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default (UploadForm);
