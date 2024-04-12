
document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll('div[contenteditable]');

    cells.forEach(cell => {
        cell.addEventListener('input', () => {
            const value = parseInt(cell.innerText);
            if (isNaN(value) || value < 1 || value > 9) {
                cell.innerText = '';
            }
        });
    });
});

function delete_numbers(){
    const cells = document.querySelectorAll('div[contenteditable]');
    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.backgroundColor = "lightgray";
    })
}

function change_language(){
    var paragraphs = document.querySelectorAll('p[data-lang]');
    for (var i = 0; i < paragraphs.length; i++) {
        var paragraph = paragraphs[i];
        if (paragraph.style.display == "none") {
            paragraph.style.display = 'block';
        } else {
            paragraph.style.display = 'none';
        }
    }
}

function convert_to_double_array(){
    let editableDivs = document.querySelectorAll('div[contenteditable]');
    let array = [];
    editableDivs.forEach(function(div) {
        let value = div.textContent.trim();
        if (value === "") {
            array.push([0]);
        } else {
            array.push([parseInt(value)]);
        }
    })
    
    help_array = [];

    for (let i = 0; i < array.length; i++) {
        help_array.push(array[i][0]);
    }

    double_array = [];

    for (let i = 0; i < help_array.length; i += 9) {
        double_array.push(help_array.slice(i, i + 9));
    }
    return double_array;
}

function check_if_valid(){
    board = convert_to_double_array();
    
    for (let row = 0; row < 9; row++) {
        if (!isValidRow(board, row)) {
            return false;
        }

    }
    for (let col = 0; col < 9; col++) {
        if (!isValidColumn(board, col)) {
            return false;
        }
    }

    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            if (!isValidBox(board, row, col)) {
                return false;
            }
        }
    }
    return true;
}

function check_if_valid_on_click() {
    if (check_if_valid()) {
        alert("Zadání je řešitelné");
    }
    else {
        alert("Zadání nelze řešit");
    }
}

function isValidRow(board, row) {
    const set = new Set();
    for (let col = 0; col < 9; col++) {
        const num = board[row][col];
        if (num !== 0) {
            if (set.has(num)) {
                return false;
            }
            set.add(num);
        }
    }
    return true;
}

function isValidColumn(board, col) {
    const set = new Set();
    for (let row = 0; row < 9; row++) {
        const num = board[row][col];
        if (num !== 0) {
            if (set.has(num)) {
                return false;
            }
            set.add(num);
        }
    }
    return true;
}

function isValidBox(board, startRow, startCol) {
    const set = new Set();
    for (let row = startRow; row < startRow + 3; row++) {
        for (let col = startCol; col < startCol + 3; col++) {
            const num = board[row][col];
            if (num !== 0) {
                if (set.has(num)) {
                    return false;
                }
                set.add(num);
            }
        }
    }
    return true;
}

function possible(x, y, n) {
    return is_valid(convert_to_double_array(), x, y, n);
}

function is_valid(board, x, y, n) {
    not_in_row = true;
    if (board[x].includes(n)) {
        not_in_row = false;
    }
    not_in_column = true
    for (let i = 0; i < 9; i++) {
        if (board[i][y] === n) {
            not_in_column = false;
            break
        }
    }
    not_in_box = true;
    for (let i = x - (x % 3); i < x - (x % 3) + 3; i++) {
        for (let j = y - (y % 3); j < y - (y % 3) + 3; j++) {
            if (board[i][j] === n) {
                not_in_box = false;
                break;
            }
        }
        if (!not_in_box) {
            break;
        }
    }

    return not_in_box && not_in_column && not_in_row;
}

n = 0

function solve(board = convert_to_double_array(), r = 0, c = 0) {
    if (!check_if_valid()) {
        return false;
    }
    console.log(board = convert_to_double_array());
    n++;
    if (r == 9) {
        alert("Počet vygenerovaných stavů: " + n);
        n = 0;
        return true;
    }
    else if (c == 9) {
        return solve(board, r+1, c = 0);
    }
    else if (board[r][c] != 0) {
        return solve(board, r, c+1);
    }
    else {
        for (let k = 1; k < 10; k++) {
            if (is_valid(board, r, c, k)){
                let editableDivs = document.querySelectorAll('div[contenteditable]');
                editableDivs[(r*9) + c].textContent = k;
                if (solve(board, r, c+1)) {
                    return true;
                }
                editableDivs[(r*9) + c].textContent = "";
            }
        }
        return false
    }
}

