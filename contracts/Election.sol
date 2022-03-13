pragma solidity >=0.4.0 <0.8.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping (uint => Candidate) public candidates;
    mapping (address => bool) public voters;
    
    uint public candidateCount;


    constructor () public {
       addCandiate("Candidate 1");
       addCandiate("Candidate 2");
    }
    function addCandiate (string memory _name) private{
        candidateCount ++;
        candidates[candidateCount]= Candidate(candidateCount, _name, 0); //o is vote count initial
    }

    function vote (uint _candidateID) public{
        require(!voters[msg.sender]);

        require(_candidateID >0 && _candidateID <= candidateCount);
        
        candidates[_candidateID].voteCount++;

        //record that voter has voted
        voters[msg.sender]=true;
    }
}