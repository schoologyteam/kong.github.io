/* global Item GameSprite HitBox MyGame Eduardo */
class Heart extends Item {
    constructor(_x, _y) {
        super(_x, _y);
        this.image = new GameSprite(MyGame.imgs["heart"], 48, 48);
        this.setHitBox(24, 24, 16, 16);
    }
    collect() {
        Eduardo.hearts += 2;
        MyGame.snds["coin_gold"].pause();
        MyGame.snds["coin_gold"].currentTime = 0;
        MyGame.snds["coin_gold"].play();
        if (Eduardo.hearts >= Eduardo.maxHearts) {
            Eduardo.hearts = Eduardo.maxHearts;
        }
        this.destroy();
    }
}