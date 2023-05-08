const SVG_NS = "http://www.w3.org/2000/svg";

const MAX_DEPTH = 3;

const svg = document.querySelector("#sierpiński");
const sierpińskiGroup = document.querySelector("#sierpiński-group");
const defs = document.querySelector("#sierpiński-defs");

const sierpińskiBasic = document.createElementNS(SVG_NS, "polygon");
sierpińskiBasic.setAttributeNS(null, "id", "sierpiński-basic");
sierpińskiBasic.setAttributeNS(null, "points", "300 0 900 819 1500 0");
sierpińskiBasic.setAttributeNS(null, "fill", "lightblue");
sierpińskiBasic.setAttributeNS(null, "stroke", "black");
sierpińskiBasic.setAttributeNS(null, "stroke-width", "1");
defs.appendChild(sierpińskiBasic);

let makeBasicSegment = function () {
    let segment = document.createElementNS(SVG_NS, "polygon");
    segment.setAttributeNS(null, "id", "sierpiński-basic");
    segment.setAttributeNS(null, "points", "300 0 900 819 1500 0");
    segment.setAttributeNS(null, "fill", "lightblue");
    segment.setAttributeNS(null, "stroke", "black");
    segment.setAttributeNS(null, "stroke-width", "1");
    return segment;

}

let getTransformMatrix = function (x1, y1) {
    let a = 0.5;
    let b = 0;
    let c = 0;
    let d = 0.5;
    let e = x1/2;
    let f = y1/2;
    console.log(`matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`);

    return `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
}

let drawIteration = function (x1, y1, depth, parentGroup) {
    if (depth > MAX_DEPTH) {
	return;
    }

    // create a group for this segment of the iteration
    let curGroup = document.createElementNS(SVG_NS, "g");
    curGroup.setAttributeNS(null, "transform", getTransformMatrix(x1, y1));
    parentGroup.appendChild(curGroup);

    if (depth == MAX_DEPTH) {
        // add a segment for this iteration
        let segment = makeBasicSegment();
        curGroup.appendChild(segment);
    }

    drawIteration(300, 0, depth + 1, curGroup);
    drawIteration(900, 819, depth + 1, curGroup);
    drawIteration(1500, 0, depth + 1, curGroup);
}


drawIteration(0, 100, 0, sierpińskiGroup);







