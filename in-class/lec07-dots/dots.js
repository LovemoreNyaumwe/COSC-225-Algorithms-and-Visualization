const ns = "http://www.w3.org/2000/svg";

const box = document.querySelector("#dot-box");
box.addEventListener("click", drawDot);

function drawDot(e) {
    console.log("you drew a dot!");
    let rect = box.getBoundingClientRect();

    /* complete this */
    var dot = document.createElementNS(ns, 'circle');
    var x = e.clientX - rect.x;
    var y = e.clientY - rect.y;
    dot.setAttributeNS(null, "cx", x);
    dot.setAttributeNS(null, "cy", y);
    dot.classList.add("dot");
    box.appendChild(dot);

}
