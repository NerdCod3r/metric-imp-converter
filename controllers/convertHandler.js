function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    const splitIndex = input.indexOf(input.match(/[A-z]/));
    let numericValue = 1;
    let unitValue = null;
     // if input has a number before the unit
    if (splitIndex !== 0){
      numericValue = input.slice(0, splitIndex);
      unitValue = input.slice(splitIndex);
    } else{
      unitValue = input;
      return 1;
    }

    result = numericValue;
    if (result.split("/").length == 2 ){
      result = parseFloat(result.split("/")[0])/parseFloat(result.split("/")[1]);
    } else if (result.split("/").length > 2) {
      result = undefined;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const splitIndex = input.indexOf(input.match(/[A-z]/));
    let numericValue = 1;
    let unitValue = null;
     // if input has a number before the unit
    if (splitIndex !== 0){
      numericValue = input.slice(0, splitIndex);
      unitValue = input.slice(splitIndex);
    } else{
      unitValue = input;
      return unitValue;
    }

    const inputUnits = ["GAL", "L", "MI", "KM", "LBS", "KG"];
    if ( inputUnits.indexOf(unitValue.toUpperCase()) == -1 ){
      result = undefined;
    } else {
      result = unitValue;
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const initUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    const returnUnits = ["L", "gal", "km", "mi", "kg", "lbs"];

    const tempUpperInitUnits = [];
    initUnits.forEach((unit, index)=>{
      tempUpperInitUnits.push(unit.toUpperCase());
    });

    let unitIndex = tempUpperInitUnits.indexOf(initUnit.toUpperCase());
    result = returnUnits[unitIndex];
    return result;
  };

  this.spellOutUnit = function(unit) {
    if (unit == undefined){
      return undefined;
    }
    let result;
    const initUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    const spelledOutUnits = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms" ];
    let unitIndex = -1;
    initUnits.forEach((Unit, Index)=>{
      if (Unit.toUpperCase() === unit.toUpperCase()) {
        unitIndex = Index;
      }
    });
    result = spelledOutUnits[unitIndex];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    if (initUnit === undefined){
      return {
        "returnNum": -1, 
        "returnUnit": undefined
      };
    } else if (initNum === undefined){
      return {
        "returnNum": undefined,
        "returnUnit": undefined
      };
    }
    const initUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    let tempUpperCaseInitUnits = [];
    initUnits.forEach((unit, Index)=>{
      tempUpperCaseInitUnits.push(unit.toUpperCase());
    });

    const initUnitIndex = tempUpperCaseInitUnits.indexOf(initUnit.toUpperCase());
    let isFraction = false;
    let isDecimal = false;
    let isInvalid = false;
    let isWholeNumber = false;

    // is it a fraction?
    if (initNum.toString().split("/").length == 2) {
      isFraction = true;
    }
    // Is it a decimal ?
    else if (initNum.toString().indexOf(".") != -1) {
      isDecimal = true;
    } 
    // Is it an invalid number
    else if (initNum.toString().split("/").length > 2)
    {
      isInvalid = true;
    }
    // Is it a whole number
    else{
      isWholeNumber = true;
    }

    // Convert the result
    let result;
    if (isFraction){
      const numerator = parseFloat(initNum.toString().split("/")[0]);
      const denominator = parseFloat(initNum.toString().split("/")[1]);
      result = numerator/denominator;
    } else if (isDecimal){
      result = initNum;
    } else if (isWholeNumber){
      result = initNum;
    }

    // if the unit is invalid
    if (initUnitIndex === -1 && !isInvalid) {
      return 'invalid unit'
    } else if (initUnitIndex == -1 && isInvalid) {
      return 'invalid number and unit';
    } else if (isInvalid && initUnitIndex != -1){
      return 'invalid number';
    }

   // Do the math
   switch(initUnitIndex){
    case 1:
      result /= galToL;
      return {"returnNum": result, "returnUnit":this.getReturnUnit(initUnits[initUnitIndex]) };
    case 0:
      result*= galToL;
      return {"returnNum": result, "returnUnit":this.getReturnUnit(initUnits[initUnitIndex]) };
    case 2:
      result*=miToKm;
      return {"returnNum": result, "returnUnit":this.getReturnUnit(initUnits[initUnitIndex]) };
    case 3:
      result/=miToKm;
      return {"returnNum": result, "returnUnit":this.getReturnUnit(initUnits[initUnitIndex]) };
    case 4:
      result*=lbsToKg;
      return {"returnNum": result, "returnUnit":this.getReturnUnit(initUnits[initUnitIndex]) };
    case 5:
      result/=lbsToKg;
      return {"returnNum": result, "returnUnit":this.getReturnUnit(initUnits[initUnitIndex]) };
   }

  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    if ( initNum && initUnit && returnNum && returnUnit) {

      result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
    }
    
    return result;
  };
  
}

module.exports = ConvertHandler;
