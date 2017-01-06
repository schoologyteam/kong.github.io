/*global Hazard */
class LasherVine extends Hazard {
    constructor(_x, _y, _d) {
        super(_x, _y);
        this.side = _d;
        this.weakness = "fire";
        this.timer = 30;
        this.image = new GameSprite(MyGame.imgs["lasher_vine"], 96, 96);
        this.image.addAnimation("left", [5, 6, 7, 8, 9]);
        this.image.addAnimation("right", [0, 1, 2, 3, 4]);
        if (_d == "left") {
            this.width = 200;
            this.offsetX = 4 + 2.1 * this.timer;
        }
        this.image.playAnimation(_d, 10);
        this.mask = new HitBox(_x + this.offsetX, _y, 24, 96);
    }
    update(_dt) {
        this.image.updateAnimation(_dt);
        this.offsetY = 3 * (30 - this.timer);
        if (this.side == "right") {
            this.offsetX = 2.1 * (30 - this.timer);
        }
        else if (this.side == "left") {
            this.offsetX = 4 + 2.1 * this.timer;
        }
        this.mask.setSize(24, 96 - 2.5 * (30 - this.timer));
        this.mask.update(this.x + this.offsetX, this.y + this.offsetY);
        this.timer--;
        if (this.timer <= 0) {
            this.destroy();
        }
    }
    render(g) {
        super.render(g);
    }
}
