/* global Item GameSprite */
class Crystal extends Item {
    constructor(_x, _y) {
        super(_x, _y);
        this.image = new GameSprite(MyGame.imgs["vibrant_crystal"], 48, 48);
        this.image.addAnimation("glow", [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1]);
        this.image.playAnimation("glow", 20);
        this.setHitBox(24, 24);
    }
    collect() {
        Eduardo.levelCleared[Eduardo.currentLevel] = true;
        MyGame.setWorld(new OverWorld());
    }
    update(_dt) {
        this.image.updateAnimation(_dt);
    }
}
