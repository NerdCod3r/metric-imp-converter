const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    // test #1
    test('#correctlyReadWholeNumberInput', function(done){
        let input = "32L";
        assert.equal(convertHandler.getNum(input), 32);
        done();
    });

    // test #2
    test('#correctlyReadDecimalNumberInput', function(done){
        let input = "32.6L";
        assert.equal(convertHandler.getNum(input), 32.6);
        done();
    });

    // test #3
    test('#correctlyReadFractionalInput', function(done){
        let input = "9/3L";
        assert.equal(convertHandler.getNum(input), 9/3);
        done();
    });

    // test #4
    test('#correctlyReadFractionalInput with Decimal', function(done){
        let input = "35/8.2L";
        assert.equal(convertHandler.getNum(input), 35/8.2);
        done();
    });

    // test #5
    test('#ReturnErrorOnDoubleInput', function(done){
        let input = "8/8/5L";
        assert.equal(convertHandler.getNum(input), undefined);
        done();
    });

    // test #6
    test('Correctly default to 1 when no numerical input is provided', function(done){
        let input = "L";
        assert.equal(convertHandler.getNum(input), 1);
        done();
    });

    // test #7
    test('#correctlyReadValidInputUnit', function(done){
        let input = ["gal", "L", "mi", "km", "lbs", "kg"];
        let output = ["gal", "L", "mi", "km", "lbs", "kg"];

        input.forEach((value, Index)=>{
            assert.equal(convertHandler.getUnit(value), output[Index]);
        });
        done();
    });

    // test #8
    test('#returnErrorOnUnknownUnitInput', function(done){
        let invalidInput = "34kilograms";
        assert.equal(convertHandler.getUnit(invalidInput), undefined);
        done();
    });


});