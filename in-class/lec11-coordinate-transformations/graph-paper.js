const SVG_NS = "http://www.w3.org/2000/svg";
const PADDING = 1.5;

let addGraphPaper = function (svg, lineSep, color) {


    // get coordinate bounds from svg
    const coords = svg.getAttribute('viewBox').split(' ');
    xMin = Number(coords[0]);
    yMin = Number(coords[1]);
    xMax = Number(coords[2]) + xMin;
    yMax = Number(coords[3]) + yMin;

    // create a root
    root = document.createElementNS(SVG_NS, "g");
    root.setAttributeNS(null, "transform", `matrix(1, 0, 0, -1, 0, ${yMax + yMin})`);
    root.setAttributeNS(null, "color", color);
    root.id = "graph-paper-root";
    svg.prepend(root);

    // defs
    const defs = document.createElementNS(SVG_NS, "defs");
    svg.prepend(defs);
    
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.id = "axis-head";
    marker.setAttributeNS(null, "markerUnits", "strokeWidth");
    marker.setAttributeNS(null, "viewBox", "-3 -2 5 4");
    marker.setAttributeNS(null, "refX", "0");
    marker.setAttributeNS(null, "refY", "0");
    marker.setAttributeNS(null, "orient", "auto-start-reverse");
    marker.setAttributeNS(null, "refX", "0");

    const axisHead = document.createElementNS(SVG_NS, "polyline");
    axisHead.setAttributeNS(null, "points", "-2,-1.5 1,0 -2,1.5");
    axisHead.setAttributeNS(null, "stroke", color);
    axisHead.setAttributeNS(null, "fill", "none");
    axisHead.setAttributeNS(null, "stroke-width", "none");

    marker.appendChild(axisHead);
    defs.appendChild(marker);

    addGridLine = function (x1, y1, x2, y2) {
	const gridLine = document.createElementNS(SVG_NS, "line");
	gridLine.setAttributeNS(null, "x1", `${x1}`);
	gridLine.setAttributeNS(null, "x2", `${x2}`);
	gridLine.setAttributeNS(null, "y1", `${y1}`);
	gridLine.setAttributeNS(null, "y2", `${y2}`);
	gridLine.setAttributeNS(null, "color", color);
	gridLine.classList.toggle("grid-line");
	root.appendChild(gridLine);
	return gridLine;
    }


    // draw a dot at the origin
    let origin = document.createElementNS(SVG_NS, "circle");
    origin.setAttributeNS(null, "cx", "0");
    origin.setAttributeNS(null, "cy", "0");
    origin.setAttributeNS(null, "r", "1%");
    origin.classList.toggle("grid-origin");
    root.appendChild(origin);

    // draw axes
    addGridLine(xMin, 0, xMax - PADDING, 0)
	.classList.toggle("axis-line");
    addGridLine(0, yMin, 0, yMax - PADDING)
	.classList.toggle("axis-line");


    // draw vertical grid lines
    for (let x = Math.max(lineSep, Math.ceil(xMin / lineSep) * lineSep);
	 x <= xMax; x += lineSep) {
	addGridLine(x, yMin, x, yMax);
    }

    for (let x = Math.min(0, Math.ceil(xMin / lineSep) * lineSep); x < 0; x += lineSep) {
	addGridLine(x, yMin, x, yMax);
    }

    // draw horizontal grid lines
    for (let y = Math.max(lineSep, Math.ceil(yMin / lineSep) * lineSep);
	 y <= yMax; y += lineSep) {
	addGridLine(xMin, y, xMax, y);
    }

    for (let y = Math.min(0, Math.ceil(yMin / lineSep) * lineSep); y < 0; y += lineSep) {
	addGridLine(xMin, y, xMax, y);
    }    
}

for (let graph of document.querySelectorAll('.graph-box')) {
    addGraphPaper(graph, 10, "rgb(156, 235, 255)");    
}