function go_to_home_page() {
    window.location.href = "index.html";
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generate() {
    for(let i = 0; i < 9;  i++) {
        x = getRandomInt(9);
        y = getRandomInt(9);
        let editableDivs = document.querySelectorAll('div[contenteditable]');
        if(is_valid(board = convert_to_double_array(), x, y, i)) {
            editableDivs[x*9 + y].textContent = i;
        }
    }
}

function color_nums() {
    if (!check_if_valid()) {
        return false;
    }
    let editableDivs = document.querySelectorAll('div[contenteditable]');
    editableDivs.forEach(function(div) {
        if(div.textContent != "") {
            div.style.backgroundColor = "rgb(240, 93, 93)";
        }
    }
    )
}

function set1() {
    delete_numbers();
    set = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 4, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    let editableDivs = document.querySelectorAll('div[contenteditable]');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (set[i][j] == 0) {
                editableDivs[i*9 + j].textContent = "";
            }
            else {
                editableDivs[i*9 + j].textContent = set[i][j];
            }
            

        }
    }
}

function set2() {
    delete_numbers();
    set = [
        [3, 4, 0, 0, 7, 1, 2, 0, 0],
        [0, 9, 1, 2, 0, 0, 7, 0, 0],
        [0, 0, 6, 3, 0, 0, 0, 0, 1],
        [4, 7, 0, 0, 0, 0, 8, 6, 5],
        [1, 0, 0, 5, 0, 8, 3, 7, 0],
        [0, 0, 0, 0, 6, 4, 0, 0, 0],
        [0, 0, 3, 0, 2, 0, 6, 0, 8],
        [0, 0, 7, 0, 1, 5, 0, 0, 0],
        [2, 0, 4, 6, 0, 3, 9, 1, 7]
    ];
    let editableDivs = document.querySelectorAll('div[contenteditable]');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (set[i][j] == 0) {
                editableDivs[i*9 + j].textContent = "";
            }
            else {
                editableDivs[i*9 + j].textContent = set[i][j];
            }
            

        }
    }
}

function set3() {
    delete_numbers();
    set = [
        [6, 0, 0, 0, 0, 0, 0, 9, 7],
        [3, 4, 2, 7, 9, 6, 0, 0, 0],
        [9, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 9, 0, 4, 3, 0, 0, 6, 0],
        [0, 0, 0, 0, 8, 0, 9, 0, 0],
        [5, 0, 3, 9, 0, 1, 7, 0, 0],
        [2, 3, 0, 8, 5, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 3, 5, 4, 0],
        [0, 6, 5, 0, 0, 0, 3, 0, 0]
    ];
    let editableDivs = document.querySelectorAll('div[contenteditable]');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (set[i][j] == 0) {
                editableDivs[i*9 + j].textContent = "";
            }
            else {
                editableDivs[i*9 + j].textContent = set[i][j];
            }
            

        }
    }
}

function set4() {
    delete_numbers();
    set = [
        [0, 0, 0, 9, 6, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 0],
        [0, 8, 0, 1, 0, 0, 0, 9, 0],
        [0, 0, 8, 0, 0, 0, 0, 3, 2],
        [6, 1, 9, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 4],
        [0, 0, 0, 0, 0, 3, 5, 0, 7],
        [1, 0, 0, 0, 0, 8, 0, 0, 0],
        [0, 5, 0, 0, 2, 0, 0, 0, 0]
    ];
    let editableDivs = document.querySelectorAll('div[contenteditable]');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (set[i][j] == 0) {
                editableDivs[i*9 + j].textContent = "";
            }
            else {
                editableDivs[i*9 + j].textContent = set[i][j];
            }
            

        }
    }
}