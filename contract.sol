pragma solidity ^0.4.2;

contract Game{
    
    uint points  = 0;
    uint lives = 0;
    
    function getPoints() constant returns(uint){
        return points;
    }
    
    function setPoints(uint _points){
        points = _points;
    }
    
    function reset(){
         points = 0;
         lives = 3;
    }
    
    function setLives(uint _lives){
        lives = _lives;
    }
    
    function getLives() constant returns(uint){
        return lives;
    }
}