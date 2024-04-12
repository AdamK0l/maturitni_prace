
function go_to_sudoku_solver() {
    window.location.href = "sudoku_solver_page.html";
}

function go_to_about_sudoku() {
    window.location.href = "about_sudoku_page.html";
}

function go_to_sudoku_history() {
    window.location.href = "sudoku_history_page.html";
}

function go_to_sudoku_tactics() {
    window.location.href = "sudoku_tactics_page.html";
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