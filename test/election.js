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

it("Allows a voter to cast a vote", function(){
    return Election.deployed().then(function(instance){
        electionInstance = instance;
        candidateId = 1;
        return electionInstance.vote(candidateId, {from: accounts[0]});

    }).then(function(receipt){
        return electionInstance.vote(accounts[0]);

    }).then(function(voted){
        assert(voted, "the voter was marked as voted");
        return electionInstance.candidates(candidateId);

    }).then(function(candidate){
        var voteCount = candidate[2];
        assert.equal(voteCount, 1, "increased");
    })
});

it("Throws an exception for invalid candidate", function(){
    return Election.deployed().then(function(instance){
        electionInstance = instance;
        return electionInstance.vote(99, {from: accounts[1]})
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert')>=0, "error message must contain revert");
        return electionInstance.candidate(1)
    }).then(function(candidate1){
    var voteCount = candidate1[2];
    assert.equal(voteCount, 1, "candidate 1 did not recieve any vote");
    return electionInstance.candidates(2);

    }).then(function(candidate2){
        var voteCount = candidate2[2];
        assert.equal(voteCount,0,"Candidate 2 did not recieve any vote")
    });
});

it("throws an exception for double  voting", function(){
    return Election.deployed().then(function(instance){
        electionInstance = instance;
        candidateId= 2;
        electionInstance.vote(candidateId, {from: accounts[1]});
        return electionInstance.candidates(candidateId);

    }).then(function(candidate){
        var voteCount = candidate[2];
        assert.equal(voteCount, 1 , "accepts first vote");
        return electionInstance.vote(candidateId, {from: accounts[1]});

    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert')>=0, "error message");
        return electionInstance.candidates(1);

    }).then(function(candidate1){
        var voteCount = candidate1[2];
        assert.equal(voteCount, 1, "Candidate 1 did not recieve any votes");
        return electionInstance.candidates(2);
    }).then(function(candidate2){
        var voteCount = candidate2[2];
        assert.equal(voteCount, 1, "Candidate 2 did not receive any votes");
    });
});
});