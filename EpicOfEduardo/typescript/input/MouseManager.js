class MouseManager {
    constructor(_bsr) {
        let broswer = _bsr;
        let canvas = document.getElementById("canvas");
        let unfilteredX = 0;
        let unfilteredY = 0;
        let mouse = false;
        let mouseT = false;
        let mouseL = false;
        window.addEventListener("mousedown", function(event) {
            mouse = true;
        });
        window.addEventListener("mouseup", function(event) {
            mouse = false;
        });
        window.addEventListener("mousemove", function(event) {
            unfilteredX = event.clientX;
            unfilteredY = event.clientY;
        });
        MouseManager.pressed = () => {
            return (mouseT && !mouseL);
        };
        MouseManager.released = () => {
            return (mouseL && !mouseT);
        };
        MouseManager.held = () => {
            return mouseT;
        };
        MouseManager.getRawCoords = () => {
            return {
                x: unfilteredX,
                y: unfilteredY
            };
        };
        MouseManager.getFilteredCoords = () => {
            let rect = canvas.getBoundingClientRect();
            let coords = MouseManager.getRawCoords();
            coords.x = coords.x - rect.left + MyGame.camera.x;
            coords.y = coords.y - rect.top + MyGame.camera.y;
            return coords;
        };
        MouseManager.preUpdate = () => {
            mouseT = mouse;
        };
        MouseManager.postUpdate = () => {
            mouseL = mouse;
        };
        this.pressed = () => {
            return (mouseT && !mouseL);
        };
        this.released = () => {
            return (mouseL && !mouseT);
        };
        this.held = () => {
            return mouseT;
        };
        this.getRawCoords = () => {
            return {
                x: unfilteredX,
                y: unfilteredY
            };
        };
        this.getFilteredCoords = () => {
            let rect = canvas.getBoundingClientRect();
            let coords = MouseManager.getRawCoords();
            coords.x = coords.x - rect.left + MyGame.camera.x;
            coords.y = coords.y - rect.top + MyGame.camera.y;
            return coords;
        };
        this.preUpdate = () => {
            mouseT = mouse;
        };
        this.postUpdate = () => {
            mouseL = mouse;
        };
    }
}