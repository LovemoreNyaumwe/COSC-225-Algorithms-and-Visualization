function drawTiles(gridRows, gridCols) {
    const grid = document.getElementById('grid');
    var root = document.querySelector(':root');

    // let colorSet = new Set();

    var gridHover = '.tile:hover {border-color: white;}';
    var gridHoverStyle = document.createElement('style');

    root.style.setProperty('--grid-rows', gridRows);
    root.style.setProperty('--grid-columns', gridCols);

    let r = 0, g = 128, b = 255;

    for(cellIndex = 0; cellIndex < (gridRows * gridCols); cellIndex++) {
        let gridCell = document.createElement("div");
        let cellColor = 'rgb(' + r + ',' + g + ',' + b + ')';

        // if (!colorSet.has(cellColor)) {
        //     gridCell.style.backgroundColor = cellColor;
        // }
        gridCell.style.backgroundColor = cellColor;

        if (gridHoverStyle.styleSheet) {
            gridHoverStyle.styleSheet.cssText = gridHover;
        } else {
            gridHoverStyle.appendChild(document.createTextNode(gridHover));
        }
        document.getElementsByTagName('head')[0].appendChild(gridHoverStyle);

        grid.appendChild(gridCell).className = "tile";

        if (g < 255) {
            g++;
        }
        if (g >= 255) {
            b++;
            r++;
        }
        if (g >= 255) {
            g--;
        }
        if (r > 255) {
            r--;
        }
        if (r >= 255) {
            b++;
        }
        if (b >= 255) {
            b--;
        }
    }
}