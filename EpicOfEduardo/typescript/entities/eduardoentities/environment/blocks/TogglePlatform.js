/* global Entity HitBox GameSprite */
class TogglePlatform extends Entity {
    constructor(_x, _y, _c) {
        super(_x, _y);
        this.colour = _c;
        this.setType("empty");
        this.image = new GameSprite(MyGame.imgs["platform_" + _c], 48, 48);
        this.image.currentFrame = 1;
        this.mask = new HitBox(_x, _y, 48, 16);
    }
    update(_dt) {
        if (!this.switch) {
            this.switch = this.world.findByName(this.colour);
            return;
        }
        if (this.switch.getSwitched()) {
            if (this.getType() == "empty") {
                this.image.currentFrame = 0;
                this.setType("platform");
            }
        }
        else {
            if (this.getType() == "platform") {
                this.setType("empty");
                this.image.currentFrame = 1;
            }
        }
    }
}
