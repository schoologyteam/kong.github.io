class KeyManager {
    constructor() {
        window.addEventListener("keydown", this.keyDown, true);
        window.addEventListener("keyup", this.keyRelease, true);
        window.addEventListener("keypress", function (event) {
            event.preventDefault();
            event.stopPropagation();
        }, true);
    }
    keyDown(event) {
        KeyManager.keys[event.key] = true;
        event.preventDefault();
        event.stopPropagation();
    }
    keyRelease(event) {
        KeyManager.keys[event.key] = false;
        event.preventDefault();
        event.stopPropagation();
    }
    static preUpdate(key) {
        KeyManager.keysT[key] = KeyManager.keys[key];
    }
    static postUpdate(key) {
        KeyManager.keysL[key] = KeyManager.keys[key];
    }
    static pressed(key) {
        return (this.keysT[key] && !this.keysL[key]);
    }
    static released(key) {
        return (this.keysL[key] && !this.keysT[key]);
    }
    static held(key) {
        return this.keys[key];
    }
}
KeyManager.keys = [];
KeyManager.keysT = [];
KeyManager.keysL = [];
