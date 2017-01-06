/* global Entity */
class Hammer extends Entity {
    constructor(_x, _y, _player, _swing) {
        super(_x, _y);
        this.player = _player;
        this.setType("hammer");
        this.image = new GameSprite(MyGame.imgs["hammer_swing"], 40, 34);
        this.image.addAnimation("ground_right", [0, 1, 2, 2]);
        this.image.addAnimation("ground_left", [5, 4, 3, 3]);
        this.image.addAnimation("air_right", [1]);
        this.image.addAnimation("air_left", [4]);
        let frameRate = 8;
        this.timer = 8;
        if (_swing == "ground_right" || _swing == "ground_left") {
            frameRate = 15;
            this.timer = 16;
        }
        this.image.playAnimation(_swing, frameRate, false);
        this.mask = new HitBox(_x, _y, 21, 21);
    }
    update(_dt) {
        this.image.updateAnimation(_dt);
        if (this.image.currentFrame == 1) {
            this.x = this.player.x + 50;
            this.y = this.player.y + 18;
            this.mask.update(this.x + 25, this.y + 8);
        }
        else if (this.image.currentFrame == 4) {
            this.x = this.player.x - 34;
            this.y = this.player.y + 18;
            this.mask.update(this.x, this.y + 8);
        }
        else if (this.image.currentFrame == 2) {
            this.x = this.player.x + 46;
            this.y = this.player.y + 48;
            this.mask.update(this.x + 18, this.y + 18);
        }
        else if (this.image.currentFrame == 3) {
            this.x = this.player.x - 30;
            this.y = this.player.y + 48;
            this.mask.update(this.x + 8, this.y + 18);
        }
        else if (this.image.currentFrame == 0) {
            this.x = this.player.x + 46;
            this.y = this.player.y - 4;
            this.mask.update(this.x + 19, this.y + 0);
        }
        else {
            this.x = this.player.x - 30;
            this.y = this.player.y - 4;
            this.mask.update(this.x + 6, this.y + 0);
        }
        let e = this.collideTypes(["enemy", "slime", "plant"], this.mask.x, this.mask.y);
        if (e) {
            e.onCollision(2, "hammer");
        }
        let h = this.collideTypes("hazard", this.x, this.y);
        if (h) {
            h.smash("hammer");
        }
        this.timer -= 1;
        if (this.timer <= 0) {
            this.destroy();
        }
    }
}
