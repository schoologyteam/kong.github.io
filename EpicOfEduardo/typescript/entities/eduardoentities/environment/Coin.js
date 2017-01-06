/* global Item HitBox GameSprite MyGame Eduardo */
class Coin extends Item {
    constructor(_x, _y, _m, _i = -1) {
        super(_x, _y);
        this.metal = _m;
        if (_m === "copper") {
            this.value = 1;
            this.mask = new HitBox(this.x, this.y, 20, 20);
            this.image = new GameSprite(MyGame.imgs[_m], 20, 20);
            this.image.addAnimation("flash", [0, 1, 2, 3, 2, 1, 0]);
        }
        else if (_m === "silver") {
            this.value = 5;
            this.mask = new HitBox(this.x, this.y, 28, 28);
            this.image = new GameSprite(MyGame.imgs[_m], 28, 28);
            this.image.addAnimation("flash", [0, 1, 2, 3, 2, 1, 0]);
        }
        else if (_m === "gold") {
            this.value = 25;
            this.mask = new HitBox(this.x, this.y, 48, 48);
            this.image = new GameSprite(MyGame.imgs[_m], 48, 48);
            this.image.addAnimation("flash", [0, 1, 2, 1, 0]);
        }
        this.index = _i;
        this.image.playAnimation("flash", 10);
    }
    update(_dt) {
        this.image.updateAnimation(_dt);
    }
    collect() {
        Eduardo.money += this.value;
        if (Eduardo.money > 9999) {
            Eduardo.money = 9999;
        }
        if (this.index >= 0 && this.index < 5) {
            Coin.collected[this.index] = true;
        }
        this.destroy();
    }
}
