/* global Item GameInage MyGame GameImage */
class PowerUp extends Item {
    constructor(_x, _y, power) {
        super(_x, _y);
        this.power = power;
        if (power === 12) {
            this.image = new GameImage(MyGame.imgs["matchbox"]);
        }
        else if (power === 2) {
            this.image = new GameImage(MyGame.imgs["glide_wings"]);
        }
        else if (power === 3) {
            this.image = new GameImage(MyGame.imgs["wing_boots"]);
        }
        else if (power == 7) {
            this.image = new GameImage(MyGame.imgs["powder_can"]);
        }
        else if (power == 8) {
            this.image = new GameImage(MyGame.imgs["hammer"]);
        }
        this.mask = new HitBox(this.x, this.y, 48, 48);
    }
    collect() {
        Eduardo.power = this.power;
        Eduardo.powerHits = 2;
        this.destroy();
    }
}
