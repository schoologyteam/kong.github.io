/* global BaseMobile MyGame GameSprite */
class ClockBot extends BaseMobile {
    constructor(_x, _y, _d) {
        super(_x, _y);
        this.setType("enemy");
        this.image = new GameSprite(MyGame.imgs["clock_bot"], 74, 66);
        this.image.addAnimation("walk_l", [5, 6, 7]);
        this.image.addAnimation("walk_r", [8, 9, 10]);
        this.image.addAnimation("turn_r", [8, 4, 4, 5]);
        this.image.addAnimation("turn_l", [5, 4, 4, 8]);
        this.image.playAnimation("walk_r", 15);
        this.offsetY = -3;
        this.gravity = 0.7;
        this.drag = 0.018;
        this.turning = false;
        this.width = 72;
        this.height = 30;
        this.mask = new HitBox(this.x, this.y, 74, 66);
        this.drops = _d;
        this.health = 2;
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
            if (this.drops) {
                this.world.addEntity(new PowerUp(this.x, this.y + 6, this.drops));
                this.drops = 0;
            }
            return;
        }
        else if (this.y < MyGame.camera.y - MyGame.HEIGHT || this.x < MyGame.camera.x - MyGame.WIDTH || this.y > MyGame.camera.y + MyGame.HEIGHT * 2 || this.x > MyGame.camera.x + MyGame.WIDTH * 2) {
            return;
        }
        if (this.invFrames > 0) {
            this.invFrames--;
            if (!this.visible || this.invFrames <= 1) {
                this.visible = true;
            }
            else {
                this.visible = false;
            }
        }
        if (this.hitStun >= 0) {
            this.hitStun--;
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
                if (this.image.currentFrame === 5) {
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
        if (_type == "hammer") {
            this.alive = false;
        }
        else {
            if (this.invFrames > 0) {
                return;
            }
            this.health -= 1;
            this.invFrames = 22;
            this.hitStun = 5;
            if (this.health <= 0) {
                this.alive = false;
                this.gravity = 0.7;
                this.setType(null);
            }
        }
    }
}
