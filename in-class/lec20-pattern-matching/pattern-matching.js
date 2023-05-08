// width of one "em" in pixels for the root element
const em = parseFloat(getComputedStyle(document.querySelector("#root")).fontSize);

// the size of a letter-box in em
const LETTER_BOX_SIZE = 3;

// an array storing the individual characters of the text
let textChars = [];

// an array storing (div) elements for the characters in the text
let textElts = [];

// an array storing the individual characters of the pattern
let patternChars = [];

// an array storing (div) elements for the characters in the pattern
let patternElts = [];

// a container for the textElements
const textContainer = document.querySelector("#text-container");

// a container for the patternElements
const patternContainer = document.querySelector("#pattern-container");

// dealing with the text input
const textInput = document.querySelector("#text-input");
const btnUpdateText = document.querySelector("#btn-update-text");
btnUpdateText.addEventListener("click", () => {
    // code to update the text
    let theText = textInput.value.toUpperCase();
    textChars = theText.split("");
    textElts = textChars.map(char => {
        const elt = document.createElement('div');
        elt.classList.add('letter-box');
        elt.innerText = char;
        return elt;
      });
    console.log("updated the text");
    console.log(textChars);
    
});

// dealing with the pattern input
const patternInput = document.querySelector("#pattern-input");
const btnUpdatePattern = document.querySelector("#btn-update-pattern");
btnUpdatePattern.addEventListener("click", () => {
    // code to update the pattern
    let thePatternText = patternInput.value.toUpperCase();
    patternChars = thePatternText.split("");
    patternElts = patternChars.map(char => {
        const elt = document.createElement('div');
        elt.classList.add('letter-box');
        elt.innerText = char;
        return elt;
      });
    console.log("updated the pattern");
    console.log(patternChars);
    
});

// function to update textElts and textContainer
function updateText() {
  // clear textContainer
  textContainer.innerHTML = '';
  // append each element in textElts to textContainer
  textElts.forEach(elt => textContainer.appendChild(elt));
}

// function to update patternElts and patternContainer
function updatePattern() {
    // clear patternContainer
    patternContainer.innerHTML = '';
    // append each element in patternElts to patternContainer
    patternElts.forEach(elt => patternContainer.appendChild(elt));
  }

// call updateText to initially populate textContainer with textElts
updateText();
updatePattern();

// take a step of the algorithm
const btnStepAlgorithm = document.querySelector("#btn-step-algorithm");
btnStepAlgorithm.addEventListener("click", () => {
    
    // code to update the pattern
    patternMatchStep();
    
});


// shift the pattern by 'shift' steps to the right of its original
// position
function shiftPattern (shift) {

    // code to shift the patternContainer
    
}

// indicate that there is a match between textChars[testIndex] and
// patternChars[patternIndex] by updating the style of the repsective
// elements in textElts and patternElts
function markMatch (textIndex, patternIndex) {

    // code to mark match
    
}

// indicate that there is a mismatch between textChars[testIndex] and
// patternChars[patternIndex] by updating the style of the repsective
// elements in textElts and patternElts
function markMismatch (textIndex, patternIndex) {

    // code to mark mismatch
    
}

// clear all match/mismatches between elements so that corresponding
// letter-boxes display in their original style
function clearMatches () {

    // code to clear all matches
    
}

// make a single step of the algorithm
function patternMatchStep () {

    console.log("that's one small step for an algorithm");
    
}
