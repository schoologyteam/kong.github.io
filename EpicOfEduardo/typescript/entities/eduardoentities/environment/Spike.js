/* global Hazard HitBox GameSprite */
class Spike extends Hazard {
    constructor(_x, _y, side) {
        super(_x, _y);
        this.weakness = "hammer";
        this.width = 48;
        this.height = 32;
        this.image = new GameSprite(MyGame.imgs["stone_spikes"], 48, 32);
        if (side == "top") {
            this.image.currentFrame = 0;
        }
        else {
            this.image.currentFrame = 1;
        }
        this.mask = new HitBox(this.x, this.y, 48, 32);
    }
}
