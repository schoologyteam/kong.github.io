/* global BaseMobile GameSprite */
class JumpBot extends BaseMobile {
    constructor(_x, _y, _d) {
        super(_x, _y);
        this.setType("enemy");
        this.gravity = 0.7;
        this.drag = 0.018;
        this.friction = 0.02;
        this.health = 2;
        this.drops = _d;
        this.timer = 30;
        this.image = new GameSprite(MyGame.imgs["jumpbot"], 40, 64);
        this.image.addAnimation("jump", [0, 1, 2, 3, 4, 5, 6, 7]);
        this.image.addAnimation("stand", [0]);
        this.setHitBox(40, 64);
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
        if (this.hitStun > 0) {
            this.hitStun -= 1;
            return;
        }
        this.image.updateAnimation(_dt);
        if (this.checkOnGround()) {
            this.setXSpeed(0);
            this.setYSpeed(0);
            if (this.jumping) {
                this.jumping = false;
                this.image.playAnimation("stand");
                this.timer = 20;
            }
            this.timer--;
            if (this.timer <= 0) {
                this.image.playAnimation("jump", 15, false);
            }
        }
        if (this.image.currentFrame == 6) {
            this.setYSpeed(-8);
            this.jumping = true;
            this.timer = 14;
            if (this.x > MyGame.camera.x + MyGame.WIDTH / 2) {
                this.setXSpeed(-3);
            }
            else {
                this.setXSpeed(3);
            }
        }
        if (this.jumping) {
            if (this.timer >= 0) {
                this.setYSpeed(-8);
                this.timer--;
            }
        }
        this.setXSpeed(this.getXSpeed() - this.getXSpeed() * this.friction);
        this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag);
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
