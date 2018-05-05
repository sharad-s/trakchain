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
    "imageHash": "QmUBTAg3oVd68Yrrn887UtVwkbqbrbWCeuMVNTPT4zZQ1e",
    "fileID": 1,
  },
  {
    "name": "Uzi",
    "artist": "Octbr",
    "fileHash": "QmWL4AKE52rWc2YxfVVyE5MNNDWBRSKkqqZCPZWsK6PmJf",
    "imageHash": "QmYVaLnSdVTDEvVPEPmHabyCVV81WP9BPG7BvrMnv8xB9m",
    "fileID": 2
  },
  {
    "name": "ZZZ",
    "artist": "Joseph L'etranger",
    "fileHash": "Qmdw3m5ZdoDT4Z8JHE6JMPwz8gtbVyvUY1B2wMBCxPgCv6",
    "imageHash": "QmUBTAg3oVd68Yrrn887UtVwkbqbrbWCeuMVNTPT4zZQ1e",
    "fileID": 3
  },
  {
    "name": "You Was Right",
    "artist": "Eric Dingus",
    "fileHash": "QmczcPVB8ppbVZJBZXGRVdtSVbGxK6s5YN8iD2xhypoXUG",
    "imageHash": "QmbXtWp3Gvwbm6hHW39s4mJ4oUXBGfXS9QMCMitbcf2azm",
    "fileID": 4
  },
  {
    "name": "FF308",
    "artist": "Mr. Carmack",
    "fileHash": "QmeXvgzS9t67bD2Uwqo7MUn6uDWaTSrv2dDnQLZREhsZGc",
    "imageHash": "QmdYZ8qErq4nf3t2tT28gES7iDdGNCePcxyKE3r29wvte4",
    "fileID": 5
  },
  {
    "name": "Asdf",
    "artist": "Octbr",
    "fileHash": "QmWXcSBwg3nKAsdGzp2b3cJAgs8KsYoPCFoFD2wMqcfNFb",
    "imageHash": "QmYVaLnSdVTDEvVPEPmHabyCVV81WP9BPG7BvrMnv8xB9m",
    "fileID": 6
  },
  {
    "name": "Solo",
    "artist": "Joseph L'etranger",
    "fileHash": "QmUSEvioeAT975qmfjTczixGc2GXwrTUeSGAi7o4ukTyHF",
    "imageHash": "QmUBTAg3oVd68Yrrn887UtVwkbqbrbWCeuMVNTPT4zZQ1e",
    "fileID": 7
  },
  {
    "name": "On Sight",
    "artist": "88GLAM",
    "fileHash": "QmbRnx3XYFe6z2a2dYt9k4R2VTZbLTj1T3BybLq7miD9wf",
    "imageHash": "QmXxGceMcNgYD5Q2WPoQTottahak3Gfvone2okLQdsabzc",
    "fileID": 8
  },
  {
    "name": "Panther",
    "artist": "Made in Heights",
    "fileHash": "QmUpNqpt2J1q9rpigcyMFoP3x14QXf8SZ7J5r2XGwpLMto",
    "imageHash": "QmYqXXLiJDKneKn7pW25yxvYLQbNqyQFyr6iF2gJXqZbDc",
    "fileID": 9
  },
  {
    "name": " 10.9",
    "artist": "Sharad",
    "fileHash": "QmTYS5sgTbiwppnZZPT8G8k8J22GaJp48xJZuTUDq8QupK",
    "imageHash": "QmV8VLuvq7hS1w4NWZ7jqixHAYv81i7Nx9pUgSpfDKKHew",
    "fileID": 10
  },
  {
    "name": "Swimming Pools",
    "artist": "Pierre Bourne",
    "fileHash": "QmTtdGJg5dToC2tj4oc8BEXeHBuT5iTgkoxpCHzV3AA7tQ",
    "imageHash": "QmeYJt6uTbyi1cNobDj6KMgh5YLqQUmUimg1q72JptLdNQ",
    "fileID": 11
  },
  {
    "name": "BARDIEL",
    "artist": "Joseph L'etranger",
    "fileHash": "QmYwyNpJf5vMXGnMknqpmF7XMz3aEDk62obmuzfai5g3Rj",
    "imageHash": "QmUBTAg3oVd68Yrrn887UtVwkbqbrbWCeuMVNTPT4zZQ1e",
    "fileID": 12
  },
  {
    "name": "Airglow Fires",
    "artist": "Lone",
    "fileHash": "QmehvBw3Jd3zjRKFYp5z9zaJmwUV855iKjWq9qMYGDgU8e",
    "imageHash": "QmUbbiasUrZrAQ7Q3fQMir8SpdgW7gH7kkGy1uYhQSp1Vv",
    "fileID": 13
  },
  {
    "name": "How He Do That",
    "artist": "QuincyGotRich!",
    "fileHash": "QmZi9qToocma6wQ6JFmLST4QNMBZAQ2BK1E4yXqA7RTCxn",
    "imageHash": "QmUbbiasUrZrAQ7Q3fQMir8SpdgW7gH7kkGy1uYhQSp1Vv",
    "fileID": 14
  },
  {
    "name": "Slop",
    "artist": "XXX",
    "fileHash": "QmSw2SG5mGEh9nrLw3Dc1kbwUS9vTDNHvGx5j3h8P5MP9V",
    "imageHash": "QmVMeqv8aTh1W3Vnq7SCrxf9SxUY2Dfz5SVMuiFDkHdtpf",
    "fileID": 15
  },
  {
    "name": "Alberto Balsalm",
    "artist": "Aphex Twin",
    "fileHash": "QmcXVEPE3fJBEdYF9rKTgCzWMccQp6ncBY1XXdtCN1E3uS",
    "imageHash": "QmR3bHFfkMrPwWF15xP8ikmhT2mmBsRz7b3HVCSKj5hbZw",
    "fileID": 16
  },
  {
    "name": "Codeine Kiss",
    "artist": "Eric Dingus",
    "fileHash": "QmeJfj4zaTWHSnQy3R39Jf9SgRw3iWFvW2bMj48137QmAf",
    "imageHash": "QmbXtWp3Gvwbm6hHW39s4mJ4oUXBGfXS9QMCMitbcf2azm",
    "fileID": 17
  },
  {
    "name": "Do Right",
    "artist": "Les Sins",
    "fileHash": "QmTFzkanxoiyouusLzghCLWMaAdhaJgD4eyUxe2WgeDyp5",
    "imageHash": "QmPBUAukJpj6bsEjeddb1W7KRkKqsPjUqUVejgYpzMKuPn",
    "fileID": 18
  },
  {
    "name": "To The Moon",
    "artist": "SmokePurpp",
    "fileHash": "QmeA4R3FSGWkz2WXnprbtNvKsgEXFzm3tmXmG22EfDBM8v",
    "imageHash": "QmTZ4MTRVqk6WVGN6cee5fsHf26wSfc3mZUTdTQfb5VCZh",
    "fileID": 19
  },
  {
    "name": "PLAYBOY",
    "artist": "Joseph L'etranger",
    "fileHash": "QmbME2YQHX1wnzQUyWzujNREGsj88ASAWHX3cgkXhvR2XJ",
    "imageHash": "QmUBTAg3oVd68Yrrn887UtVwkbqbrbWCeuMVNTPT4zZQ1e",
    "fileID": 20
  },
  {
    "name": "Chantingz",
    "artist": "AshTreJenkins",
    "fileHash": "QmZFF11hviH8fgVyinkLJ8SmHRiWGQdfDMTs3FfrS7gZUg",
    "imageHash": "QmPRSKjRyZsEJ1UVZN9zFTLx3gEV91zxP5y53JJqio3MSw",
    "fileID": 21
  },
  {
    "name": "Unreleased",
    "artist": "Rustie",
    "fileHash": "Qme8McCYXyRUbweGTjvQTaW87Zfq3gKL4v3QfGpQJbjzDf",
    "imageHash": "QmSSPY4U1iBzNQ1FwFNDhdy2yNNEyxHryrATSJhY6Duj3u",
    "fileID": 22
  },
  {
    "name": "Blast",
    "artist": "Clams Casino",
    "fileHash": "QmYsT1MS4cuWoQAbKfK6r3r3VHYKAF4cPeEn5JZ4xCVmZr",
    "imageHash": "QmTAvYGgpuXpQHX28v2X2M8JYWf15Y2mqVw1nk9ER9FANZ",
    "fileID": 23
  },
  {
    "name": "Tracks Today",
    "artist": "Purchase Your",
    "fileHash": "QmTRxxdXzKCuCQGyW1dpNJg5ghU2pVm3yJ8NNegnF5hpzs",
    "imageHash": "QmR3bHFfkMrPwWF15xP8ikmhT2mmBsRz7b3HVCSKj5hbZw",
    "fileID": 24
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
        name : soundFileObject.name,
        artist : soundFileObject.artist,
        fileHash : soundFileObject.fileHash,
        imageHash : soundFileObject.fileHash,
        fileID : soundFileObject.fileID
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
          imageHash={ item.imageHash }
          fileID={ item.fileID }
          playSound={(hash) => this.playSound(hash)}/>
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
