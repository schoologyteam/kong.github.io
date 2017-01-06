/* global HitBox GridMask */
class Mask {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    collideCurrent(mask) {
        return this.collide(this.x, this.y, mask);
    }
    collide(x, y, mask) {
        x = Math.floor(x);
        y = Math.floor(y);
        var xx = Math.floor(mask.x);
        var yy = Math.floor(mask.y);
        if (mask instanceof GridMask) {
            return (mask.tileSolid(x, y) != 0);
        }
        else if (mask instanceof HitBox) {
            return (x >= xx && y >= yy && x <= xx + mask.width && y <= yy + mask.height);
        }
        return (x == mask.x && y == mask.y);
    }
    update(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}
