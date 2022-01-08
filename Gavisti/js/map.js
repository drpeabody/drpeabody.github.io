
const SCALE_MIN = 0.3;
const SCALE_MAX = 2.0;

class Map {

    // Kshetras are implicitly defined in kshetra.js
    constructor() {
        this.mouseLastPosX = 0.0;
        this.mouseLastPosY = 0.0;
        this.mouseFirstButtonHeld = false;
        this.moveMapBy(0, -320);
        this.x = 0;
        this.y = -320;
        this.scale = 0.8;
    }

    update() {
        if(this.x * this.scale > 1200) this.x = 1200 / this.scale;
        if(this.x * this.scale < -650) this.x = -650 / this.scale;
        if(this.y * this.scale > 500) this.y = 500 / this.scale;
        if(this.y * this.scale < -800) this.y = -800 / this.scale;
        if(this.scale < SCALE_MIN) this.scale = 0.3;
        if(this.scale > SCALE_MAX) this.scale = 2.0;
    }

    moveMapBy(x, y) {
        this.x += x / this.scale;
        this.y += y / this.scale;
    }

    toMapSpace(x, y) {
        return [(x + this.x) * this.scale, (y + this.y) * this.scale];
    }

    draw(graphics) {
        graphics.strokeStyle = "#f00";
        graphics.beginPath();
        graphics.moveTo(...this.toMapSpace(10, 10));
        graphics.lineTo(...this.toMapSpace(10, 710));
        graphics.lineTo(...this.toMapSpace(1270, 710));
        graphics.lineTo(...this.toMapSpace(1270, 10));
        graphics.lineTo(...this.toMapSpace(10, 10));
        graphics.closePath();
        graphics.stroke();
        Kshetras.forEach(k => k.draw(graphics, this.x, this.y, this.scale));
        Kshetras.forEach(k => k.drawNames(graphics, this.x, this.y, this.scale));
    }

    getIndexOfKshetraByName(name) {
        if(!name || name == null || name === '' ) {
            clog('Null Argument encountered');
            return undefined;
        }
        return Kshetras.findIndex(s => s.name == name);
    }
    
    addMouseEventListenerToDocument() {
        document.addEventListener("mousemove", (e) => {
            if(this.mouseFirstButtonHeld) {
                this.moveMapBy(e.clientX - this.mouseLastPosX, e.clientY - this.mouseLastPosY);
            }
            this.mouseLastPosX = e.clientX;
            this.mouseLastPosY = e.clientY;
        });
        document.addEventListener("mousedown", e => {
            if(e.button == 0) this.mouseFirstButtonHeld = true;
        });
        document.addEventListener("mouseup", e => {
            if(e.button == 0) this.mouseFirstButtonHeld = false;
        })
        document.onwheel = e => {
            if(e.deltaY > 0 && this.scale >= SCALE_MAX) return;
            if(e.deltaY < 0 && this.scale <= SCALE_MIN) return;
            let upScale = e.deltaY * 1e-3;
            this.x -= (this.mouseLastPosX + this.x) * (upScale) / (upScale + this.scale);
            this.y -= (this.mouseLastPosY + this.y) * (upScale) / (upScale + this.scale);
            this.scale += upScale;
            // clog(this.x);
        }
    }

    getKshetras(){
        return Kshetras;
    }

}

// 0 <= mX <= si
// 0 <= mX <= si * sc

// col old new

// sc   1   2
// x    0  -1
// mX   1   1



// ==
// ------------
//  ------

