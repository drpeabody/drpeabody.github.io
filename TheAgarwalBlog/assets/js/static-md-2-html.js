
document.onload = () => {
    console.log("Yolo");
    const text = document.body.innerHTML;
    var converter = new showdown.Converter();
    let mdText = converter.makeHtml(text);
    document.body.innerHTML = mdText;
}