
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
            alert("Zadání nelze řešit");
            return false;
        }

    }
    for (let col = 0; col < 9; col++) {
        if (!isValidColumn(board, col)) {
            alert("Zadání nelze řešit");
            return false;
        }
    }

    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            if (!isValidBox(board, row, col)) {
                alert("Zadání nelze řešit");
                return false;
            }
        }
    }
    alert("Zadání je řešitelné")
    return true;
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


function solve(board = convert_to_double_array(), r = 0, c = 0) {
    if (r == 9) {
        return true;
    }
    else if (c == 9) {
        return solve(board = convert_to_double_array(), r+1, c = 0);
    }
    else if (board[r][c] != 0) {
        return solve(board = convert_to_double_array(), r, c+1);
    }
    else {
        for (let k = 1; k < 10; k++) {
            if (is_valid(board = convert_to_double_array(), r, c, k)){
                let editableDivs = document.querySelectorAll('div[contenteditable]');
                editableDivs[(r*9) + c].textContent = k;
                if (solve(board = convert_to_double_array(), r, c+1)) {
                    return true;
                }
                editableDivs[(r*9) + c].textContent = "";
            }
        }
        return false
    }
}
