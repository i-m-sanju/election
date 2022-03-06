pragma solidity >=0.4.0 <0.8.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping (uint => Candidate) public candidates;
    
    uint public candidateCount;


    constructor () public {
       addCandiate("Candidate 1");
       addCandiate("Candidate 2");
    }
    function addCandiate (string memory _name) private{
        candidateCount ++;
        candidates[candidateCount]= Candidate(candidateCount, _name, 0); //o is vote count initial
    }
}