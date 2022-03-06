var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts){
    var electionInstance;
    it("initializes with two candidates", function(){
        return Election.deployed().then(function(instance){
            return instance.candidateCount();
        }).then(function(count){
            assert.equal(count, 2);
        });
    });
    it("it initialize the candidate with the correct values", function(){
        return Election.deployed().then(function(instance){
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate){
            assert.equal(candidate[0],1,"Contains correct id");
            assert.equal(candidate[1], "Candidate 1", "Caontains the correct name");
            assert.equal(candidate[2],0,"Correct vote count");
            return electionInstance.candidates(2);
        }).then(function(candidate){
            assert.equal(candidate[0],2,"Contains correct id");
            assert.equal(candidate[1], "Candidate 2", "Caontains the correct name");
            assert.equal(candidate[2],0,"Correct vote count");
            return electionInstance.candidates(2);
    });
});

});