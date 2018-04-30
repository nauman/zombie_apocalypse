module.exports = class Actor{
    //Object instantiation
    constructor(name, infection){
        //this.id                  = 0;
        this.name                = name;
        this.position            = this.initPosition();
        this.score               = 0;
        this.position_after_move = this.initPosition();
        this.infection           = infection || false;
        this.infectedBy          = "None";

    }

    //instance methods
    initPosition(){
       return  { x: 0, y: 0 }
    }

    setPosition(positions){
        this.position = { x: positions[0], y: positions[1] }
        this.position_after_move = { x: positions[0], y: positions[1] }
    }

    makeScore(){
        this.score = this.score + 1;
    }

    infect(zombie){
        this.infection = true;
        this.infectedBy = zombie.name
        zombie.makeScore();
    }

    //validators
    isCollided(zombie){
        var cx = this.position.x;
        var cy = this.position.y;
        var zx = zombie.position_after_move.x;
        var zy = zombie.position_after_move.y;

        return (cx === zx && cy === zy && this.infection === false)
    }

    //class methods
    static totalScore(zombies){
       return zombies.map( zombie => zombie.score ).reduce((sum, score) => sum + score);
    }


}

