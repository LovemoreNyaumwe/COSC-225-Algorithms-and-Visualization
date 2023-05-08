const SVG_NS = "http://www.w3.org/2000/svg";

function Graph(id) {
    this.id = id;            // (unique) ID of this graph
    this.vertices = [];      // set of vertices in this graph
    this.edges = [];         // set of edges in this graph
    this.nextVertexID = 0;   // ID to be assigned to next vtx
    this.nextEdgeID = 0;     // ID to be assigned to next edge
    
    // create a and return a new vertex at a given location
    this.createVertex = function (x, y) {
	const vtx = new Vertex(this.nextVertexID, this, x, y);
	this.nextVertexID++;
	return vtx;
    }

    // add vtx to the set of vertices of this graph, if the vtx is not
    // already stored as a vertex
    this.addVertex = function(vtx) {
	if (!this.vertices.includes(vtx)) {
	    this.vertices.push(vtx);
	    console.log("added vertex with id " + vtx.id);
	} else {
	    console.log("vertex with id " + vtx.id + " not added because it is already a vertex in the graph.");
	}
    }

    // create and return an edge between vertices vtx1 and vtx2;
    // returns existing edge if there is already an edge between the
    // two vertices
    this.addEdge = function(vtx1, vtx2) {
	if (!this.isEdge(vtx1, vtx2)) {
	    const edge = new Edge(vtx1, vtx2, this.nextEdgeID);
	    this.nextEdgeID++;
	    vtx1.addNeighbor(vtx2);
	    vtx2.addNeighbor(vtx1);
	    this.edges.push(edge);
	    console.log("added edge (" + vtx1.id + ", " + vtx2.id + ")");
	    return edge;
	} else {
	    console.log("edge (" + vtx1.id + ", " + vtx2.id + ") not added because it is already in the graph");
	    return null;
	}
    }

    // determine if vtx1 and vtx2 are already an edge in this graph
    this.isEdge = function (vtx1, vtx2) {
	return (this.getEdge(vtx1, vtx2) != null);
    }

    // return the edge object corresponding to a pair (vtx1, vtx2), or
    // null if no such edge is in the graph
    this.getEdge = function (vtx1, vtx2) {
	for(const edge of this.edges) {
	    if (edge.equals(vtx1, vtx2)) {
		return edge;
	    }
	}

	return null;
    }

    // return a string representation of the adjacency lists of the
    // vertices in this graph
    this.adjacencyLists = function () {
	let str = '';
	for (const vtx of this.vertices) {
	    str += vtx.id + ':';
	    for (const nbr of vtx.neighbors) {
		str += (' ' + nbr.id);
	    }
	    str += '<br>';
	}
	return str;
    }
}

