/* global Entity */
class Breakable extends Entity {
    constructor(_x, _y, _t) {
        super(_x, _y);
        this.setType("wall");
        this.iFrames = 0;
        if (_t == "rocks") {
            this.name = "rock";
            this.image = new GameSprite(MyGame.imgs["rock_wall"], 48, 48);
        }
        this.mask = new HitBox(_x, _y, 48, 48);
    }
    update(_dt) {
        if (this.iFrames > 0) {
            this.iFrames -= 1;
        }
        let hammer = this.collideTypes("hammer", this.x, this.y);
        if (hammer) {
            this.onCollision(2, "hammer");
        }
        this.image.updateAnimation(_dt);
    }
    onCollision(dmg, _type) {
        if (this.name == "rock" && this.iFrames <= 0 && _type == "hammer") {
            let h = this.image.currentFrame + 1;
            console.log(h);
            this.iFrames = 20;
            if (h > 2) {
                this.destroy();
            }
            else {
                this.image.currentFrame = h;
            }
        }
    }
}
