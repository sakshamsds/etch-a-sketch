
const board = document.querySelector('.board');

function createGrid(size) {
    for (let i = 0; i < size; i++) {
        // create row
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < size; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            // square.classList.add((16 * i) + (j+1));

            row.appendChild(square);
        }

        board.appendChild(row);
    }
}

createGrid(16);

function createRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function darkenBy10Percent(color, amount = 10) {
    // extract rgb using regex
    rgb = color.match(/\d+/g);

    // increase by amount
    let r = Math.max(0, parseInt(rgb[0]) - Math.floor(255 * amount / 100));
    let g = Math.max(0, parseInt(rgb[1]) - Math.floor(255 * amount / 100));
    let b = Math.max(0, parseInt(rgb[2]) - Math.floor(255 * amount / 100));

    return "rgb(" + r + "," + g + "," + b + ")";
}

function changeColorOnHover(event) {
    // by default empty color = ""
    console.log(event.target.style.backgroundColor);
    if (event.target.style.backgroundColor === "" || event.target.style.backgroundColor === "white") {
        // get new color if empty or white
        event.target.style.background = createRandomColor();
    } else {
        // darken the square if not empty
        event.target.style.backgroundColor = darkenBy10Percent(event.target.style.backgroundColor, 10);
    }
}

function addColorEventToSquares() {
    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        square.addEventListener('mouseover', changeColorOnHover)
    })
}

addColorEventToSquares();

// RESET BUTTON
const resetButton = document.querySelector('.reset');

resetButton.addEventListener('click', () => {
    // get all squares and make them white
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = 'white';
    })
})

// NEW GRID BUTTON
const newGridButton = document.querySelector('.new-grid');

newGridButton.addEventListener('click', function (e) {
    let input = prompt("Please enter grid size value less than 100", 64);
    input = input > 100 ? 100 : input;
    // remove previous grid
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    createGrid(input);
    addColorEventToSquares();
})
