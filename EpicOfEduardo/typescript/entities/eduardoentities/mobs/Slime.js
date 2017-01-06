/* global BaseMobile */
class Slime extends BaseMobile {
    constructor(_x, _y) {
        super(_x, _y);
        this.timer = 30;
        this.gravity = 0.7;
        this.drag = 0.018;
        this.friction = 0.02;
        this.jumping = false;
        this.image = new GameSprite(MyGame.imgs["slime"], 64, 48);
        this.image.addAnimation("jiggle", [0, 1]);
        this.image.addAnimation("jump", [2]);
        this.image.addAnimation("stoned", [3]);
        this.image.playAnimation("jiggle", 10);
        this.setHitBox(60, 34, 2, 14);
        this.setType("slime");
    }
    update(_dt) {
        if (!this.alive) {
            this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag);
            this.moveBy(this.getXSpeed(), this.getYSpeed());
            this.mask.update(this.x, this.y);
            if (this.visible) {
                this.visible = false;
            }
            else {
                this.visible = true;
            }
            if (this.y > this.world.height) {
                this.destroy();
            }
            return;
        }
        this.image.updateAnimation(_dt);
        if (!this.target) {
            this.target = this.world.findByName("Eduardo");
            return;
        }
        else if (this.y < MyGame.camera.y - MyGame.HEIGHT / 2 || this.x < MyGame.camera.x - MyGame.WIDTH / 2 || this.y > MyGame.camera.y + MyGame.HEIGHT * 3 / 2 || this.x > MyGame.camera.x + MyGame.WIDTH * 3 / 2) {
            return;
        }
        this.setXSpeed(this.getXSpeed() - this.getXSpeed() * this.friction);
        this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag);
        this.mobileMove();
        if (this.getType() === "wall") {
            if (this.checkOnGround()) {
                this.setYSpeed(0);
            }
            return;
        }
        if (this.checkOnGround()) {
            this.setYSpeed(0);
            this.setXSpeed(0);
            this.timer--;
            if (this.timer <= 0) {
                this.jumping = true;
                this.setYSpeed(-8);
                this.image.playAnimation("jump");
                this.timer = 3;
                if (this.x > this.target.x) {
                    this.setXSpeed(-6.4);
                }
                else {
                    this.setXSpeed(6.4);
                }
            }
        }
        else if (this.jumping) {
            this.timer--;
            this.setYSpeed(-8);
            if (this.timer <= 0) {
                this.jumping = false;
                this.timer = 45;
                this.image.playAnimation("jiggle", 10);
            }
        }
    }
    onCollision(dmg, _type) {
        if (_type == "powder") {
            this.setType("wall");
            this.image.playAnimation("stoned");
            this.setXSpeed(0);
            if (this.collideTypes("player", this.x, this.y)) {
                this.x += 50;
            }
        }
        else if (_type == "fire") {
            this.alive = false;
            this.setType(null);
        }
        else if (_type == "hammer") {
            if (this.x > this.target.x) {
                this.setXSpeed(5);
            }
            else {
                this.setXSpeed(-5);
            }
            this.setYSpeed(-5);
        }
    }
}
