const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

// An object that represents a 2-d point, consisting of an
// x-coordinate and a y-coordinate. The `compareTo` function
// implements a comparison for sorting with respect to x-coordinates,
// breaking ties by y-coordinate.
function Point (x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;

    // Compare this Point to another Point p for the purposes of
    // sorting a collection of points. The comparison is according to
    // lexicographical ordering. That is, (x, y) < (x', y') if (1) x <
    // x' or (2) x == x' and y < y'.
    this.compareTo = function (p) {
	if (this.x > p.x) {
	    return 1;
	}

	if (this.x < p.x) {
	    return -1;
	}

	if (this.y > p.y) {
	    return 1;
	}

	if (this.y < p.y) {
	    return -1;
	}

	return 0;
    }

    // return a string representation of this Point
    this.toString = function () {
	return "(" + x + ", " + y + ")";
    }
}

// An object that represents a set of Points in the plane. The `sort`
// function sorts the points according to the `Point.compareTo`
// function. The `reverse` function reverses the order of the
// points. The functions getXCoords and getYCoords return arrays
// containing x-coordinates and y-coordinates (respectively) of the
// points in the PointSet.
function PointSet () {
    this.points = [];
    this.curPointID = 0;

    // create a new Point with coordintes (x, y) and add it to this
    // PointSet
    this.addNewPoint = function (x, y) {
	this.points.push(new Point(x, y, this.curPointID));
	this.curPointID++;
    }

    // add an existing point to this PointSet
    this.addPoint = function (pt) {
	this.points.push(pt);
    }

    // sort the points in this.points
    this.sort = function () {
	this.points.sort((a,b) => {return a.compareTo(b)});
    }

    // reverse the order of the points in this.points
    this.reverse = function () {
	this.points.reverse();
    }

    // return an array of the x-coordinates of points in this.points
    this.getXCoords = function () {
	let coords = [];
	for (let pt of this.points) {
	    coords.push(pt.x);
	}

	return coords;
    }

    // return an array of the y-coordinates of points in this.points
    this.getYCoords = function () {
	let coords = [];
	for (pt of this.points) {
	    coords.push(pt.y);
	}

	return coords;
    }

    // get the number of points
    this.size = function () {
	return this.points.length;
    }

    // return a string representation of this PointSet
    this.toString = function () {
	let str = '[';
	for (let pt of this.points) {
	    str += pt + ', ';
	}
	str = str.slice(0,-2); 	// remove the trailing ', '
	str += ']';

	return str;
    }
}

// an object representing an edge in a graph
function Edge (vtx1, vtx2, id) {
    this.vtx1 = vtx1;   // first endpoint of the edge
    this.vtx2 = vtx2;   // second endpoint of the edge
    this.id = id;       // the unique identifier of this edge

    // determine if this edge has vtx1 and vtx2 as endpoints
    this.equals = function (vtx1, vtx2) {
	return (this.vtx1 == vtx1 && this.vtx2 == vtx2) || (this.vtx1 == vtx2 && this.vtx2 == vtx1);
    }
}


