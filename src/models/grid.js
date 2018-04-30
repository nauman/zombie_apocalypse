module.exports = class Grid{
    //initialising empty grid with given dimension
    constructor(dimension){
        this.xyAxis = new Array(dimension).fill(undefined).map(x=> new Array(dimension).fill(undefined))
    }

    setPosition(actor, position){
        this.xyAxis[position.x][position.y] = actor;
    }

    resetPosition(actor){
        this.setPosition(actor.name, actor.position_after_move);
        this.setPosition(undefined, actor.position);
    }

}