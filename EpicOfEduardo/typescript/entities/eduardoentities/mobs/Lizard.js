/* global BaseMobile MyGame GameSprite */
class Lizard extends BaseMobile {
    constructor(_x, _y) {
        super(_x, _y);
        this.setType("enemy");
        this.image = new GameSprite(MyGame.imgs["lizard"], 72, 27);
        this.image.addAnimation("walk_l", [4, 5, 6, 7]);
        this.image.addAnimation("walk_r", [0, 1, 2, 3]);
        this.image.addAnimation("turn_r", [8, 9, 10, 11, 12]);
        this.image.addAnimation("turn_l", [12, 11, 10, 9, 8]);
        this.image.playAnimation("walk_r", 15);
        this.offsetY = -3;
        this.gravity = 0.7;
        this.drag = 0.018;
        this.turning = false;
        this.width = 72;
        this.height = 30;
        this.mask = new HitBox(this.x, this.y, 72, 30);
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
        else if (this.y < MyGame.camera.y - MyGame.HEIGHT || this.x < MyGame.camera.x - MyGame.WIDTH || this.y > MyGame.camera.y + MyGame.HEIGHT * 2 || this.x > MyGame.camera.x + MyGame.WIDTH * 2) {
            return;
        }
        this.image.updateAnimation(_dt);
        if (!this.collideTypes(["wall", "platform"], this.x + 10 * this.getXSpeed(), this.y + 1) || this.collideTypes(["wall", "enemy"], this.x + this.getXSpeed(), this.y)) {
            if (this.faceRight && !this.turning) {
                this.setXSpeed(0);
                this.turning = true;
                this.faceRight = false;
                this.image.playAnimation("turn_l", 15);
            }
            else if (!this.faceRight && !this.turning) {
                this.setXSpeed(0);
                this.turning = true;
                this.faceRight = true;
                this.image.playAnimation("turn_r", 15);
            }
        }
        if (this.turning) {
            if (this.faceRight) {
                if (this.image.currentFrame === 12) {
                    this.setXSpeed(4.5);
                    this.turning = false;
                    this.image.playAnimation("walk_r", 15);
                }
            }
            else {
                if (this.image.currentFrame === 8) {
                    this.setXSpeed(-4.5);
                    this.turning = false;
                    this.image.playAnimation("walk_l", 15);
                }
            }
        }
        if (!this.checkOnGround()) {
            this.setYSpeed(this.getYSpeed() + this.gravity / 3 - this.getYSpeed() * this.drag);
        }
        else {
            this.setYSpeed(0);
        }
        this.mobileMove();
    }
    onCollision(dmg, _type) {
        this.alive = false;
        this.setType(null);
    }
}
