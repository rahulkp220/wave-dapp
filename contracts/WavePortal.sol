// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "hardhat/console.sol";

contract WavePortal {
    // state variable
    uint256 totalWaves;
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;


    constructor() payable {
        console.log("My wave contract!");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    // publically accessible function
    function wave(string memory _message) public {

        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Must wait 30 seconds before waving again.");

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // random number
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        if (seed <= 50){
            console.log("%s won!", msg.sender);

        }

        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );  

        // send money
        (bool success, ) = (msg.sender).call{
            value:prizeAmount
        }("");
        require(success, "Failed to withdraw money from contract.");

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    // get all waves 
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    // get additional info
    function addtionalInfo() public view {
        console.log("Time right now %s", block.timestamp);
        console.log("Miner's address", block.coinbase);
        console.log("Difficulty", block.difficulty);
        console.log("Block number", block.number);
        console.log("Block Gaslimit", block.gaslimit);
        console.log("Miner's address", tx.origin);
    }

    // view ensures that the function won't modify the state
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    } 
}