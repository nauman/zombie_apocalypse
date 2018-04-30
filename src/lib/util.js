module.exports = class Util{

    static getArrayOutOfBoundIndex(currentPosition, directionStep, grid_dimensions){


        var arrayPosition = currentPosition +  directionStep


        if(arrayPosition > grid_dimensions - 1){
            arrayPosition = 0;
        }
        else if(arrayPosition < 0){
            arrayPosition = grid_dimensions - 1;
        }


        return arrayPosition;
    }


    static remove(array, element) {

        const index = array.indexOf(element);

        if (array.length == 1) {
            array.splice(index, 0);
            //return;
        }
        if(index !== -1){
            array.splice(index, 1);
        }
    }
}