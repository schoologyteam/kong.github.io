/* global Entity */
class BubbleSwitch extends Entity {
    constructor(_x, _y, _c) {
        super(_x, _y);
        this.name = _c;
        this.pressed = false;
        this.image = new GameSprite(MyGame.imgs["bubble_" + _c], 32, 16);
        this.mask = new HitBox(_x, _y, 32, 16);
        this.setType("switch");
    }
    update(_dt) {
        if (!this.pressed) {
            if (this.collideTypes("player", this.x, this.y)) {
                this.pressed = true;
                this.image.currentFrame = 1;
            }
        }
    }
    getSwitched() {
        return this.pressed;
    }
}
