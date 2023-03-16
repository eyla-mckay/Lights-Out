// MAIN
var size = 5; // grid size
var gridContainer = document.getElementById("gridContainer");
gridContainer.innerHTML = makeGrid(size);
attributeValues();

// build a grid of n x n input elements
function makeGrid(n) {
    // update grid container template layout
    let layout = ""
    for (i = 0; i < n; i++) {
        layout += " 100px";
    } // e.g. 100px 100px 100px 100px 100px;
    gridContainer.style.gridTemplateRows = layout;
    gridContainer.style.gridTemplateColumns = layout;

    // create grid elements
    let result = ``;
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            // e.g. <input id="gridElementXY" class="gridElement" type="button" onclick="press(x,y)" value="gridElem${(i)*5+j}\n(x:${i}, y:${j})"/>
            result += `<input id="gridElement${i}${j}"  class="gridElement" type="button" onclick="press(${i},${j});"/>
            `;
        }
    }
    debugLog(`Initialising...`)
    return result;
}

// set all lights to black
function attributeValues() {
    for (i = 0; i < size; i++) { // for each row
        for (j = 0; j < size; j++) { // for each column
            let contentId = document.getElementById(`gridElement${i}${j}`);
            contentId.style.backgroundColor = "black";
            contentId.style.color = "grey";
        }
    }
    debugLog(`│- ...done.`);
}

// trigger when pressing a light
function press(x,y,ignoreLogs) {
    ignoreLogs = ignoreLogs || false;
    if (!ignoreLogs) {
        debugLog(`Pressing at coordinates (${x},${y}):`);
    }
    flip(x,y); // centre
    if (x>0) {
        flip(x-1,y); // left
    }
    if (x<size-1) {
        flip(x+1,y); // right
    }
    if (y>0) {
        flip(x,y-1); // above
    }
    if (y<size-1) {
        flip(x,y+1); // below
    }
}

// flip light at coordinates
function flip(x,y) {
    debugLog(`| |- Flipping at coordinates (${x},${y})`);
    let contentId = document.getElementById(`gridElement${x}${y}`);
    if (contentId.style.backgroundColor == "yellow") {
        contentId.style.backgroundColor = "black";
    } else if (contentId.style.backgroundColor == "black") {
        contentId.style.backgroundColor = "yellow";
    }
}

// show or hide functionalities panel
function toggle() {
    contentId = document.getElementById("functionalities");
    if (contentId.style.display == "none") {
        contentId.style.display = "block";
    } else {
        contentId.style.display = "none";
    }
}

// press n random lights
function randomise() {
    let n = size*2;
    debugLog(`Randomising (${n} presses)...:`);
    let i = 0;
    while (i<n) {
        let a = Math.round(Math.random() * (size-1));
        let b = Math.round(Math.random() * (size-1));
        press(a,b,true);
        i++;
    }
    debugLog(`|- ...randomisation done.`);
}

// DEBUG TOOLS

// process logger (debug)
document.getElementById("logNotes").innerHTML = `LOG:<br/>`
function debugLog(string) {
    document.getElementById("logNotes").innerHTML += string+`<br/>`;
}

// display array of values (debug)
function display(array) {
    // build plaintext table
    let result = `[`
    for (i = 0; i < array.length-1; i++) {
        result += `[${array[i]}],<br/> `;
    }
    result += `[${array[array.length-1]}]]`;
    document.getElementById("display").innerHTML = result;
}

// match index to coordinates (debug)
function numToXY(num) {
    let x = Math.floor(num / size);
    let y = num-(size*x);
    return [x,y];
}

// match coordinates to index (debug)
function xyToNum (x,y) {
    let num = (x)*5+y;
    return num;
}
