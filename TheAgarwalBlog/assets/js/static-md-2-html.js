
document.addEventListener("DOMContentLoaded", function(event) {
    const text = document.body.innerHTML;
    var converter = new showdown.Converter();
    let mdText = converter.makeHtml(text);
    document.body.innerHTML = mdText;
});