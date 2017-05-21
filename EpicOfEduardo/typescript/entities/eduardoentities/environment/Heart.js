/* global Item GameSprite HitBox MyGame Eduardo */
class Heart extends Item {
    constructor(_x, _y) {
        super(_x, _y);
        this.image = new GameSprite(MyGame.imgs["heart"], 48, 48);
        this.setHitBox(32, 32, 8, 8);
    }
    collect() {
        Eduardo.hearts += 2;
        if (Eduardo.hearts >= Eduardo.maxHearts) {
            Eduardo.hearts = Eduardo.maxHearts;
        }
        this.destroy();
    }
}