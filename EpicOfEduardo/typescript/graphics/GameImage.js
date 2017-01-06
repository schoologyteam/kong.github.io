class GameImage {
    constructor(img) {
        this.image = img;
        this.width = this.image.width;
        this.height = this.image.height;
    }
    getImage() {
        return this.image;
    }
    render(g, oX, oY) {
        g.drawImage(this.image, 0, 0, this.width, this.height, oX, oY);
    }
}
