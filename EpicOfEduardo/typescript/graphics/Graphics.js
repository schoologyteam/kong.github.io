/* global MyGame */
class Graphics {
    constructor(_width, _height, _scale, canvasElementID = "canvas") {
        this.canvas = document.getElementById(canvasElementID);
        this.width = _width;
        this.height = _height;
        this.gfx = this.canvas.getContext("2d");
        this.gfx.msImageSmoothingEnabled = false;
        this.gfx.imageSmoothingEnagled = false;
        this.gfx.webkitImageSmoothingEnabled = false;
        this.gfx.mozImageSmoothingEnabled = false;
        this.scale = _scale;
    }
    clear() {
        this.gfx.clearRect(0, 0, this.width * this.scale, this.height * this.scale);
    }
    rectangle(x, y, width, height, colour = "#000000", mode = "fill") {
        this.gfx.fillStyle = colour;
        this.gfx.strokeStyle = colour;
        if (mode == "fill") {
            this.gfx.fillRect(x * this.scale, y * this.scale, width * this.scale, height * this.scale);
        }
        else {
            this.gfx.strokeRect(x * this.scale, y * this.scale, width * this.scale, height * this.scale);
        }
    }
    text(_s, _x, _y, colour = "#FFFFFF", font = "32px Verdana", _w = 0) {
        this.gfx.fillStyle = colour;
        this.gfx.strokeStyle = colour;
        this.gfx.font = font;
        if (_w === 0) {
            this.gfx.fillText(_s, _x * this.scale, _y * this.scale);
        }
        else {
            this.gfx.fillText(_s, _x * this.scale, _y * this.scale, _w * this.scale);
        }
    }
    /**
     * Draws the image onto the canvase
     * @param _image    - the image to be drawn
     * @param x         - source x coordinate
     * @param y         - source y coordinate
     * @param width     - width of image sample source
     * @param height    - height of image sample source
     * @param oX        - the x offset on the canvas
     * @param oY        - the y offset on the canvas
     */
    drawImage(_image, x, y, width, height, oX, oY) {
        let ox = 0;
        let oy = 0;
        if (MyGame.camera) {
            ox = MyGame.camera.x;
            oy = MyGame.camera.y;
        }
        if (oX + width < ox || oY + height < oy || ox + this.width < oX || oy + this.height < oY) {
            return;
        }
        this.gfx.drawImage(_image, x, y, width, height, Math.floor(oX - ox) * this.scale, Math.floor(oY - oy) * this.scale, width * this.scale, height * this.scale);
    }
    /**
     * WIP do not use
     */
    transferBufferedImage(bi) {
        let ox = 0;
        let oy = 0;
        if (MyGame.camera) {
            ox = MyGame.camera.x;
            oy = MyGame.camera.y;
        }
        let sw = this.width * this.scale;
        let sh = this.height * this.scale;
        this.gfx.putImageData(bi, 0 - ox, 0 - oy);
    }
}
