import React, { Component } from 'react'

// components
import FooterAudioPlayer from "../constants/footeraudioplayer"
import SoundFile from "../constants/soundfile"

//Sample Audio Data
const audioJSON = [
  {
    "name": "LILITH",
    "artist": "Joseph L'etranger",
    "fileHash": "QmbiHD9x9zrbMx7Z5yjfyjxfYJKTFMdGiPAeHBr5jYUmxE",
    "fileID": 1,
  },
  {
    "name": "Uzi",
    "artist": "Octbr",
    "fileHash": "QmWL4AKE52rWc2YxfVVyE5MNNDWBRSKkqqZCPZWsK6PmJf",
    "fileID": 2
  },
  {
    "name": "ZZZ",
    "artist": "Joseph L'etranger",
    "fileHash": "Qmdw3m5ZdoDT4Z8JHE6JMPwz8gtbVyvUY1B2wMBCxPgCv6",
    "fileID": 3
  },
  {
    "name": "You Was Right (Eric Dingus Remix)",
    "artist": "Eric Dingus",
    "fileHash": "QmczcPVB8ppbVZJBZXGRVdtSVbGxK6s5YN8iD2xhypoXUG",
    "fileID": 4
  }
];

class AudioPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      web3: this.props.web3,
      audioElements: [],
      currentSound: {},      //Crurent Sound Object
      currentColor:'383f51',
      listLength: null,
      isPlaying:null,
      isRinkeby:false
    }
  }

  componentDidMount() {
    // // Instantiate contract once web3 provided.
    // this.instantiateContract()

    // Get Queried Beats. Hack for immediate JSON response
    let audioEntries = audioJSON

    // Call Async function to populate state with query response
    this.pushAudioArray(audioEntries)
  }

   //Function: Push audio entries to state
   pushAudioArray = async (audioEntries) => {
    let array = [];
    for (let i=0; i < audioEntries.length ; i++) {
      const audioElement = audioEntries[i]
      array.push(audioElement)
    }
    //Push new Audio Elements to state
    await this.setState({
      audioElements: array,
      listLength : array.length
    })
  }

  //Plays audio on AudioPlayer Component
  //Recieves Soundfile Object from the calling SoundFile Component
  playSound = async (soundFileObject) => {
    console.log("FUNCTION PLAYSOUND RECIEVES: ", soundFileObject)
    await this.setState({
      currentSound: {
        fileHash : soundFileObject.fileHash,
        fileID : soundFileObject.fileID,
        name : soundFileObject.name,
        artist : soundFileObject.artist
      }
    })
    await this.setState({isPlaying: true})
  }

  render() {
    // For each item in audioElements, return a Soundfile component
    let allSoundFiles = this.state.audioElements.map(item => {
        return <SoundFile key={item.fileID}
          name={ item.name }
          artist={ item.artist }
          fileHash={ item.fileHash }
          fileID={ item.fileID }
          playSound={(hash) => this.playSound(hash)}/>
    })
    return (
      <div className="ui container">

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Audio</h1>
              <p>Listen up.</p>
            </div>
          </div>

          <div className="flex-container" style={{ backgroundColor: this.state.currentColor}} >
            {allSoundFiles}
          </div>
        </main>

        <FooterAudioPlayer
          currentSound={ this.state.currentSound }
          autoPlay={ this.state.isPlaying }
        />

      </div>
    );
  }
}

AudioPage.PropTypes = {
  // isAuthenticated: PropTypes.bool.isRequired
};


export default (AudioPage);
