class Buffer {
    constructor(_width, _height) {
        this.width = _width;
        this.height = _height;
        this.bufferedCanvas = document.createElement('canvas');
        this.ready = false;
    }
}
