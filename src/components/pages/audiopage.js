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
      currentSound:'',
      currentColor:'383f51',
      listLength: null,
      isPlaying:null,
      isRinkeby:false
    }
  }

  componentWillMount() {
    console.log(this.state.web3)

    // Instantiate contract once web3 provided.
    // this.instantiateContract()
    this.getAudioArray()
  }

  //Returns Array of Audio files by hash
  getAudioArray() {

    // Instantiate Array
    let array = [];
    // Hack for immediate JSON objects
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

    this.setState({
      listLength : audioEntries.length
    })

    async items => {
      for (let i=0; i < audioEntries.length ; i++) {
        const audioEntry = audioEntries[i]
        array.push({
          "fileID": audioEntry.id,
          "fileHash": audioEntry.hash,
          "artist": audioEntry.artist,
          "name": audioEntry.name
        })
        // console.log(array)
        this.setState({contractHashes: array})
      }
    }


  }

  //Plays audio on AudioPlayer Component
  playSound(hash){
    this.setState({currentSound: hash})
    this.setState({isPlaying: true})
  }

  render() {

    // For each item in contract hashes, return a Soundfile component
    let allFiles=this.state.contractHashes.map(item => {
      // if (this.is_hexadecimal(item.color)===true){
        return <SoundFile key={item.fileID} fileHash={item.fileHash} fileID={item.fileID} playSound={(hash) => this.playSound(hash)}/>
      // }
    })

    return (
      <div className="ui container">

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Audio</h1>
              <p>Listen up.</p>
              <div className="flex-container" style={{backgroundColor: this.state.currentColor}} >
                {allFiles}
              </div>
            </div>
          </div>
        </main>

        <FooterAudioPlayer currentSound={this.state.currentSound} autoPlay={this.state.isPlaying} />

      </div>
    );
  }
}

AudioPage.PropTypes = {
  // isAuthenticated: PropTypes.bool.isRequired
};



export default (AudioPage);