function ConvexHullViewer (svg, ps, text) {
    this.svg = svg;  // a n svg object where the visualization is drawn
    this.ps = ps;    // a point set of the points to be visualized
    this.text = text;        // a text box

    // COMPLETE THIS OBJECT
    // define the behavior for clicking on the svg element
    this.svg.addEventListener("click", (e) => {
        // create a new vertex
        this.createVertex(e);
    });

    // sets of highlighted/muted vertices and edges
    this.highVertices = [];
    this.lowVertices = [];
    this.highEdges = [];
    this.lowEdges = [];

    // create svg group for displaying edges
    this.edgeGroup = document.createElementNS(SVG_NS, "g");
    // this.edgeGroup.id = "graph-" + graph.id + "-edges";
    this.svg.appendChild(this.edgeGroup);

    // create svg group for displaying vertices
    this.vertexGroup = document.createElementNS(SVG_NS, "g");
    // this.vertexGroup.id = "graph-" + graph.id + "-vertices";
    this.svg.appendChild(this.vertexGroup);

    this.vertexElts = [];   // svg elements for vertices
    this.edgeElts = [];     // svg elements for edges

    // create a new vertex
    this.createVertex = function (e) {
        const rect = this.svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.ps.addNewPoint(x,y);
        const vtx = this.ps.points[this.ps.points.length - 1];
        console.log("vtx" + vtx.toString());
        this.addVertex(vtx);
        // this.graph.addVertex(vtx);
        this.updateTextBox(ps.toString());
    }

    // add a vertex to the visualization by creating an svg element
    this.addVertex = function (vtx) {
        const elt = document.createElementNS(SVG_NS, "circle");
        elt.classList.add("vertex");
        elt.setAttributeNS(null, "cx", vtx.x);
        elt.setAttributeNS(null, "cy", vtx.y);
        elt.setAttributeNS(null, "r", 10);

        elt.addEventListener("click", (e) => {
            e.stopPropagation(); // don't create another vertex (i.e., call event listener for the svg element in addition to the vertex
            this.clickVertex(vtx);
        });

        this.vertexGroup.appendChild(elt);
        this.vertexElts[vtx.id] = elt;
    }

    // method to be called when a vertex is clicked
    this.clickVertex = function (cur, vtx) {
        console.log("You clicked vertex " + vtx.id);
        let e = new Edge(cur, vtx);
        if (e != null) {
        this.addEdge(e);
        }
        this.unhighlightVertex(cur);
    }

    // add an edge to the visualization
    this.addEdge = function (edge) {
        const vtx1 = edge.vtx1;
        console.log("vtx1: " + vtx1);
        const vtx2 = edge.vtx2;
        const edgeElt = document.createElementNS(SVG_NS, "line");
        edgeElt.setAttributeNS(null, "x1", vtx1.x);
        edgeElt.setAttributeNS(null, "y1", vtx1.y);
        edgeElt.setAttributeNS(null, "x2", vtx2.x);
        edgeElt.setAttributeNS(null, "y2", vtx2.y);
        edgeElt.classList.add("edge");
        this.edgeElts[edge.id] = edgeElt;
        this.edgeGroup.appendChild(edgeElt);
        this.updateTextBox(this.ps.toString());
    }

    this.updateTextBox = function (str) {
        this.text.innerHTML = str;
    }

    /*********************************************************
     * Methods to (un)highlight and (un) mute vertices/edges *
    *********************************************************/

     this.highlightVertex = function (vtx) {
        const elt = this.vertexElts[vtx.id];
        elt.classList.add("highlight");
    }

    this.unhighlightVertex = function (vtx) {
        const elt = this.vertexElts[vtx.id];
        elt.classList.remove("highlight");
    }

    this.muteVertex = function (vtx) {
        const elt = this.vertexElts[vtx.id];
        elt.classList.add("muted");
    }

    this.unmuteVertex = function (vtx) {
        const elt = this.vertexElts[vtx.id];
        elt.classList.remove("muted");
    }

    this.muteAllVertices = function () {
        for (vtx of this.ps.points) {
            this.muteVertex(vtx);
        }
    }

    this.muteAll = function () {
        this.muteAllVertices();
    }

    this.unmuteAllVertices = function () {
        for (vtx of this.graph.vertices) {
            this.unmuteVertex(vtx);
        }
    }

    this.unmuteAll = function () {
        this.unmuteAllVertices();
    }
}

/*
 * An object representing an instance of the convex hull problem. A ConvexHull stores a PointSet ps that stores the input points, and a ConvexHullViewer viewer that displays interactions between the ConvexHull computation and the
 */
