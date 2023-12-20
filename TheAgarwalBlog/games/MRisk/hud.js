
class HUD {
    constructor(width, height) {
        this.x = 0; 
        this.y = height*0.825; 
        this.w = width*0.8; 
        this.h = height*0.175;
        this.labelX = width * 0.05; this.labelY = height*0.975;
        this.buttons = [];
        this.label = '';
        this.screenWidth = width;
        this.screenHeight = height;
    }

    initButtons () {
        let buttonWidth = this.screenWidth*0.05;
        let buttonHeight = this.screenHeight*0.065;
        let buttonY = this.screenHeight*0.87;
        this.buttons = this.buttons.concat([ 
            new Button('Add', this.screenWidth * 0.05, buttonY, buttonWidth, buttonHeight),
            new Button('Attack', this.screenWidth * 0.125, buttonY, buttonWidth, buttonHeight),
            new Button('Pass', this.screenWidth * 0.2, buttonY, buttonWidth, buttonHeight),
        ]);
    }

    draw (ctx){
        ctx.fillStyle = "#ff04";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        this.buttons.forEach(s => s.draw(ctx));
        ctx.fillStyle = "#fff";
        ctx.fillText(this.label, this.labelX, this.labelY);
    }

    getButtonAt (x, y){
        for(let i of this.buttons){
            if(i.contains(x, y)) return i;
        }
    }

    showAddButtons () {
        this.buttons = this.buttons.concat([
            new Button("Infantry", width * 0.50, height * 0.87, width*0.075, height*0.1),
            new Button("Cavalry", width * 0.60, height * 0.87, width*0.075, height*0.1),
            new Button("Artillery", width * 0.70, height * 0.87, width*0.075, height*0.1),
        ]);
    }
    hideAddButtons () {
        this.buttons = this.buttons.filter(s => 
            s.name !== "Infantry" && s.name !== "Cavalry" && s.name !== "Artillery"
        );
    }

    enableAllButtons() {
        this.buttons.forEach(s => { s.disabled = false; });
    }

    disableButton(buttonName) {
        this.buttons.filter(s => s.name === buttonName).forEach(s => { s.disabled = true; });
    }
}

/*
// Define the box properties
const boxWidth = 200;
const boxHeight = 100;
const boxX = 100;
const boxY = 50;

// Define the trapezoid properties
const topWidth = 50;
const bottomWidth = 100;
const height = 75;

// Initial y position of the trapezoid (outside the box)
let yPosition = -height;

// Animation speed (pixels per frame)
const animationSpeed = 5;

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function drawBox() {
  ctx.fillStyle = 'black';
  ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
}

function drawClippedTrapezoid(y) {
  // Save drawing state
  ctx.save();

  // Clip the drawing area to the box
  ctx.beginPath();
  ctx.rect(boxX, boxY, boxWidth, boxHeight);
  ctx.clip();

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(boxX, y);
  ctx.lineTo(boxX + topWidth, y + height);
  ctx.lineTo(Math.min(boxX + bottomWidth, boxX + boxWidth - (y - boxY) / height * (bottomWidth - topWidth)), y + height);
  ctx.lineTo(boxX + boxWidth, y);
  ctx.closePath();
  ctx.fill();

  // Restore drawing state
  ctx.restore();
}

function animate() {
  yPosition += animationSpeed;

  // Clear canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBox();

  // Check if trapezoid is within the box
  if (yPosition <= boxY + boxHeight) {
    drawClippedTrapezoid(yPosition);
  } else {
    // Reset y position for next animation cycle
    yPosition = -height;
  }

  requestAnimationFrame(animate);
}

// Start the animation
animate();


*/