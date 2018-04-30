module.exports = class ParseInput {


    static creaturePosition(input_lines){
        return input_lines.split(")(").map(x=> x.replace(/\(|\)/g, "").split(",").map(function(row){ return parseInt(row); }));
    }

    static zombiePosition(input_lines){
        return  input_lines.replace(/\(|\)/g, "").split(",").map(x => parseInt(x));

    }

    static directions(input_lines){
        return input_lines.split("").map( x => x.toLowerCase()).map( x => this.keyMap().get(x));
    }

    static keyMap(){
        var map = new Map();

        map.set("d", {y: +1} )
            .set("l", {x: -1} )
            .set("u", {y: -1} )
            .set("r", {x: +1} )

        return map
    }

    //showing result in specific format
    static formatZombiePositions(zombies){
        return zombies.map( zombie => `(${zombie.position_after_move.x} , ${zombie.position_after_move.y})`).reduce((str, next_str) => str + next_str);
    }

    static formatZombieDirections(directions){
        return directions.map( direction => `(${Object.keys(direction)[0]}: = ${direction[Object.keys(direction)]})`).reduce((str, next_str) => str + next_str);
    }
}
