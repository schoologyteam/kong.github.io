/* global GameSprite Entity MyGame GameImage Eduardo */
class ShopItem extends Entity {
    constructor(_x, _y, _i) {
        super(_x, _y);
        this.item = _i;
        if (_i === 12) {
            this.image = new GameImage(MyGame.imgs["matchbox"]);
            this.price = 250;
        }
        else if (_i === 2) {
            this.image = new GameImage(MyGame.imgs["glide_wings"]);
            this.price = 400;
        }
        else if (_i === 3) {
            this.image = new GameImage(MyGame.imgs["wing_boots"]);
            this.price = 500;
        }
        else if (_i === 7) {
            this.image = new GameImage(MyGame.imgs["powder_can"]);
            this.price = 150;
        }
        else if (_i === 8) {
            this.image = new GameImage(MyGame.imgs["hammer"]);
            this.price = 200;
        }
        else if (_i === 0) {
            this.image = new GameSprite(MyGame.imgs["heart"], 48, 48);
            this.price = 50;
        }
        this.setHitBox(48, 48);
    }
    update(_dt) {
        let player = this.collideTypes("player", this.x, this.y);
        if (player) {
            if (KeyManager.pressed("x")) {
                if (Eduardo.money >= this.price) {
                    if (this.item > 0) {
                        Eduardo.power = this.item;
                        Eduardo.powerHits = 3;
                        player.selectCostume();
                    }
                    else if (this.item === 0) {
                        Eduardo.hearts += 2;
                        if (Eduardo.hearts >= Eduardo.maxHearts) {
                            Eduardo.hearts = Eduardo.maxHearts;
                        }
                    }
                    Eduardo.money -= this.price;
                }
            }
        }
    }
    render(g) {
        this.image.render(g, this.x, this.y);
        g.text(this.price.toString(), this.x - 12 - MyGame.camera.x, this.y - 6 - MyGame.camera.y);
    }
}
