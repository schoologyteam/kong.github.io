/* global BaseMobile */
class Witch extends BaseMobile {
    constructor(_x, _y) {
        super(_x, _y);
        MyGame.nowPlaying.pause();
        MyGame.nowPlaying.currentTime = 0;
        MyGame.nowPlaying = MyGame.snds["Boss"];
        MyGame.nowPlaying.play();
        this.target = null;
        this.health = 24;
        this.friction = 0.1;
        this.drag = 0.02;
        this.gravity = 0.7;
        this.phase = "stand";
        this.phaseTimer = 30;
        this.setType("enemy");
        this.setHitBox(48, 96, 8, 0);
        this.image = new GameSprite(MyGame.imgs["witch"], 64, 96);
        this.image.addAnimation("s_left", [0]);
        this.image.addAnimation("s_right", [11]);
        this.image.addAnimation("wand_left", [0, 1, 2, 2, 2, 1, 0]);
        this.image.addAnimation("wand_right", [11, 10, 9, 9, 9, 10, 11]);
        this.image.addAnimation("float_left", [3]);
        this.image.addAnimation("float_right", [8]);
        this.image.addAnimation("f_w_left", [3, 4, 5, 5, 5, 4 , 4, 3]);
        this.image.addAnimation("f_w_right", [8, 7, 6, 6, 6, 7, 7, 8]);
        this.attackTimer = 0;
        this.phaseTimer = 45;
        this.phaseEnd = 0;
        this.faceRight = false;
        this.phase = "stand";
        this.attacking = false;
    }
    update(_dt) {
        if (!this.alive) {
            if (this.visible) {
                this.visible = false;
            }
            else {
                this.visible = true;
            }
            this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag);
            this.moveBy(this.getXSpeed(), this.getYSpeed());
            this.mask.update(this.x, this.y);
            if (this.y > this.world.height) {
                this.destroy();
            }
            return;
        }
        if (this.invFrames > 0) {
            if (this.visible) {
                this.visible = false;
            }
            else {
                this.visible = true;
            }
            this.invFrames--;
            if (this.invFrames <= 0) {
                this.visible = true;
            }
        }
        if (this.hitStun > 0) {
            this.hitStun--;
        }
        this.image.updateAnimation(_dt);
        if (!this.target) {
            this.target = this.world.findByName("Eduardo");
            return;
        }
        this.phaseTimer--;
        if (this.attackTimer > 0) {
            this.attackTimer--;
        }
        if (this.phase === "stand") {
            if (this.target.x > this.x) {
                this.image.playAnimation("s_right");
            }
            else {
                this.image.playAnimation("s_left");
            }
            if (this.phaseTimer <= 0) {
                this.phase = "rapid_fire";
                this.attackTimer = 15;
                this.phaseTimer = 135;
                this.phaseEnd = 0;
            }
        }
        else if (this.phase === "rapid_fire") {
            let bx = this.x + 2;
            let by = this.y + 16;
            let sign = -1;
            if (this.target.x > this.x) {
                this.image.playAnimation("wand_right", 15, true, this.image.animations["wand_right"][this.image.animationFrame]);
                sign = 1;
                bx = this.x + 60;
            }
            else {
                this.image.playAnimation("wand_left", 15, true, this.image.animations["wand_left"][this.image.animationFrame]);
            }
            if (this.attackTimer <= 0) {
                if (this.phaseEnd === 4 || this.phaseEnd === 0) {
                    this.world.addEntity(new Bullet(bx, by, 4, 3, Math.atan2(this.target.y - this.y - 10 + Math.random() * 20, this.target.x - this.x)));
                }
                else if (this.phaseEnd % 2) {
                    this.world.addEntity(new Bullet(bx, by, 1, 9, Math.atan2(-9, sign)));
                }
                else {
                    this.world.addEntity(new Bullet(bx, by, 1, 9 - this.phaseEnd, Math.atan2(-1, sign)));
                }
                this.phaseEnd++;
                this.attackTimer = 25;
            }
            if (this.phaseTimer <= 0) {
                if (this.health >= 20) {
                    this.phase = "stand";
                    this.phaseTimer = 60 + 10 * (this.health - 18);
                }
                else {
                    this.phase = "float";
                    this.phaseTimer = 360 + 15 * (15 - this.health);
                    this.attackTimer = 50
                    this.attacking = false;
                }
            }
        }
        else if (this.phase == "float") {
            let bx = this.x + 2;
            let by = this.y + 18;
            if (this.y > 100) {
                this.setYSpeed(-5);
                if (this.faceRight) {
                    this.image.playAnimation("float_right");
                }
                else {
                    this.image.playAnimation("float_left");
                }
            }
            else {
                if (this.faceRight) {
                    if (this.attacking) {
                        this.image.playAnimation("f_w_right", 15, false);
                    }
                    else {
                        this.image.playAnimation("float_right");
                    }
                    if (this.getXSpeed() < 4) {
                        this.setXSpeed(this.getXSpeed() + 0.5);
                    }
                    if (this.x > 864) {
                        this.faceRight = false;
                    }
                }
                else {
                    bx = this.x + 60;
                    if (this.attacking) {
                        this.image.playAnimation("f_w_left", 15, false);
                    }
                    else {
                        this.image.playAnimation("float_left");
                    }
                    if (this.getXSpeed() > -4) {
                        this.setXSpeed(this.getXSpeed() - 0.5);
                    }
                    if (this.x < 384) {
                        this.faceRight = true;
                    }
                }
            }
            if (this.attackTimer <= 10) {
                this.attacking = true;
                if (this.attackTimer <= 0) {
                    this.attackTimer = 30 + 2 * this.health;
                    this.world.addEntity(new Bullet(bx, by, 1, 0, Math.PI/2));
                }
            }
            else if (this.attackTimer <= 40) {
                this.attacking = false;
            }
            if (this.phaseTimer <= 0) {
                this.phase = "float_fire";
                this.attackTimer = 10;
                this.phaseTimer = 120 + 10 * (20 - this.health);
                this.phaseEnd = 0;
                this.dir = 0;
            }
        }
        else if (this.phase == "float_fire") {
            if (this.y > 180) {
                this.setYSpeed(-5);
            }
            let bx = this.x + 2;
            let by = this.y + 16;
            if (this.target.x > this.x) {
                this.image.playAnimation("f_w_right", 15, true, this.image.animations["f_w_right"][this.image.animationFrame]);
                bx = this.x + 60;
            }
            else {
                this.image.playAnimation("f_w_left", 15, true, this.image.animations["f_w_left"][this.image.animationFrame]);
            }
            if (this.phaseEnd === 0) {
                if (this.faceRight) {
                    this.setXSpeed(-6);
                    if (this.x < 384) {
                        this.setXSpeed(0);
                        this.faceRight = true;
                        this.phaseEnd = 1;
                    }
                }
                else {
                    this.setXSpeed(6);
                    if (this.x > 864) {
                        this.setXSpeed(0);
                        this.faceRight = true;
                        this.phaseEnd = 1;
                    }
                }
            }
            if (this.attackTimer <= 0) {
                this.dir += Math.PI/7;
                this.world.addEntity(new Bullet(bx, by, 4, 5, this.dir));
                this.world.addEntity(new Bullet(bx, by, 4, -5, this.dir));
                this.attackTimer = 15;
            }
            if (this.phaseTimer <= 0) {
                this.phase = "stand";
                this.phaseTimer = 70;
            }
        }
        this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag * this.drag);
        this.mobileMove();
        if (this.checkOnGround()) {
            this.setYSpeed(0);
        }
    }
    onCollision(dmg, _type) {
        if (this.invFrames > 0) {
            return;
        }
        if (_type === "stomp" || _type === "hammer") {
            this.health -= 3;
            this.invFrames = 40;
            this.hitStun = 20;
        }
        else if (_type === "fire" || _type === "powder") {
            this.health -= 2;
            this.invFrames = 40;
            this.hitStun = 20;
        } 
        if (this.health <= 0) {
            this.alive = false;
            this.setType(null);
            this.world.addEntity(new Crystal(600, 416));
        }
    }
}