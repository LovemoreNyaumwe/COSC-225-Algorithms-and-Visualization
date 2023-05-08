const SVG_NS = "http://www.w3.org/2000/svg";

const MAX_DEPTH = 100;

const svg = document.querySelector("#koch");
const kochGroup = document.querySelector("#koch-group");
const defs = document.querySelector("#koch-defs");

const kochBasic = document.createElementNS(SVG_NS, "polygon");
kochBasic.setAttributeNS(null, "id", "koch-basic");
kochBasic.setAttributeNS(null, "points", "0 0 200 0 300 173 400 0 600 0");
kochBasic.setAttributeNS(null, "fill", "black");
kochBasic.setAttributeNS(null, "stroke", "black");
kochBasic.setAttributeNS(null, "stroke-width", "1");
defs.appendChild(kochBasic);

let makeBasicSegment = function () {
    let segment = document.createElementNS(SVG_NS, "polygon");
    segment.setAttributeNS(null, "id", "koch-basic");
    segment.setAttributeNS(null, "points", "0 0 200 0 300 173 400 0 600 0");
    segment.setAttributeNS(null, "fill", "black");
    segment.setAttributeNS(null, "stroke", "black");
    segment.setAttributeNS(null, "stroke-width", "1");
    return segment;

}

let getTransformMatrix = function (x1, y1, x2, y2) {
    let a = (x2 - x1) / 600;
    let b = (y2 - y1) / 600;
    let c = -b;
    let d = a;
    let e = x1;
    let f = y1;

    return `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
}

let drawIteration = function (x1, y1, x2, y2, depth, parentGroup) {
    if (depth > MAX_DEPTH) {
	return;
    }

    // create a group for this segment of the iteration
    let curGroup = document.createElementNS(SVG_NS, "g");
    curGroup.setAttributeNS(null, "transform", getTransformMatrix(x1, y1, x2, y2));
    parentGroup.appendChild(curGroup);

    // add a segment for this iteration
    let segment = makeBasicSegment();
    curGroup.appendChild(segment);

    drawIteration(0, 0, 200, 0, depth + 1, curGroup);
    drawIteration(200, 0, 300, 173, depth + 1, curGroup);
    drawIteration(300, 173, 400, 0, depth + 1, curGroup);
    drawIteration(400, 0, 600, 0, depth + 1, curGroup);
}


drawIteration(0, 100, 600, 100, 0, kochGroup);







