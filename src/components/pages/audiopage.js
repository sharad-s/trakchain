import React, { Component } from 'react'

// components
import FooterAudioPlayer from "../constants/footeraudioplayer"
import SoundFile from "../constants/soundfile"

class AudioPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      web3: this.props.web3,
      soundFiles: [],
      contractHashes: [],
      currentSoundHash:'',
      currentColor:'383f51',
      listLength: null,
      isPlaying:null,
      isRinkeby:false
    }
  }

  componentWillMount() {
    // Instantiate contract once web3 provided.
    // this.instantiateContract()
    this.getAudioArray()
  }

  //Returns Array of Audio files by hash
  getAudioArray() {

    // Hack for immediate JSON response
    let audioEntries = [
      {
    		"name": "You Was Right (Eric Dingus Remix)",
    		"artist": "Eric Dingus",
    		"hash": "QmczcPVB8ppbVZJBZXGRVdtSVbGxK6s5YN8iD2xhypoXUG",
        "id": 1,
    	},
    	{
    		"name": "Uzi",
    		"artist": "Octbr",
    		"hash": "QmWL4AKE52rWc2YxfVVyE5MNNDWBRSKkqqZCPZWsK6PmJf",
        "id": 2
    	},
    	{
    		"name": "ZZZ",
    		"artist": "Joseph L'etranger",
    		"hash": "Qmdw3m5ZdoDT4Z8JHE6JMPwz8gtbVyvUY1B2wMBCxPgCv6",
        "id": 3
    	}
    ];

    // Set list Length
    this.setState({
      listLength : audioEntries.length
    })

    // Call Async function to populate state with array
    this.pushAudioArray(audioEntries)
  }

   //Push Audio Data to state
   pushAudioArray = async (audioEntries) => {
    let array = [];

    for (let i=0; i < audioEntries.length ; i++) {
      const audioEntry = audioEntries[i]
      array.push({
        "fileID": audioEntry.id,
        "fileHash": audioEntry.hash,
        "artist": audioEntry.artist,
        "name": audioEntry.name
      })
    }

    await this.setState({contractHashes: array})
  }

  //Plays audio on AudioPlayer Component
  playSound = async hash => {
    await this.setState({currentSoundHash: hash})
    console.log("PLAYING SOUND: " + this.state.currentSoundHash)
    await this.setState({isPlaying: true})
  }

  render() {

    // For each item in contract hashes, return a Soundfile component
    let allAudioFiles = this.state.contractHashes.map(item => {
        return <SoundFile key={item.fileID}
          fileHash={ item.fileHash }
          fileID={ item.fileID }
          artist={ item.artist }
          name={ item.name }
          playSound={(hash) => this.playSound(hash)}/>
    })
    // console.log(allAudioFiles)

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
            {allAudioFiles}
          </div>
        </main>

        <FooterAudioPlayer
          currentSoundHash={ this.state.currentSoundHash }
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
