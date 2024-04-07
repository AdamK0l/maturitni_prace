
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