// an object representing a vertex in a graph
// each vertex has an associated unique identifier (id), the graph
// containing the vertex, as well as x,y coordinates of the vertex's
// physical location
function Vertex(id, graph, x, y) {
    this.id = id;        // the unique id of this vertex
    this.graph = graph;  // the graph containing this vertex
    this.x = x;          // x coordinate of location
    this.y = y;          // y coordinate of location
	this.weight = Math.floor(Math.random() * 100);
    
    this.neighbors = []; // the adjacency list of this vertex

    // add vtx as a neighbor of this vertex, if it is not already a
    // neighbor
    this.addNeighbor = function (vtx) {
	if (!this.neighbors.includes(vtx)) {
	    this.neighbors.push(vtx);
	}
    }

    // remove vtx as a neighbor of this vertex
    this.removeNeighbor = function (vtx) {
	const index = this.neighbors.indexOf(vtx);
	if (index != -1) {
	    this.neighbors.splice(index, 1);
	}
    }

	this.getCost = function(fromNeighbor) {
		// Take diagonal weight into consideration.
		if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
		  return this.weight * 1.41421;
		}
		return this.weight;
	};

    // determine if vtx is a neighbor of this vertex
    this.hasNeighbor = function (vtx) {
	return this.neighbors.includes(vtx);
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

// an object to visualize and interact with a graph
function GraphVisualizer (graph, svg, text) {
    this.graph = graph;      // the graph we are visualizing
    this.svg = svg;          // the svg element we are drawing on
    this.text = text;        // a text box

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
    this.edgeGroup.id = "graph-" + graph.id + "-edges";
    this.svg.appendChild(this.edgeGroup);

    // create svg group for displaying vertices
    this.vertexGroup = document.createElementNS(SVG_NS, "g");
    this.vertexGroup.id = "graph-" + graph.id + "-vertices";
    this.svg.appendChild(this.vertexGroup);




    ////////////////////////////////////////////////////////////
    // NEW SINCE LECTURE 08
    ////////////////////////////////////////////////////////////

    // overlay vertices
    this.overlayVertices = [];

    // create svg group for displaying overlays
    this.overlayGroup = document.createElementNS(SVG_NS, "g");
    this.overlayGroup.id = "graph-" + graph.id + "-overlay";
    this.svg.appendChild(this.overlayGroup);

    this.addOverlayVertex = function (vtx) {
	const elt = document.createElementNS(SVG_NS, "circle");
	elt.classList.add("overlay-vertex");
	elt.setAttributeNS(null, "cx", vtx.x);
	elt.setAttributeNS(null, "cy", vtx.y);
	elt.setAttributeNS(null, "r", 15);
	this.overlayGroup.appendChild(elt);
	this.overlayVertices[vtx.id] = elt;
    }

    this.moveOverlayVertex = function (vtx1, vtx2) {
	const elt = this.overlayVertices[vtx1.id];
	this.overlayVertices[vtx1.id] = null;
	this.overlayVertices[vtx2.id] = elt;
	elt.setAttributeNS(null, "cx", vtx2.x);
	elt.setAttributeNS(null, "cy", vtx2.y);
	elt.setAttributeNS(null, "r", 15);
    }

    this.removeOverlayVertex = function (vtx) {
	const elt = this.overlayVertices[vtx.id];
	this.overlayGroup.removeChild(elt);	
    }

    ////////////////////////////////////////////////////////////
    // END NEW
    ////////////////////////////////////////////////////////////



    this.vertexElts = [];   // svg elements for vertices
    this.edgeElts = [];     // svg elements for edges

    // create a new vertex 
    this.createVertex = function (e) {
	const rect = this.svg.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	const vtx = graph.createVertex(x, y);
	this.addVertex(vtx);
	this.graph.addVertex(vtx);
	this.updateTextBox(graph.adjacencyLists());
    }

    // add a vertex to the visualization by creating an svg element
    this.addVertex = function (vtx) {
	const elt = document.createElementNS(SVG_NS, "circle");
	elt.classList.add("vertex");
	elt.setAttributeNS(null, "cx", vtx.x);
	elt.setAttributeNS(null, "cy", vtx.y);
	elt.setAttributeNS(null, "r", 10);

	const newText = document.createElementNS(SVG_NS,"text");
	newText.setAttributeNS(null,"x",vtx.x - 4);
	newText.setAttributeNS(null,"y",vtx.y + 2.5);
	newText.setAttributeNS(null,"font-size","10");
	newText.innerHTML = vtx.weight;


	elt.addEventListener("click", (e) => {
	    e.stopPropagation(); // don't create another vertex (i.e., call event listener for the svg element in addition to the vertex
	    this.clickVertex(vtx);
	});

	newText.addEventListener("click", (e) => {
	    e.stopPropagation(); // don't create another vertex (i.e., call event listener for the svg element in addition to the vertex
	    this.clickVertex(vtx);
	});

	this.vertexGroup.appendChild(elt);
	this.vertexGroup.appendChild(newText);
	this.vertexElts[vtx.id] = elt;
    }
    
    // method to be called when a vertex is clicked
    this.clickVertex = function (vtx) {
	console.log("You clicked vertex " + vtx.id);

	// check if any other highlighted vertices
	if (this.highVertices.length == 0) {
	    this.highVertices.push(vtx);
	    this.highlightVertex(vtx);
	} else if (this.highVertices.includes(vtx)) {
	    this.unhighlightVertex(vtx);
	    this.highVertices.splice(this.highVertices.indexOf(vtx), 1);
	} else {
	    const other = this.highVertices.pop();
	    let e = this.graph.addEdge(other, vtx);
	    if (e != null) {
		this.addEdge(e);
	    }
	    this.unhighlightVertex(other);
	}
    }

    // add an edge to the visualization
    this.addEdge = function (edge) {
	const vtx1 = edge.vtx1;
	const vtx2 = edge.vtx2;
	const edgeElt = document.createElementNS(SVG_NS, "line");
	edgeElt.setAttributeNS(null, "x1", vtx1.x);
	edgeElt.setAttributeNS(null, "y1", vtx1.y);
	edgeElt.setAttributeNS(null, "x2", vtx2.x);
	edgeElt.setAttributeNS(null, "y2", vtx2.y);

	// var edgeWeight =  Math.pow(Math.abs(vtx1.x - vtx2.x), 2) + Math.pow(Math.abs(vtx1.y - vtx2.y), 2);

	// const newText = document.createElementNS(SVG_NS,"text");
	// newText.setAttributeNS(null,"x", Math.abs(vtx1.x + vtx2.x) / 2);
	// newText.setAttributeNS(null,"y", Math.abs(vtx1.y + vtx2.y) / 2);
	// newText.setAttributeNS(null,"font-size","15");
	// newText.setAttributesNS(null, "color", "white");
	// newText.innerHTML = Math.floor(Math.sqrt(edgeWeight));

	edgeElt.classList.add("edge");
	this.edgeElts[edge.id] = edgeElt;
	this.edgeGroup.appendChild(edgeElt);
	// this.edgeGroup.appendChild(edgeWeight);
	this.updateTextBox(this.graph.adjacencyLists());
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

    this.highlightEdge = function (e) {
	const elt = this.edgeElts[e.id];
	elt.classList.add("highlight");	
    }

    this.unhighlightEdge = function (e) {
	const elt = this.edgeElts[e.id];
	elt.classList.remove("highlight");	
    }

    this.muteEdge = function (e) {
	const elt = this.edgeElts[e.id];
	elt.classList.add("muted");
    }

    this.unmuteEdge = function (e) {
	const elt = this.edgeElts[e.id];
	elt.classList.remove("muted");
    }

    this.muteAllVertices = function () {
	for (vtx of this.graph.vertices) {
	    this.muteVertex(vtx);
	}
    }

    this.muteAllEdges = function () {
	for (e of this.graph.edges) {
	    this.muteEdge(e);
	}
    }

    this.muteAll = function () {
	this.muteAllVertices();
	this.muteAllEdges();
    }

    this.unmuteAllVertices = function () {
	for (vtx of this.graph.vertices) {
	    this.unmuteVertex(vtx);
	}
    }

    this.unmuteAllEdges = function () {
	for (e of this.graph.edges) {
	    this.unmuteEdge(e);
	}
    }

    this.unmuteAll = function () {
	this.unmuteAllVertices();
	this.unmuteAllEdges();
    }
        
}

function Dfs (graph, vis) {
    this.graph = graph;
    this.vis = vis;
    this.startVertex = null;
    this.curAnimation = null;
    
    this.visited = [];
    this.active = [];
    this.cur = null;

    this.start = function () {
	this.startVertex = vis.highVertices.pop();
	
	if (this.startVertex == null) {
	    vis.updateTextBox("Please select a starting vertex and start again.");
	    return;
	}

	// todo: un-highlight previously highlighted stuff

	this.visited = [];
	this.active = [];
		
	this.cur = this.startVertex;
	this.vis.addOverlayVertex(this.cur);

	this.active.push(this.startVertex);
	this.visited.push(this.startVertex);

	
	this.vis.muteAll();
	this.vis.unmuteVertex(this.startVertex);
	
	console.log("Starting AStar from vertex " + this.startVertex.id);

    }

	this.end = function () {
		this.endVertex = vis.highVertices.pop();
		
		if (this.endVertex == null) {
			vis.updateTextBox("Please select an ending vertex and start again.");
			return;
		}
		
		console.log("Ending AStar from vertex " + this.endVertex.id);
	
	}

    this.step = function () {
	
	// check if execution is finished
	if (this.active.length == 0) {
	    return;
	}

	// find the next unvisited neighbor of this.cur
	const next = this.nextAstarNeighbor();
	
	if (next == null) {
	    // if no next neighbor, cur is no longer active
	    const prev = this.active.pop();
	    this.vis.unhighlightVertex(prev);
	    if (this.active.length > 0) {
		this.cur = this.active[this.active.length - 1];
		const edge = this.graph.getEdge(prev, this.cur);
		this.vis.unhighlightEdge(edge);
		this.vis.moveOverlayVertex(prev, this.cur);
	    } else {
		this.vis.removeOverlayVertex(this.cur);
		this.cur = null;
	    }
	} else {
	    const edge = this.graph.getEdge(this.cur, next);
	    vis.unmuteEdge(edge);
	    vis.highlightEdge(edge);
	    vis.unmuteVertex(next);
	    vis.highlightVertex(next);
	    this.vis.moveOverlayVertex(this.cur, next);
	    this.cur = next;
	    this.active.push(next);
	    this.visited.push(next);
	}
    }

    this.animate = function () {
	if (this.curAnimation == null) {
	    // this.start();
	    this.curAnimation = setInterval(() => {
		this.animateStep();
	    }, 1000);
	}
    }

    this.animateStep = function () {
	if (this.active.length > 0) {
	    console.log("taking a step from vertex " + this.cur.id);
	    this.step();
	} else {
	    this.stopAnimation();
	}
    }

    this.stopAnimation = function () {
	clearInterval(this.curAnimation);
	this.curAnimation = null;
	console.log("animation completed");
    }

	//Algorithm adapted from wikipedia https://en.wikipedia.org/wiki/A*_search_algorithm
	this.reconstructPath = function (cameFrom, current) {
		total_path = [];
		total_path.push(current);
		while (cameFrom.has(current)) {
			current = cameFrom.get(current);
			total_path.push(current)
		}
		return total_path.reverse();
	}

	// A* finds a path from start to goal.
	// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
	this.A_star = function (start, goal) {
		// The set of discovered nodes that may need to be (re-)expanded.
		// Initially, only the start node is known.
		// This is usually implemented as a min-heap or priority queue rather than a hash-set.
		openSet = new minHeap();
		openSet.push(start);

		// For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from the start
		// to n currently known.
		cameFrom = new Map();

		// For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
		gScore = new Map();
		gScore.set(start, 0);

		// For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
		// how cheap a path could be from start to finish if it goes through n.
		fScore = new Map();
		fScore.set(start, 0);

		while (openSet.size() != 0) {
			openSet.toString();
			console.log("entering while");
			// This operation can occur in O(Log(N)) time if openSet is a min-heap or a priority queue
			// current := the node in openSet having the lowest fScore[] value
			current = openSet.pop();
			if (current == goal)
				return this.reconstructPath(cameFrom, current)

			// openSet.remove(current);
			for (neighbor of current.neighbors){
				console.log("entering For");
				// d(current,neighbor) is the weight of the edge from current to neighbor
				// tentative_gScore is the distance from start to the neighbor through current
				tentative_gScore = gScore.get(current) + neighbor.getCost();
				// try {
				// 	console.log("entering try");
				// 	gScore.get(neighbor) == null;
				// } catch {
				// 	console.log("entering catch");
				// 	gScore.set(neighbor, Infinity);
				// }
				if (gScore.get(neighbor) == null) {
					gScore.set(neighbor, Infinity);
				}
				if (tentative_gScore < gScore.get(neighbor)) {
					console.log("entering if");
					// This path to neighbor is better than any previous one. Record it!
					cameFrom.set(neighbor, current);
					gScore.set(neighbor, tentative_gScore);
					fScore.set(neighbor, tentative_gScore + this.manhattanHeuristic(neighbor, current));
					if (!openSet.contains(neighbor)){
						console.log("entering 2nd if");
						openSet.push(neighbor);
					}
				}
			}
		}
		// Open set is empty but goal was never reached
		return [];
	}

	this.manhattanHeuristic = function (neighbor, current) {
		var d1 = Math.abs(neighbor.x - current.x);
		var d2 = Math.abs(neighbor.y - current.y);
		return d1 + d2;
	}

	this.nextAstarNeighbor = function () {
		console.log("starting vertex:" + this.startVertex);
		console.log("ending vertex:" + this.endVertex);
		for (vtx of this.A_star(this.startVertex, this.endVertex)) {
			if (!this.visited.includes(vtx)) {
				return vtx;
			}
		}
		return null;
	}


}

function minHeap () {
    this.data = [];

    this.push = function(element) {
        // Add the new element to the end of the array.
        this.data.push(element);
    
        // Update minheap, bubbling down.
        this.bubbleDown(this.data.length - 1);
    }

    this.pop = function() {
        // Store the first element for return.
        var result = this.data[0];
        // Get last element in array.
        var end = this.data.pop();
        // If there are any elements left, put the end element at the
        // start, and bubble up.
        if (this.data.length > 0) {
          this.data[0] = end;
          this.bubbleUp(0);
        }
        return result;
    }

    this.size = function() {
        return this.data.length;
    }

    this.scoreFunction = function(element) {
        return element.weight;
    }

    this.bubbleDown = function(n) {
        // Fetch the element to update its position.
        var element = this.data[n];
    
        // When at 0, an element can not be updated further.
        while (n > 0) {
    
          // Compute the parent element's index.
          var parentIndex = ((n + 1) >> 1) - 1;
          var parent = this.data[parentIndex];
          // Swap the elements if the parent is greater.
          if (this.scoreFunction(element) < this.scoreFunction(parent)) {
            this.data[parentIndex] = element;
            this.data[n] = parent;
            n = parentIndex;
          }
          // Found a parent that is less, no need to update any further.
          else {
            break;
          }
        }
    }

    this.bubbleUp = function(n) {
        // Look up the target element and its weight.
        var length = this.data.length;
        var element = this.data[n];
        var elemScore = this.scoreFunction(element);
    
        while (true) {
          // Compute the indices of the child elements.
          var secondChild = (n + 1) << 1;
          var firstChild = secondChild - 1;
          // This is used to store the new position of the element, if any.
          var swap = null;
          var firstChildScore;
          // If the first child exists
          if (firstChild < length) {
            // Look it up and compute its score.
            var child1 = this.data[firstChild];
            firstChildScore = this.scoreFunction(child1);
    
            // If the score is less than our element's, we need to swap.
            if (firstChildScore < elemScore) {
              swap = firstChild;
            }
          }
    
          // Do the same checks for the other child.
          if (secondChild < length) {
            var child2 = this.data[secondChild];
            var secondChildScore = this.scoreFunction(child2);
            if (secondChildScore < (swap === null ? elemScore : firstChildScore)) {
              swap = secondChild;
            }
          }
    
          // If the element needs to be moved, swap it, and continue.
          if (swap !== null) {
            this.data[n] = this.data[swap];
            this.data[swap] = element;
            n = swap;
          }
          // Otherwise, we are done.
          else {
            break;
          }
        }
    }

	this.contains = function(node) {
		for (element of this.data) {
			if (element == node) {
				return true;
			}
		}
		return false;
	}

	this.toString = function() {
        for (element of this.data) {
			console.log(element);
		}
    }

}

const svg = document.querySelector("#graph-box");
const text = document.querySelector("#graph-text-box");
const graph = new Graph(0);
const gv = new GraphVisualizer(graph, svg, text);
const dfs = new Dfs(graph, gv);