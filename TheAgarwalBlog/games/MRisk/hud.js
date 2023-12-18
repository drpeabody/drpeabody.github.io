
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
}