/* global BaseMobile */
class Bullet extends BaseMobile {
    constructor(_x, _y, _i, _s, _d) {
        super(_x, _y);
        this.setSpeed(_s);
        this.setDirection(_d);
        this.image = new GameSprite(MyGame.imgs["projectiles"], 16, 16);
        this.index = _i;
        this.image.currentFrame = _i;
        this.setType("bullet");
        this.timer = 30;
        this.width = 16;
        this.height = 16;
        if (_i == 1 || _i == 3) {
            this.timer = 60;
            this.drag = 0.015;
            this.friction = 0.015;
            this.gravity = 0.35;
            if (_i == 1) {
                this.image.addAnimation("flicker", [1, 2]);
                this.image.playAnimation("flicker", 15);
            }
        }
        this.mask = new HitBox(this.x, this.y, 16, 16);
    }
    update(_dt) {
        if (this.x + this.width < MyGame.camera.x || this.x > MyGame.camera.x + MyGame.WIDTH || this.y + this.height < MyGame.camera.y || this.y > MyGame.camera.y + MyGame.HEIGHT) {
            this.timer -= 1;
        }
        if (this.index == 1) {
            this.setXSpeed(this.getXSpeed() - this.getXSpeed() * this.friction);
            this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag);
            this.image.updateAnimation(_dt);
            this.mobileMove();
            if (this.checkOnGround()) {
                this.setYSpeed(0);
                this.timer -= 1;
            }
        }
        else {
            this.moveBy(this.getXSpeed(), this.getYSpeed());
            if (this.collideTypes("wall", this.x, this.y)) {
                this.destroy();
            }
        }
        if (this.timer <= 0) {
            this.destroy();
        }
        this.mask.update(this.x, this.y);
    }
}
