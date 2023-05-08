const SVG_NS = "http://www.w3.org/2000/svg";

const TRUNK_HEIGHT = 160;
const TRUNK_WIDTH = 30;
const MAX_DEPTH = 12;
const LEFT_BRANCH_RATIO = 0.75;
const RIGHT_BRANCH_RATIO = 0.71;
const LEFT_ROTATION = 27;
const RIGHT_ROTATION = -43;

const svg = document.querySelector("#tree");
const treeGroup = document.querySelector("#tree-group");
const defs = document.querySelector("#tree-defs");

const branchBasic = document.createElementNS(SVG_NS, "line");
branchBasic.setAttributeNS(null, "id", "branch-basic");
branchBasic.setAttributeNS(null, "class", "branch");
branchBasic.setAttributeNS(null, "x1", "0");
branchBasic.setAttributeNS(null, "y1", "0");
branchBasic.setAttributeNS(null, "x2", "0");
branchBasic.setAttributeNS(null, "y2", `${TRUNK_HEIGHT}`);
branchBasic.setAttributeNS(null, "stroke", "black");
branchBasic.setAttributeNS(null, "stroke-width", `${TRUNK_WIDTH}`);
defs.appendChild(branchBasic);

let makeBasicBranch = function (x, y, height) {
    let trans = `translate(${x}, ${y}) scale(${height/TRUNK_HEIGHT})`;
    let treeBranch = document.createElementNS(SVG_NS, "use");
    treeBranch.setAttributeNS(null, "href", "#branch-basic");
    treeBranch.setAttributeNS(null, "transform", trans);
    return treeBranch;
}

let drawIteration = function (x, y, height, depth, parentGroup) {    
    let branch = makeBasicBranch(x, y, height);
    parentGroup.appendChild(branch);

    if (depth < MAX_DEPTH) {

	let leftGroup = document.createElementNS(SVG_NS, "g");
	leftGroup.setAttributeNS(null, "transform", `translate(${x}, ${y + height}) rotate(${LEFT_ROTATION})`);
	parentGroup.appendChild(leftGroup);
	drawIteration(0, 0, height * LEFT_BRANCH_RATIO, depth+1, leftGroup);

	let rightGroup = document.createElementNS(SVG_NS, "g");
	rightGroup.setAttributeNS(null, "transform", `translate(${x}, ${y + height}) rotate(${RIGHT_ROTATION})`);
	parentGroup.appendChild(rightGroup);
	drawIteration(0, 0, height * RIGHT_BRANCH_RATIO, depth+1, rightGroup);

    }
}


drawIteration(350, 50, TRUNK_HEIGHT, 0, treeGroup);








