pragma solidity ^0.4.18;
import "./SimpleStorage.sol";


contract AudioStorage is SimpleStorage {
    uint soundID = 0;

    struct AudioFile{
        string trackName;
        string trackArtist;
        string audioHash;
        string imageHash;
        uint fileID;
        address uploader;
    }

    //create array of structs
    AudioFile[] private audioFiles;

    function createAudioEntry(string _trackName, string _trackArtist, string _audioHash, string _imageHash) public {
        audioFiles.push(AudioFile(_trackName, _trackArtist, _audioHash, _imageHash, soundID, msg.sender));
        soundID++;
    }

    function getAudioEntry(uint i) public view returns (string, string, string, string, uint, address){
        //return properties of struct
        return (audioFiles[i].trackName, audioFiles[i].trackArtist, audioFiles[i].audioHash, audioFiles[i].imageHash, audioFiles[i].fileID, audioFiles[i].uploader);
    }

    function getAudioCount() public view returns(uint count) {
        return audioFiles.length;
    }

}
