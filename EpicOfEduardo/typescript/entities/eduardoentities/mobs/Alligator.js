/* global BaseMoble GameSprite */
class Alligator extends BaseMobile {
    constructor(_x, _y) {
        super(_x, _y);
        this.lunge = false;
        this.leftOrRight = 1;
        this.turning = false;
        this.image = new GameSprite(MyGame.imgs["alligator"], 144, 36);
        this.image.addAnimation("walk_l", [2, 8, 2, 9]);
        this.image.addAnimation("walk_r", [5, 10, 5, 11]);
        this.image.addAnimation("turn_r", [2, 1, 1, 5]);
        this.image.addAnimation("turn_l", [5, 0, 0, 2]);
        this.image.addAnimation("charge_l", [2, 3, 4, 3]);
        this.image.addAnimation("charge_r", [5, 6, 7, 6]);
        this.gravity = 0.7;
        this.drag = 0.18;
        this.friction = 0.18;
        this.health = 10;
        this.setXSpeed(5);
        this.setHitBox(132, 36, 6, 0);
        this.setType("enemy");
        console.log("rawr");
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
                    this.setXSpeed(5);
                    this.turning = false;
                    this.image.playAnimation("walk_r", 15);
                }
            }
            else {
                if (this.image.currentFrame === 2) {
                    this.setXSpeed(-5);
                    this.turning = false;
                    this.image.playAnimation("walk_l", 15);
                }
            }
        }
        if (!this.checkOnGround()) {
            this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag);
        }
        else {
            this.setYSpeed(0);
        }
        this.mobileMove();
    }
    onCollision(dmg, _type) {
        if (this.invFrames <= 0) {
            this.health -= dmg;
            this.hitStun = 7;
            this.invFrames = 10;
            if (this.health <= 0) {
                this.alive = false;
                this.gravity = 0.7;
                this.setType(null);
            }
        }
    }
}
