// React
import React, { Component } from 'react'
import { BrowserRouter, Route  } from 'react-router-dom'

// Components
import MainPage from "./components/pages/MainPage"
import AboutPage from "./components/pages/AboutPage"
import AudioPage from "./components/pages/AudioPage"
import UploadPage from "./components/pages/UploadPage"
import FooterAudioPlayer from "./components/constants/FooterAudioPlayer"


import NavBar from "./components/constants/NavBar"




//Smart Contracts
import AudioStorageContract from '../build/contracts/AudioStorage.json'
import getWeb3 from './utils/getWeb3'
import Web3 from 'web3'

// Css
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      currentSound: {},
      isPlaying: null
    }
  }

  componentDidMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    // Use local node only for development
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
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(AudioStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.

        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  // Function recieves SoundFileObject from Child, and passes
  playSound = async (soundFileObject) => {
    // console.log("PLAYSOUND ON APP.JS RECIEVES: ", soundFileObject)
    await this.setState({
      currentSound: {
        name : soundFileObject.name,
        artist : soundFileObject.artist,
        audioHash : soundFileObject.audioHash,
        imageHash : soundFileObject.imageHash,
        fileID : soundFileObject.fileID
      }
    })
    await this.setState({isPlaying: true})
  }

  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <NavBar></NavBar>
            <Route path="/" exact render={(props) => ( <MainPage storageValue={ this.state.storageValue } /> )} />
            <Route path="/about" component={ AboutPage } />
            <Route path="/audio" render={(props) => ( <AudioPage playSound={(soundFileObject) => this.playSound(soundFileObject)} /> )}  />
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

//Sample Audio Data
const audioJSON = [
  {
    "name": "Lavish",
    "artist": "88GLAM",
    "audioHash": "QmVe1tWrXLM3jiQjRfkq9erTFXjzCeFAgeCZ9hc8dzvKw9",
    "imageHash": "QmXxGceMcNgYD5Q2WPoQTottahak3Gfvone2okLQdsabzc",
    "fileID": 1,
  },
  {
    "name": "Uzi",
    "artist": "Octbr",
    "audioHash": "QmWL4AKE52rWc2YxfVVyE5MNNDWBRSKkqqZCPZWsK6PmJf",
    "imageHash": "QmYVaLnSdVTDEvVPEPmHabyCVV81WP9BPG7BvrMnv8xB9m",
    "fileID": 2
  },
  {
    "name": "ZZZ",
    "artist": "Joseph L'etranger",
    "audioHash": "Qmdw3m5ZdoDT4Z8JHE6JMPwz8gtbVyvUY1B2wMBCxPgCv6",
    "imageHash": "QmUBTAg3oVd68Yrrn887UtVwkbqbrbWCeuMVNTPT4zZQ1e",
    "fileID": 3
  },
  {
    "name": "You Was Right",
    "artist": "Eric Dingus",
    "audioHash": "QmczcPVB8ppbVZJBZXGRVdtSVbGxK6s5YN8iD2xhypoXUG",
    "imageHash": "QmbXtWp3Gvwbm6hHW39s4mJ4oUXBGfXS9QMCMitbcf2azm",
    "fileID": 4
  },
  {
    "name": "FF308",
    "artist": "Mr. Carmack",
    "audioHash": "QmeXvgzS9t67bD2Uwqo7MUn6uDWaTSrv2dDnQLZREhsZGc",
    "imageHash": "QmdYZ8qErq4nf3t2tT28gES7iDdGNCePcxyKE3r29wvte4",
    "fileID": 5
  },
  {
    "name": "Asdf",
    "artist": "Octbr",
    "audioHash": "QmWXcSBwg3nKAsdGzp2b3cJAgs8KsYoPCFoFD2wMqcfNFb",
    "imageHash": "QmYVaLnSdVTDEvVPEPmHabyCVV81WP9BPG7BvrMnv8xB9m",
    "fileID": 6
  },
  {
    "name": "Solo",
    "artist": "Joseph L'etranger",
    "audioHash": "QmUSEvioeAT975qmfjTczixGc2GXwrTUeSGAi7o4ukTyHF",
    "imageHash": "QmUBTAg3oVd68Yrrn887UtVwkbqbrbWCeuMVNTPT4zZQ1e",
    "fileID": 7
  },
  {
    "name": "On Sight",
    "artist": "88GLAM",
    "audioHash": "QmbRnx3XYFe6z2a2dYt9k4R2VTZbLTj1T3BybLq7miD9wf",
    "imageHash": "QmXxGceMcNgYD5Q2WPoQTottahak3Gfvone2okLQdsabzc",
    "fileID": 8
  },
  {
    "name": "Panther",
    "artist": "Made in Heights",
    "audioHash": "QmUpNqpt2J1q9rpigcyMFoP3x14QXf8SZ7J5r2XGwpLMto",
    "imageHash": "QmYqXXLiJDKneKn7pW25yxvYLQbNqyQFyr6iF2gJXqZbDc",
    "fileID": 9
  },
  {
    "name": " 10.9",
    "artist": "Sharad",
    "audioHash": "QmTYS5sgTbiwppnZZPT8G8k8J22GaJp48xJZuTUDq8QupK",
    "imageHash": "QmV8VLuvq7hS1w4NWZ7jqixHAYv81i7Nx9pUgSpfDKKHew",
    "fileID": 10
  },
  {
    "name": "Swimming Pools",
    "artist": "Pierre Bourne",
    "audioHash": "QmTtdGJg5dToC2tj4oc8BEXeHBuT5iTgkoxpCHzV3AA7tQ",
    "imageHash": "QmeYJt6uTbyi1cNobDj6KMgh5YLqQUmUimg1q72JptLdNQ",
    "fileID": 11
  },
  {
    "name": "BARDIEL",
    "artist": "Joseph L'etranger",
    "audioHash": "QmYwyNpJf5vMXGnMknqpmF7XMz3aEDk62obmuzfai5g3Rj",
    "imageHash": "QmUBTAg3oVd68Yrrn887UtVwkbqbrbWCeuMVNTPT4zZQ1e",
    "fileID": 12
  },
  {
    "name": "Airglow Fires",
    "artist": "Lone",
    "audioHash": "QmehvBw3Jd3zjRKFYp5z9zaJmwUV855iKjWq9qMYGDgU8e",
    "imageHash": "QmUbbiasUrZrAQ7Q3fQMir8SpdgW7gH7kkGy1uYhQSp1Vv",
    "fileID": 13
  },
  {
    "name": "How He Do That",
    "artist": "QuincyGotRich!",
    "audioHash": "QmZi9qToocma6wQ6JFmLST4QNMBZAQ2BK1E4yXqA7RTCxn",
    "imageHash": "QmUbbiasUrZrAQ7Q3fQMir8SpdgW7gH7kkGy1uYhQSp1Vv",
    "fileID": 14
  },
  {
    "name": "Slop",
    "artist": "XXX",
    "audioHash": "QmSw2SG5mGEh9nrLw3Dc1kbwUS9vTDNHvGx5j3h8P5MP9V",
    "imageHash": "QmVMeqv8aTh1W3Vnq7SCrxf9SxUY2Dfz5SVMuiFDkHdtpf",
    "fileID": 15
  },
  {
    "name": "Alberto Balsalm",
    "artist": "Aphex Twin",
    "audioHash": "QmcXVEPE3fJBEdYF9rKTgCzWMccQp6ncBY1XXdtCN1E3uS",
    "imageHash": "QmR3bHFfkMrPwWF15xP8ikmhT2mmBsRz7b3HVCSKj5hbZw",
    "fileID": 16
  },
  {
    "name": "Codeine Kiss",
    "artist": "Eric Dingus",
    "audioHash": "QmeJfj4zaTWHSnQy3R39Jf9SgRw3iWFvW2bMj48137QmAf",
    "imageHash": "QmbXtWp3Gvwbm6hHW39s4mJ4oUXBGfXS9QMCMitbcf2azm",
    "fileID": 17
  },
  {
    "name": "Do Right",
    "artist": "Les Sins",
    "audioHash": "QmTFzkanxoiyouusLzghCLWMaAdhaJgD4eyUxe2WgeDyp5",
    "imageHash": "QmPBUAukJpj6bsEjeddb1W7KRkKqsPjUqUVejgYpzMKuPn",
    "fileID": 18
  },
  {
    "name": "To The Moon",
    "artist": "SmokePurpp",
    "audioHash": "QmeA4R3FSGWkz2WXnprbtNvKsgEXFzm3tmXmG22EfDBM8v",
    "imageHash": "QmTZ4MTRVqk6WVGN6cee5fsHf26wSfc3mZUTdTQfb5VCZh",
    "fileID": 19
  },
  {
    "name": "PLAYBOY",
    "artist": "Joseph L'etranger",
    "audioHash": "QmbME2YQHX1wnzQUyWzujNREGsj88ASAWHX3cgkXhvR2XJ",
    "imageHash": "QmUBTAg3oVd68Yrrn887UtVwkbqbrbWCeuMVNTPT4zZQ1e",
    "fileID": 20
  },
  {
    "name": "Chantingz",
    "artist": "AshTreJenkins",
    "audioHash": "QmZFF11hviH8fgVyinkLJ8SmHRiWGQdfDMTs3FfrS7gZUg",
    "imageHash": "QmPRSKjRyZsEJ1UVZN9zFTLx3gEV91zxP5y53JJqio3MSw",
    "fileID": 21
  },
  {
    "name": "Unreleased",
    "artist": "Rustie",
    "audioHash": "Qme8McCYXyRUbweGTjvQTaW87Zfq3gKL4v3QfGpQJbjzDf",
    "imageHash": "QmSSPY4U1iBzNQ1FwFNDhdy2yNNEyxHryrATSJhY6Duj3u",
    "fileID": 22
  },
  {
    "name": "Blast",
    "artist": "Clams Casino",
    "audioHash": "QmYsT1MS4cuWoQAbKfK6r3r3VHYKAF4cPeEn5JZ4xCVmZr",
    "imageHash": "QmTAvYGgpuXpQHX28v2X2M8JYWf15Y2mqVw1nk9ER9FANZ",
    "fileID": 23
  },
  {
    "name": "Tracks Today",
    "artist": "Purchase Your",
    "audioHash": "QmTRxxdXzKCuCQGyW1dpNJg5ghU2pVm3yJ8NNegnF5hpzs",
    "imageHash": "QmR3bHFfkMrPwWF15xP8ikmhT2mmBsRz7b3HVCSKj5hbZw",
    "fileID": 24
  }

];

localStorage.setItem('audioJSON', JSON.stringify(audioJSON));
