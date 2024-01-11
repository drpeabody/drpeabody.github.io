
class AnimatedDrawing {
    constructor(durationInFrames, x, y, width, height) {
        this.animationRunning = false;
        this.currentFrame = 0;
        this.durationInFrames = durationInFrames;

        this.boxX = x;
        this.boxY = y;
        this.height = height;
        this.width = width;
        this.angle = Math.PI/4.0;
    }

    start() {
        this.animationRunning = true;
        this.currentFrame = 0;
    }

    shouldDrawAndUpdate() {
        return this.animationRunning
    }

    drawAndUpdate(ctx) {
        if(this.currentFrame > this.durationInFrames) {
            // End this animation
            this.animationRunning = false;
            return;
        }
        
        ctx.fillStyle = '#ff3';

        // Key values: (0.0, 0.5, 1.0)
        let animationPos = (this.currentFrame * 1.0) / this.durationInFrames;
        // Key values: (0.0, 0.0, +width)
        let displacement = Math.max(0, animationPos * 2.0 - 1.0) * this.width;
        let drawnWidth = 2.0 * animationPos * this.width;

        ctx.fillRect(this.boxX + displacement, this.boxY, drawnWidth, this.height);

        this.currentFrame ++;

    }
}
