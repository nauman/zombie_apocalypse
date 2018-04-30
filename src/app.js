//importing modules
const readline   = require('readline');
const fs         = require('fs');
const filename   = process.argv[2];
const colors     = require('colors');
const lineReader = readline.createInterface({ input: fs.createReadStream(filename) });

//importing model classes
let   actor      = require("./models/actor.js");
let   grid       = require("./models/grid.js");
let   parse      = require("./services/parse_input.js");
let   util       = require("./lib/util.js");

//declaration of required variables for game play input
let input_lines        = [];
let grid_dimensions    = 0;
let zombie_positions   = [];
let creature_positions = [];
let directions         = [];
let line_counter       = 0;
let zombie_grid        = {};

//we can create actors by class from getting plan details from class but at this stage scope is limited to plain text
let joe                = new actor("Joe", true);
let john               = new actor("John");
let doe                = new actor("Doe");
let james              = new actor("James");;
let infectedActors     = [joe];
let creatureActors     = [john, doe, james]

//initialise game from input file
function initGamePlay(){
    grid_dimensions    = parseInt(input_lines[0]);
    zombie_positions   = parse.zombiePosition(input_lines[1]);
    creature_positions = parse.creaturePosition(input_lines[2]);
    directions         = parse.directions(input_lines[3]);
}

//execute game play with initialised objects
function execGame(){
    zombie_grid = new grid(grid_dimensions);// initialise grid
    creatureActors.map((creature, index) => { creature.setPosition(creature_positions[index]) }) //initial starting point for each actor
    creatureActors.map(creature => { zombie_grid.setPosition(creature, creature.position) }) //assigning grid position for each creature's position

    //setting initial position for zombie and its position in grid
    joe.setPosition(zombie_positions)
    zombie_grid.setPosition(joe.name, joe.position);

    //game play starts
    moveActors();
}

function moveActors(){
    for (let _zombie of infectedActors){

        for (let coordinate of directions) {
            if (Object.keys(coordinate)[0] == "x") {
               _zombie.position_after_move.x = util.getArrayOutOfBoundIndex(_zombie.position_after_move.x, parseInt(coordinate.x), grid_dimensions)
                biteCreature(_zombie)
            }
            else if (Object.keys(coordinate)[0] == "y") {
               _zombie.position_after_move.y = util.getArrayOutOfBoundIndex(_zombie.position_after_move.y, parseInt(coordinate.y), grid_dimensions)
                biteCreature(_zombie)
            }
        }
        zombie_grid.resetPosition(_zombie)
    }
}

function biteCreature(_zombie){

    for (let creature of creatureActors){

        if(creature.isCollided(_zombie)){
            if(creature !== undefined){
                creature.infect(_zombie)
                infectedActors.push(creature)
                util.remove(creatureActors, creature)
            }
        }
    }
}
//-----------------------------------------------------------------------------------------------------------//

//Reading lines from input file
lineReader.on('line', line => {
    input_lines[line_counter] = line;
    line_counter ++;
    console.log(`${line}`.blue)
}).on('close', function() {
    console.log();
    console.log('Press any key to see output result'.blue);
    console.log("----------------------------------".blue);

    initGamePlay();
    execGame();

});

//showing result on console
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {

    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else {
        console.log(`Zombies Score: ${actor.totalScore(infectedActors)}`.blue);
        console.log(`Zombies Positions: ${parse.formatZombiePositions(infectedActors)}`.blue);
        console.log();
        console.log(`Other Insights`.cyan);
        console.log("----------------------------------".cyan);

        console.log(`Grid directions: ${parse.formatZombieDirections(directions)}`.cyan);

        for(let actor of infectedActors){
            console.log(`${actor.name}`.blue, `infected by`, `${actor.infectedBy}`.blue, `and individual zombie score is`, `${actor.score}`.blue)

        }

        process.exit();
    }
});

console.log("You'r input data is:".blue);
console.log("----------------------------------".blue);;