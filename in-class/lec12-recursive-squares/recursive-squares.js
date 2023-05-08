const SVG_NS = "http://www.w3.org/2000/svg";

const MAX_DEPTH = 30;
const BASE_SIZE = 100;
const Y = 10;

const svg = document.querySelector("#recursive-squares");
const squareGroup = document.querySelector("#square-group");
const defs = document.querySelector("#square-defs");

let getColor = function (depth) {
    let color;

    // rainbow
    // color = `hsl(${depth * 40}, 50%, ${50 + 50 * depth / MAX_DEPTH}%)`

    // black and white
    // color = (depth % 2 == 0) ? "black" : "white";

    color = "white";
    
    return color;
}

let drawIteration = function (depth, parentGroup) {    
    let branch = document.createElementNS(SVG_NS, "use");
    branch.setAttributeNS(null, "href", "#square-basic");
    branch.setAttributeNS(null, "fill", getColor(depth));

    parentGroup.appendChild(branch);

    if (depth < MAX_DEPTH) {
	let thisGroup = document.createElementNS(SVG_NS, "g");
	thisGroup.setAttributeNS(null, "transform", `matrix(${(BASE_SIZE - Y) / BASE_SIZE}, ${- Y / BASE_SIZE}, ${Y / BASE_SIZE}, ${(BASE_SIZE - Y) / BASE_SIZE}, 0, ${Y})`);
	parentGroup.appendChild(thisGroup);
	drawIteration(depth+1, thisGroup);
    }

}

drawIteration(0, squareGroup);








