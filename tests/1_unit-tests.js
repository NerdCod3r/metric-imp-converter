const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite("convertHandler.getNum(input)", function(){

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

    });

    suite("convertHandlder.getUnit(input)", function(){

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

    suite("convertHandler.getReturnUnit(unit)", function(){

        // test #9
    test("#correctlyReadInputUnitAndReturnCorrectReturnUnit", function(done){
        let inputUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
        let outputUnits =["L", "gal", "km", "mi", "kg", "lbs"];

        inputUnits.forEach((Unit, Index)=>{
            assert.equal(convertHandler.getReturnUnit(Unit), outputUnits[Index])
        });
        done();
    });

    });

    
    suite("convertHandler.spellOutUnit(initUnit)", function(){
        // test #10
    test("#forEachValidInputUnit_ReturnASpellOutForTheUnit", function(done){
        let inputUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
        let spelledOutInputUnits =  ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms" ];

        inputUnits.forEach((InputUnit, index)=>{
            assert.equal(convertHandler.spellOutUnit(InputUnit), spelledOutInputUnits[index]);
        });

        done();
    });
});

    suite("convertHandler.convert(initNum, initUnit)", function(){

        // test #11
    test("#correctlyConvert_gal_To_L", function(done){
        let input = "gal";
        let inputNumber = convertHandler.getNum(input);
        let inputUnit = convertHandler.getUnit(input);
        const convertResult = convertHandler.convert(inputNumber, inputUnit);
        const expected = 3.78541;

        assert.approximately(new Number(convertResult.returnNum), expected, 0.1);
        done();
    });

    // test #12
    test("#correctly_convert_L_to_gal", function(done){
        const expectedVal = 1;
        const converted_object = convertHandler.convert(3.78541, "L");
        assert.approximately(new Number(converted_object.returnNum), expectedVal, 0.1);

        done();
    });

    // test #13
    test("#correctly_convert_mi_To_km", function(done){
        const expected_km = 1.60934;
        const convert_obj = convertHandler.convert(1, "mi");

        assert.approximately(new Number(convert_obj.returnNum), expected_km, 0.1);
        done();
    });

    // test #14
    test("#correctly_convert_km_To_mi", function(done){
        const expectedMi = 1;
        const initialKm = 1.60934;
        const return_converted_object = convertHandler.convert(initialKm, "km");

        assert.approximately(new Number(return_converted_object.returnNum), expectedMi, 0.1);

        done();
    });

    // test #15
    test("#correctly_convert_lbs_to_kg", function(done){
        const expectedKg = 0.453592;
        const initLbs = 1;
        const return_object = convertHandler.convert(initLbs, "lbs");

        assert.approximately(new Number(return_object.returnNum), expectedKg, 0.1);

        done();
    });

    // test #16
    test("#correctly_convert_kgs_to_lbs", function(done){
        const expectedLbs = 1;
        const initKgs = 0.453592;
        const convert_return_object = convertHandler.convert(initKgs, "kg");

        assert.approximately(new Number(convert_return_object.returnNum), expectedLbs, 0.1);

        done();
    });

    });


});