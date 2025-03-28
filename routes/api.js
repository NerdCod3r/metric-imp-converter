'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  // Test #2
  // GET /api/convert
  app.route("/api/convert").get(function(req, res){
    let Input = req.query.input;
    const inputUnit = convertHandler.getUnit(Input);
    const inputNumber = convertHandler.getNum(Input);
    // const returnUnit = convertHandler.getReturnUnit(inputUnit);
    const convertedObject = convertHandler.convert(inputNumber, inputUnit);
    const returnNum = convertedObject.returnNum;
    const returnUnit = convertedObject.returnUnit;

    res.json({"initNum": inputNumber,
      "initUnit": inputUnit,
      "returnNum": returnNum,
      "returnUnit": returnUnit,
      "string": convertHandler.getString(inputNumber, inputUnit, returnNum, returnUnit)
    });
    

  }); 
};
