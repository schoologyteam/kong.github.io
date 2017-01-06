/*global BaseMobile GameSprite HitBox*/
class FireHat extends BaseMobile {
    constructor(_x, _y, drops) {
        super(_x, _y);
        if (drops == "True") {
            this.drops = true;
        }
        else {
            this.drops = false;
        }
        this.image = new GameSprite(MyGame.imgs["fire_hat"], 36, 42);
        this.image.addAnimation("left", [9, 8, 9]);
        this.image.addAnimation("right", [0, 1, 0]);
        this.image.addAnimation("throw_l", [7, 6, 5, 5]);
        this.image.addAnimation("throw_r", [2, 3, 4, 4]);
        this.setType("enemy");
        this.width = 38;
        this.height = 42;
        this.mask = new HitBox(this.x, this.y, 38, 42);
        this.gravity = 0.7;
        this.drag = 0.02;
        this.timer = 30;
    }
    update(_dt) {
        if (!this.alive) {
            this.image.stopAnimation();
            this.image.currentFrame = 8;
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
                this.drops = false;
                this.world.addEntity(new PowerUp(this.x, this.y + 6, 12));
            }
            return;
        }
        else if (this.y < MyGame.camera.y - MyGame.HEIGHT || this.x < MyGame.camera.x - MyGame.WIDTH || this.y > MyGame.camera.y + MyGame.HEIGHT * 2 || this.x > MyGame.camera.x + MyGame.WIDTH * 2) {
            return;
        }
        this.image.updateAnimation(_dt);
        if (!this.target) {
            this.target = this.world.findByName("Eduardo");
            return;
        }
        this.stroll = (Math.abs(this.x - this.target.x) > 250);
        if (this.checkOnGround()) {
            if (this.getYSpeed() != 0) {
                this.setYSpeed(0);
            }
            if (this.stroll && !this.shooting) {
                if (this.faceRight) {
                    this.image.playAnimation("right", 10);
                    this.setXSpeed(1);
                }
                else {
                    this.image.playAnimation("left", 10);
                    this.setXSpeed(-1);
                }
                if (!this.collideTypes(["wall", "platform"], this.x + 17 * this.getXSpeed(), this.y + 1) || this.collideTypes("wall", this.x + this.getXSpeed(), this.y)) {
                    if (this.faceRight) {
                        this.faceRight = false;
                    }
                    else {
                        this.faceRight = true;
                    }
                }
            }
            else {
                this.timer--;
                if (this.timer <= 0) {
                    this.shooting = true;
                    this.timer = 120;
                    this.setSpeed(0);
                    if (this.target.x < this.x) {
                        this.image.playAnimation("throw_l", 12);
                    }
                    else {
                        this.image.playAnimation("throw_r", 12);
                    }
                }
                else if (this.shooting) {
                    if (this.image.animationFrame == 3) {
                        this.shooting = false;
                        this.timer = 70;
                        this.world.addEntity(new Bullet(this.x, this.y, 1, 6, Math.atan2(-70, this.target.x - this.x)));
                    }
                }
                else {
                    if (this.target.x < this.x) {
                        this.faceRight = false;
                        this.image.playAnimation("left", 15);
                        if (this.x - this.target.x < 210) {
                            this.setXSpeed(2);
                        }
                        else {
                            this.setXSpeed(0);
                        }
                    }
                    else {
                        this.faceRight = true;
                        this.image.playAnimation("right", 15);
                        if (this.x - this.target.x > 210) {
                            this.setXSpeed(-2);
                        }
                        else {
                            this.setXSpeed(0);
                        }
                    }
                }
                if (!this.collideTypes(["wall", "platform"], this.x + 17 * this.getXSpeed(), this.y + 1) || this.collideTypes("wall", this.x + this.getXSpeed(), this.y)) {
                    this.setXSpeed(0);
                }
            }
        }
        else {
            this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag);
            this.setXSpeed(0);
        }
        this.mobileMove();
    }
    onCollision(dmg, _type) {
        this.alive = false;
        this.setType(null);
    }
}
