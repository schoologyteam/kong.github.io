/* global BaseMobile GameSprite MyGame BossWeakSpot Bullet Ball Crystal */
class MKTurtle extends BaseMobile {
    constructor(_x, _y) {
        super(_x, _y);
        this.faceRight = false;
        this.image = new GameSprite(MyGame.imgs["mk_turtle"], 144, 192);
        this.image.addAnimation("bullets", [0, 1, 0]);
        this.image.addAnimation("fire", [0, 2, 0]);
        this.image.addAnimation("ball", [0, 3, 0]);
        this.setType("plant");
        this.attacking = false;
        this.headBox = new BossWeakSpot(this.x + 20, this.y, 35, 30, true, "stomp", this);
        this.gemBox = new BossWeakSpot(this.x + 15, this.y + 95, 20, 20, false, "hammer", this);
        this.setHitBox(120, 170, 10, 15);
        this.target = null;
        this.timers = new Array(3);
        this.timers[0] = 240;
        this.timers[1] = 180;
        this.timers[2] = 600;
        this.health = 12;
    }
    added() {
        this.world.addEntity(this.headBox);
        this.world.addEntity(this.gemBox);
    }
    update(_dt) {
        if (!this.target) {
            this.target = this.world.findByName("Eduardo");
            return;
        }
        if (this.collideEntity(this.target, this.x, this.y)) {
            this.target.setXSpeed(-8);
        }
        if (!this.alive) {
            this.timers[0]--;
            this.mask.update(this.x, this.y);
            if (this.visible) {
                this.visible = false;
            }
            else {
                this.visible = true;
            }
            if (this.timers[0] <= 0) {
                this.world.addEntity(new Crystal(this.x + 90, this.y + 70));
                this.destroy();
                this.headBox.destroy();
                this.gemBox.destroy();
            }
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
            this.target.setXSpeed(-8);
            return;
        }
        this.image.updateAnimation(_dt);
        if (this.image.animationFrame == 2) {
            this.attacking = false;
        }
        if (this.attacking) {
            if (this.image.currentFrame == 1) {
                this.attacking = false;
                MyGame.snds["pop"].pause();
                MyGame.snds["pop"].currentTime = 0;
                MyGame.snds["pop"].play();
                this.world.addEntity(new Bullet(this.x + 5, this.y + 63, 5, 5, Math.PI));
                this.world.addEntity(new Bullet(this.x + 40, this.y + 63, 5, 5, Math.PI));
                this.timers[0] = 150;
                this.timers[1] += 30;
                this.timers[2] += 30;
            }
            else if (this.image.currentFrame == 2) {
                this.attacking = false;
                MyGame.snds["pop"].pause();
                MyGame.snds["pop"].currentTime = 0;
                MyGame.snds["pop"].play();
                this.world.addEntity(new Bullet(this.x + 80, this.y + 40, 1, 8, Math.atan2(-70, this.target.x - this.x)));
                this.world.addEntity(new Bullet(this.x + 40, this.y + 40, 1, 8, Math.atan2(-70, this.target.x - this.x)));
                this.timers[1] = 100;
                this.timers[0] += 30;
                this.timers[2] += 30;
            }
            else if (this.image.currentFrame == 3) {
                this.world.addEntity(new Ball(this.x + 25, this.y + 10, 4, -2));
                this.attacking = false;
                this.timers[2] = 300;
                this.timers[0] += 60;
                this.timers[1] += 90;
            }
        }
        else {
            for (let i = 0; i < 3; i++) {
                this.timers[i]--;
            }
            if (this.timers[0] <= 0) {
                this.image.playAnimation("bullets", 8, false);
                this.attacking = true;
            }
            else if (this.timers[1] <= 0) {
                this.image.playAnimation("fire", 8, false);
                this.attacking = true;
            }
            else if (this.timers[2] <= 0) {
                this.image.playAnimation("ball", 4, false);
                this.attacking = true;
            }
        }
    }
    forwardDamage(_type, _crit) {
        let factor = 1;
        if (_crit) {
            factor = 2;   
        }
        let damage = 2;
        if (_type === "hammer") {
            damage = 1.5;
        }
        if (this.invFrames <= 0) {
            this.hitStun = 8;
            this.invFrames = 30;
            this.health -= factor * damage;
            this.target.setXSpeed(-8);
        }
        if (this.health <= 0) {
            this.alive = false;
            this.timers[0] = 120;
            this.setType(null);
        }
    }
}