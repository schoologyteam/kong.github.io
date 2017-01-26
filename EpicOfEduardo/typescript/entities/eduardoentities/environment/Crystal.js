/* global Item GameSprite MyGame Eduardo OverWorld */
class Crystal extends Item {
    constructor(_x, _y) {
        super(_x, _y);
        if (Eduardo.currentLevel == "Mystic Cave") {
            this.image = new GameSprite(MyGame.imgs["vibrant_crystal"], 48, 48);
            this.image.addAnimation("glow", [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1]);
            this.image.playAnimation("glow", 20);
            this.setHitBox(48, 48);
        }
        else if (Eduardo.currentLevel == "City's Secret") {
            this.image = new GameSprite(MyGame.imgs["gem_ruby"], 32, 32);
            this.image.addAnimation("glow", [0, 1, 2, 1]);
            this.image.playAnimation("glow", 20);
            this.setHitBox(24, 24);
        }
    }
    collect() {
        if (Eduardo.currentLevel == "City's Secret" && !Eduardo.levelCleared["City's Secret"]) {
            Eduardo.maxHearts += 2;
        }
        Eduardo.levelCleared[Eduardo.currentLevel] = true;
        MyGame.setWorld(new OverWorld());
    }
    update(_dt) {
        this.image.updateAnimation(_dt);
    }
}
