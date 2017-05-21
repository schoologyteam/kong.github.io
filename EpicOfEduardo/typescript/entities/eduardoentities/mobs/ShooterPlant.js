/* global BaseMobile MyGame GameSprite */
class ShooterPlant extends BaseMobile {
    constructor(_x, _y) {
        super(_x, _y);
        this.shooting = false;
        this.burn = false;
        this.timer = 90;
        this.image = new GameSprite(MyGame.imgs["shooter_plant"], 80, 80);
        this.image.addAnimation("idle_tl", [0, 1, 0, 2]);
        this.image.addAnimation("attack_tl", [0, 3, 2]);
        this.image.addAnimation("idle_bl", [4, 5, 4, 6]);
        this.image.addAnimation("attack_bl", [4, 7, 6]);
        this.image.addAnimation("idle_tr", [8, 9, 8, 10]);
        this.image.addAnimation("attack_tr", [8, 11, 10]);
        this.image.addAnimation("idle_br", [12, 13, 12, 14]);
        this.image.addAnimation("attack_br", [12, 15, 14]);
        this.setType("plant");
        this.width = 40;
        this.height = 40;
        this.mask = new HitBox(this.x + 2, this.y + 2, 76, 78);
        this.health = 2;
        this.playIdle();
    }
    update(_dt) {
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
                if (this.timer % 3 == 0) {
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
        this.setDirection(Math.atan2(this.target.y - this.y, this.target.x - this.x));
        if (this.timer >= 0) {
            this.timer--;
        }
        else {
            this.shooting = true;
            this.image.animationFrame = 0;
            this.world.addEntity(new Bullet(this.x + 40, this.y + 20, 0, 5, this.getDirection()));
            this.timer = 120;
        }
        if (this.shooting) {
            this.playAttack();
        }
        else {
            this.playIdle();
        }
    }
    playIdle() {
        if (this.getDirection() >= 0 && this.getDirection() < Math.PI / 2) {
            this.image.playAnimation("idle_br", 5, true, this.image.animationFrame);
        }
        else if (this.getDirection() < Math.PI) {
            this.image.playAnimation("idle_bl", 5, true, this.image.animationFrame);
        }
        else if (this.getDirection() < 3 * Math.PI / 2) {
            this.image.playAnimation("idle_tl", 5, true, this.image.animationFrame);
        }
        else if (this.getDirection() < Math.PI * 2) {
            this.image.playAnimation("idle_tr", 5, true, this.image.animationFrame);
        }
    }
    playAttack() {
        if (this.getDirection() >= 0 && this.getDirection() < Math.PI / 2) {
            this.image.playAnimation("attack_br", 10, true, this.image.animationFrame);
        }
        else if (this.getDirection() >= Math.PI / 2 && this.getDirection() < Math.PI) {
            this.image.playAnimation("attack_bl", 10, true, this.image.animationFrame);
        }
        else if (this.getDirection() >= Math.PI && this.getDirection() < 3 * Math.PI / 2) {
            this.image.playAnimation("attack_tl", 10, true, this.image.animationFrame);
        }
        else if (this.getDirection() >= 3 * Math.PI / 2 && this.getDirection() < Math.PI * 2) {
            this.image.playAnimation("attack_tr", 10, true, this.image.animationFrame);
        }
        if (this.image.animationFrame == 2) {
            this.shooting = false;
        }
    }
    onCollision(dmg, _type) {
        if (_type == "fire") {
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
