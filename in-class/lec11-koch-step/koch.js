const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = 'http://www.w3.org/1999/xlink';

// the width of the base image
const SCALE = 600;

const svg = document.querySelector("#koch");
const defs = document.querySelector("#koch-defs");
const koch = document.querySelector("#koch-group");

// the definition of a "basic 
const kochBasic = document.createElementNS(SVG_NS, "polygon");
kochBasic.setAttributeNS(null, "id", "koch-basic");
kochBasic.setAttributeNS(null, "points", "0 0 200 0 300 173 400 0 600 0");
kochBasic.setAttributeNS(null, "fill", "black");
kochBasic.setAttributeNS(null, "stroke", "black");
kochBasic.setAttributeNS(null, "stroke-width", "1");
defs.appendChild(kochBasic);

// create and draw a segment of the Koch curve from the point (x1, y1)
// to the point (x2, y2)
let drawSegment = function (x1, y1, x2, y2) {
    let a = (x2 - x1) / SCALE;
    let b = (y2 - y1) / SCALE;
    let c = -b;
    let d = a;
    let e = x1;
    let f = y1;

    let trans = `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;

    let kochSegment = document.createElementNS(SVG_NS, "use");
    kochSegment.setAttributeNS(null, "href", "#koch-basic");
    kochSegment.setAttributeNS(null, "transform", trans)
    koch.appendChild(kochSegment);
}

// iteration 1: the initial segment
drawSegment(0, 100, 600, 100);

/////////////////////////////////////////////////////////////////////
// COMPLETE THIS! Use drawSegment to draw two more iterations of the
// Koch curve
////////////////////////////////////////////////////////////////////

// iteration 2

// iteration 3