function ConvexHull (ps, viewer) {
    this.ps = ps;          // a PointSet storing the input to the algorithm
    this.viewer = viewer;  // a ConvexHullViewer for this visualization

    // start a visualization of the Graham scan algorithm performed on ps
    this.start = function () {
    // COMPLETE THIS METHOD
    const convexHull = this.getConvexHull();
    this.boundaryPoints = convexHull.points;
    this.startVertex = this.boundaryPoints.pop();

    if (this.startVertex == null) {
    viewer.updateTextBox("Please select a starting vertex and start again.");
    return;
    }

    this.visited = [];
    this.active = [];

    this.cur = this.startVertex;

    this.active.push(this.startVertex);
    this.visited.push(this.startVertex);

    this.viewer.muteAll();
    this.viewer.unmuteVertex(this.startVertex);

    console.log("Starting ConvexHull from vertex " + this.startVertex.id);
    };

    // perform a single step of the Graham scan algorithm performed on ps
    this.step = function () {

	// COMPLETE THIS METHOD
	// check if execution is finished
	if (this.active.length == 0) {
	    return;
	}

	// find the next unvisited neighbor of this.cur
	const next = this.nextUnvisitedNeighbor();

    // this.viewer.clickVertex(this.cur, next);
	
	if (next == null) {
	    // if no next neighbor, cur is no longer active
	    viewer.clickVertex(this.cur, this.startVertex);
        return;
	} else {
        viewer.clickVertex(this.cur, next);
	    viewer.unmuteVertex(next);
	    viewer.highlightVertex(next);
	    this.cur = next;
	    this.active.push(next);
	    this.visited.push(next);
	}
    }

    this.nextUnvisitedNeighbor = function () {
	for (vtx of this.boundaryPoints) {
	    if (!this.visited.includes(vtx)) {
		return vtx;
	    }
	}
	return null;
    }

    this.animate = function () {
        if (this.curAnimation == null) {
            this.start();
            this.curAnimation = setInterval(() => {
            this.animateStep();
            }, 1000);
        }
    }

    this.animateStep = function () {
        if (this.active.length > 0) {
            console.log("taking a step from vertex " + this.cur.id);
            this.step();
            this.active.pop();
        } else {
            this.stopAnimation();
        }
    }

    this.stopAnimation = function () {
        clearInterval(this.curAnimation);
        this.curAnimation = null;
        console.log("animation completed");
    }

    this.crossProduct = function (p1, p2, p3) {
        // Calculate the cross product of vectors (p2 - p1) and (p3 - p1)
        return (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
    }

    this.curve = function (points) {
        const stack = [];
        for (let i = 0; i < points.length; i++) {
            while (stack.length > 1 && (this.crossProduct(stack[stack.length - 2], stack[stack.length - 1], points[i]) <= 0)) {
                stack.pop();
            }
            stack.push(points[i]);
        }
        stack.pop();
        return stack;
    }

    // Return a new PointSet consisting of the points along the convex
    // hull of ps. This method should **not** perform any
    // visualization. It should **only** return the convex hull of ps
    // represented as a (new) PointSet. Specifically, the elements in
    // the returned PointSet should be the vertices of the convex hull
    // in clockwise order, starting from the left-most point, breaking
    // ties by minimum y-value.
    this.getConvexHull = function () {

        // COMPLETE THIS METHOD
        this.ps.sort();
        const upperCurve = this.curve(this.ps.points);

        ps.reverse();
        const lowerCurve = this.curve(this.ps.points);

        const convexPoints = upperCurve.concat(lowerCurve);
        convexPoints.push(this.ps.points[this.ps.points.length-1]);

        const convexHull = new PointSet();
        convexHull.points = convexPoints.reverse();

        return convexHull;

    }

}

let svg;
let text;
let pointSet;
let convexHullViewer;
let convexHull;

if (typeof document != 'undefined') {
    svg = document.querySelector("#convex-hull-box");
    text = document.querySelector("#convex-hull-text-box");
    pointSet = new PointSet();
    convexHullViewer =new ConvexHullViewer(svg, pointSet, text);
    convexHull = new ConvexHull(pointSet, convexHullViewer);
}

try {
    exports.PointSet = PointSet;
    exports.ConvexHull = ConvexHull;
  } catch (e) {
    console.log("not running in Node");
    }
