/* global BaseMobile */
class Lasher extends BaseMobile {
    constructor(_x, _y) {
        super(_x, _y);
        this.image = new GameSprite(MyGame.imgs["lasher"], 64, 96);
        this.image.addAnimation("sway", [0, 11, 0, 12]);
        this.image.addAnimation("unfurl_l", [1, 3, 4, 5, 6, 0]);
        this.image.addAnimation("unfurl_r", [2, 7, 8, 9, 10, 0]);
        this.image.playAnimation("sway", 5);
        this.width = 64;
        this.height = 96;
        this.offsetX = 4;
        this.mask = new HitBox(this.x, this.y, 56, 96);
        this.health = 2;
        this.type = "plant";
        this.burn = false;
        this.attacking = false;
        this.recharge = false;
        this.timer = 30;
    }
    added() {
        this.particles = new ParticleEmitter();
        this.particles.setImage(MyGame.imgs["fire_2"]);
        this.particles.useFade(1, 0.6);
        this.particles.setMotion(20, 4 / 3 * Math.PI, 40, 5 /3 * Math.PI);
        this.particles.setLife(0.10, 0.25);
        this.particles.setLocalPosition(this.x, this.y);
        this.particles.setUseLocal(true);
    }
    update(_dt) {
        this.particles.update(_dt);
        if (!this.alive) {
            if (this.visible) {
                this.visible = false;
            }
            else {
                this.visible = true;
            }
            if (this.y > this.world.height) {
                this.destroy();
            }
            if (this.burn) {
                this.timer -= 1;
                if (this.timer >= 10) {
                    this.particles.imageParticle(Math.random() * (this.width -16), Math.random() * (this.height - 16));
                }
                if (this.timer <= 0) {
                    this.destroy();
                }
            }
            else {
                this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag);
                this.moveBy(this.getXSpeed(), this.getYSpeed());
                this.mask.update(this.x, this.y);
            }
            return;
        }
        this.image.updateAnimation(_dt);
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
        if (!this.target) {
            this.target = this.world.findByName("Eduardo");
            return;
        }
        else if (this.y < MyGame.camera.y - MyGame.HEIGHT || this.x < MyGame.camera.x - MyGame.WIDTH || this.y > MyGame.camera.y + MyGame.HEIGHT * 2 || this.x > MyGame.camera.x + MyGame.WIDTH * 2) {
            return;
        }
        if (!this.attacking && !this.recharge) {
            this.attacking = (this.target.x - this.x > -120 && this.target.x - this.x < 150);
            if (this.attacking) {
                this.timer = 45;
                if (this.target.x > this.x) {
                    this.image.stopAnimation();
                    this.image.currentFrame = 2;
                    this.world.addEntity(new LasherVine(this.x + 48, this.y, "right"));
                }
                else {
                    this.image.stopAnimation();
                    this.image.currentFrame = 1;
                    this.world.addEntity(new LasherVine(this.x - 93, this.y, "left"));
                }
            }
        }
        else if (this.attacking) {
            this.timer -= 1;
            if (this.timer <= 0) {
                this.recharge = true;
                this.attacking = false;
                if (this.image.currentFrame == 2) {
                    this.image.playAnimation("unfurl_r", 7.5);
                }
                else {
                    this.image.playAnimation("unfurl_l", 7.5);
                }
            }
        }
        else if (this.recharge) {
            if (this.image.currentFrame == 0) {
                this.image.playAnimation("sway", 5);
                this.recharge = false;
            }
        }
    }
    render(_g) {
        super.render(_g);
        this.particles.render(_g);
    }
    onCollision(dmg, _type) {
        if (_type == "fire") {
            MyGame.snds["burn"].pause();
            MyGame.snds["burn"].currentTime = 0;
            MyGame.snds["burn"].play();
            this.alive = false;
            this.burn = true;
            this.timer = 30;
        }
        else {
            if (this.invFrames > 0) {
                return;
            }
            this.health -= 1;
            this.invFrames = 20;
            this.hitStun = 5;
            if (this.health <= 0) {
                this.alive = false;
                this.gravity = 0.7;
                this.setType(null);
            }
        }
    }
}
