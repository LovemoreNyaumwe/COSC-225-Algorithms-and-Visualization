const SVG_NS = "http://www.w3.org/2000/svg";

const TRUNK_HEIGHT = 160;
const TRUNK_WIDTH = 30;
const MAX_DEPTH = 9;
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
// branchBasic.setAttributeNS(null, "stroke", "black");
branchBasic.setAttributeNS(null, "stroke-width", `${TRUNK_WIDTH}`);
defs.appendChild(branchBasic);

let makeBasicBranch = function (x, y, height, color) {
    let trans = `translate(${x}, ${y}) scale(${height/TRUNK_HEIGHT})`;
    let treeBranch = document.createElementNS(SVG_NS, "use");
    treeBranch.setAttributeNS(null, "href", "#branch-basic");
    treeBranch.setAttributeNS(null, "transform", trans);
    treeBranch.setAttributeNS(null, "stroke", color);
    return treeBranch;
}

let getTransformMatrix = function (x1, y1, x2, y2) {
    let a = (x2 - x1) / TRUNK_HEIGHT;
    let b = (y2 - y1) / TRUNK_HEIGHT;
    let c = -b;
    let d = a;
    let e = x1;
    let f = y1;

    return `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
}

let drawIteration = function (x, y, height, depth, parentGroup) {
    let ratio = depth / MAX_DEPTH;
    let branch = makeBasicBranch(x, y, height, `rgb(${20 * ratio}, ${160 * ratio}, ${30 * ratio})`);
    parentGroup.appendChild(branch);

    if (depth < MAX_DEPTH) {

	let leftGroup = document.createElementNS(SVG_NS, "g");
	leftGroup.setAttributeNS(null, "transform", `translate(${x}, ${y + height}) rotate(${LEFT_ROTATION})`);
	leftGroup.innerHTML = '<animateTransform attributeName="transform" type="rotate" values="-2; 2; -2;" keyTimes="0; 0.5; 1.0;" keySplines="0.3 0.1 0.7 0.9; 0.3 0.1 0.7 0.9;" calcMode="spline" additive="sum" dur="6s" repeatCount="indefinite"/>';
	parentGroup.appendChild(leftGroup);
	drawIteration(0, 0, height * LEFT_BRANCH_RATIO, depth+1, leftGroup);

	let rightGroup = document.createElementNS(SVG_NS, "g");
	rightGroup.setAttributeNS(null, "transform", `translate(${x}, ${y + height}) rotate(${RIGHT_ROTATION})`);
	rightGroup.innerHTML = '<animateTransform attributeName="transform" type="rotate" values="-2; 2; -2;" keyTimes="0; 0.5; 1.0;" keySplines="0.3 0.1 0.7 0.9; 0.3 0.1 0.7 0.9;" calcMode="spline" additive="sum" dur="5s" repeatCount="indefinite"/>';

	parentGroup.appendChild(rightGroup);
	drawIteration(0, 0, height * RIGHT_BRANCH_RATIO, depth+1, rightGroup);

    }

}


drawIteration(350, 50, TRUNK_HEIGHT, 0, treeGroup);








