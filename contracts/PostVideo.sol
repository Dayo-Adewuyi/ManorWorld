// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PostVideo is Pausable, Ownable{
   
    uint public videoId;

    mapping(uint => Video) public videos;

    struct Video {
        uint videoId;
        string title;
        string videoHash;
        string contractAddress;
        address author;
        uint40 timestamp;
    }
   
    event VideoCreated(
        uint videoId,
        string title,
        string contractAddress,
        address author,
        uint40 timestamp
    );

    function createVideo(string memory _title, string memory _videoHash,string memory _contractAddress) public whenNotPaused {
        videoId++;
        videos[videoId] = Video(videoId, _title,_videoHash, _contractAddress, msg.sender, uint40(block.timestamp));
        emit VideoCreated(videoId, _title, _contractAddress, msg.sender, uint40(block.timestamp));
    }

    function getAllVideos() public view returns (Video[] memory) {
        Video[] memory _videos = new Video[](videoId);
        for (uint i = 0; i < videoId; i++) {
            _videos[i] = videos[i + 1];
        }
        return _videos;
    }

    function getUserVideo() public view returns (Video[] memory) {
        Video[] memory _videos = new Video[](videoId);
        uint counter = 0;
        for (uint i = 0; i < videoId; i++) {
            if (videos[i + 1].author == msg.sender) {
                _videos[counter] = videos[i + 1];
                counter++;
            }
        }
        return _videos;
    }


    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    
}