/* global Entity GameSprite */
class CrumblingBlock extends Entity {
    constructor(_x, _y, _s) {
        super(_x, _y);
        this.setType("wall");
        this.setHitBox(48, 48);
        this.image = new GameSprite(MyGame.imgs[_s], 48, 48);
        this.image.addAnimation("crumble", [4, 3, 2, 1, 0]);
        this.image.currentFrame = 4;
    }
    update(_dt) {
        this.image.updateAnimation(_dt);
        if (this.collideTypes("player", this.x, this.y - 1)) {
            this.image.playAnimation("crumble", 5);
        }
        if (this.image.currentFrame === 0) {
            this.destroy();
        }
    }
}
