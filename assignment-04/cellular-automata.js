function drawTiles(inputArray, rule) {
    document.getElementsByTagName('h1')[0].innerHTML = "Rule " + rule;

    const grid = document.getElementById('grid');
    var root = document.querySelector(':root');

    // var inputRule = document.createElement("INPUT");
    // inputRule.setAttribute("type", "text");
    // inputRule.setAttribute("value", "Hello World!");
    // document.body.appendChild(inputRule);
    // var userInputRule = "";

    const gridRows = Math.ceil(inputArray.length / 2);
    const gridCols = inputArray.length;

    root.style.setProperty('--grid-rows', gridRows);
    root.style.setProperty('--grid-columns', gridCols);

    let counter = 0;

    for(cellRowIndex = 0; cellRowIndex < (gridRows * gridCols); cellRowIndex++) {
        console.log("Input Array in for loop: " + inputArray);
        console.log("Counter: " + counter);
        console.log("cellRowIndex: " + cellRowIndex);
        let gridCell = document.createElement("div");
        let cellColor = "rgb(255, 255, 255)";
        if (counter < inputArray.length && inputArray[counter] == '1') {
            cellColor = "rgb(0, 0, 0)";
        }
        gridCell.style.backgroundColor = cellColor;
        grid.appendChild(gridCell).className = "tile";
        counter++;
        if (counter >= inputArray.length) {
            inputArray = applyRule(rule, inputArray);
            counter = counter % inputArray.length;
        }
        // todo fix grid according to arrays, color in grid.
    }
}

function applyRule(rule, inputConfig) {
    var stateConfig = ["111", "110", "101", "100", "011", "010", "001", "000"]
    var ruleBinary = Array.from(convertRule2Binary(rule.toString(2)));
    console.log("Rule in binary: " + rule.toString(2));
    console.log("Rule binary: " + ruleBinary);
    var ruleBinaryFutureState = [];
    var configMap = {};
    console.log("Input array: " + inputConfig);
    for (stateConfigIndex = 0; stateConfigIndex < stateConfig.length; stateConfigIndex++) {
        configMap[stateConfig[stateConfigIndex]] = ruleBinary[stateConfigIndex];
    }
    for (inputConfigIndex = 0; inputConfigIndex < inputConfig.length; inputConfigIndex++) {
        var currentState = "";
        if (inputConfigIndex === 0) {
            currentState = String(inputConfig[inputConfig.length - 1]) + String(inputConfig[inputConfigIndex])
            + String(inputConfig[(inputConfigIndex + 1) % inputConfig.length]);
        } else {
            currentState = String(inputConfig[(inputConfigIndex - 1) % inputConfig.length]) 
            + String(inputConfig[inputConfigIndex]) + String(inputConfig[(inputConfigIndex + 1) % inputConfig.length]);
        }
        ruleBinaryFutureState.push(configMap[currentState]);
        console.log("Current State: " + currentState + "Config: " + configMap[currentState]);
    }
    console.log("Binary rule: " + ruleBinary);
    console.log(configMap);
    console.log("New array: " + ruleBinaryFutureState);
    return ruleBinaryFutureState;
}

function convertRule2Binary(ruleBinary) {
    var ruleBinaryEight = "";

    if (ruleBinary.length < 8) {
        var placeHolderZeroes = "";
        for (stringIndex = 0; stringIndex < (8 - ruleBinary.length); stringIndex++) {
            placeHolderZeroes += 0;
        }
        ruleBinaryEight = placeHolderZeroes + ruleBinary;
    } else {
        return ruleBinary;
    }

    return ruleBinaryEight;
}

// const myRuleButton = document.getElementById("myRuleButton");
// myRuleButton.addEventListener('click', runUserInput)

// function runUserInput() {
//         const inputArray = [0,0,0,0,0,0, 0, 0, 0, 0, 1, 0, 0, 0, 0,0,0,0,0,0, 0];
//         rule = document.getElementById("myRule").value;
//         drawTiles(inputArray, rule);
//         console.log("Hello world!");
// }