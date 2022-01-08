
class Player {
    constructor(bgColor, fgColor) {
        this.kshetras = [];
        this.sainya = 0;
        this.arth = 0;
        this.bgColor = bgColor;
        this.fgColor = fgColor;
    }

    getBGColor() { return this.bgColor; }
    getFGColor() { return this.fgColor; }
}