/* global Hazard */
class ThornPlant extends Hazard {
    constructor(_x, _y) {
        super(_x, _y);
        this.weakness = "fire";
        this.image = new GameImage(MyGame.imgs["thorn_plant"]);
        this.width = 54;
        this.height = 36;
        this.offsetX = 2;
        this.offsetY = 2;
        this.mask = new HitBox(_x, _y, 50, 34);
    }
    smash(_s) {
        if (_s == this.weakness || _s == "hammer") {
            this.destroy();
        }
    }
}
