
var canvas = document.getElementById("demoCanvas");
var graphics = canvas.getContext("2d");
var map = new Map();

function init() {
    
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; //document.height is obsolete
    
    map.addMouseEventListenerToDocument();

    // Make 2 Players
    let p1 = new Player("#a44", "#eee");
    let p2 = new Player("#4a4", "#111");

    // Assign Kshetras to players randomly
    map.getKshetras().forEach(k => k.setOwner((Math.random() > 0.5)? p1 : p2));
}

init();

function draw() {
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    map.update();
    map.draw(graphics);
    requestAnimationFrame(draw);
}

draw();