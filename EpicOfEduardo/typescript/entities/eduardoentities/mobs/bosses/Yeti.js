/* global Entity Ball HitBox BaseMobile MyGame GameSprite Crystal */
class Yeti extends BaseMobile {
    constructor(_x, _y) {
        super(_x, _y);
        this.target = null;
        this.health = 12;
        this.friction = 0.1;
        this.drag = 0.02;
        this.gravity = 0.7;
        this.phase = "stand";
        this.phaseTimer = 30;
        this.setType("enemy");
        this.setHitBox(96, 96, 0, 0);
        this.image = new GameSprite(MyGame.imgs["yeti"], 96, 96);
        this.image.addAnimation("walk_l", [0, 1, 2, 3]);
        this.image.addAnimation("walk_r", [11, 10, 9, 8]);
        this.image.addAnimation("skate_l", [4]);
        this.image.addAnimation("skate_r", [7]);
        this.image.addAnimation("jump_l", [5]);
        this.image.addAnimation("jump_r", [6]);
        this.image.addAnimation("stand_l", [0]);
        this.image.addAnimation("stand_r", [11]);
    }
    update(_dt) {
        if (!this.alive || this.hitStun > 0) {
            if (this.visible) {
                this.visible = false;
            }
            else {
                this.visible = true;
            }
            
        }
        if (!this.alive) {
            this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag);
            this.moveBy(this.getXSpeed(), this.getYSpeed());
            this.mask.update(this.x, this.y);
            if (this.y > this.world.height) {
                this.destroy();
            }
            return;
        }
        if (!this.target) {
            this.target = this.world.findByName("Eduardo");
            return;
        }
        if (this.invFrames > 0) {
            this.invFrames--;
            if (this.visible) {
                this.visible = false;
            }
            else {
                this.visible = true;
            }
            if (this.invFrames <= 0) {
                this.visible = true;
            }
        }
        if (this.hitStun > 0) {
            this.hitStun--;
            return;
        }
        this.image.updateAnimation(_dt);
        this.phaseTimer--;
        if (this.phase === "stand") {
            if (this.target.x + 20 < this.x) {
                this.image.playAnimation("stand_l");
            }
            else {
                this.image.playAnimation("stand_r");
            }
            if (this.phaseTimer <= 0) {
                this.phase = "walk";
                this.phaseTimer = 75;
            }
        }
        if (this.phase === "walk") {
            if (this.target.x + 20 < this.x) {
                this.image.playAnimation("walk_l", 15);
                this.setXSpeed(this.getXSpeed() - 0.2);
                if (this.getXSpeed() < - 5) {
                    this.setXSpeed(-5);
                }
            }
            else {
                this.image.playAnimation("walk_r", 15);
                this.setXSpeed(this.getXSpeed() - 0.2);
                if (this.getXSpeed() < - 5) {
                    this.setXSpeed(-5);
                }
            }
            if (this.phaseTimer <= 0) {
                this.phase = "skate";
                this.phaseTimer = 60;
            }
        }
        if (this.phase === "skate") {
            let skateSpeed = 6 + (12 -  this.health) / 2;
            if (!this.collideTypes(["wall", "platform"], this.x + 10 * this.getXSpeed(), this.y + 1) || this.collideTypes(["wall", "enemy"], this.x + this.getXSpeed(), this.y)) {
                if (this.faceRight) {
                    this.setXSpeed(-skateSpeed);
                    this.faceRight = false;
                    this.image.playAnimation("skate_l");
                }
                else if (!this.faceRight) {
                    this.setXSpeed(skateSpeed);
                    this.faceRight = true;
                    this.image.playAnimation("skate_r");
                }
            }
            if (this.phaseTimer <= 0) {
                this.phase = "ball";
                this.phaseTimer = 30;
            }
        }
        if (this.phase === "ball") {
            this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag * this.drag);
            if (this.getXSpeed() < 0) {
                this.image.playAnimation("jump_l");
            }
            else {
                this.image.playAnimation("jump_r");
            }
            if (this.phaseTimer > 0) {
                this.setYSpeed(-8);
            }
            if (this.phaseTimer <= 0 && this.checkOnGround()) {
                this.world.addEntity(new Ball(this.x - 32, -10, 1, 0));
                this.world.addEntity(new Ball(this.x + 96, -10, 1, 0));
                this.phase = "walk";
                this.phaseTimer = 75;
            }
        }
        this.mobileMove();
    }
    onCollision(dmg, _type) {
        if (this.invFrames > 0) {
            return;
        }
        if (_type === "stomp") {
            this.health -= 3;
            this.invFrames = 40;
            this.hitStun = 20;
            this.phase = "ball";
            this.phaseTimer = 30;
        }
        else if (_type === "fire" || _type === "hammer") {
            this.health -= 2;
            this.invFrames = 40;
            this.hitStun = 20;
            this.phase = "ball";
            this.phaseTimer = 30;
        }
        else if (_type === "powder") {
            this.health -= 1;
            this.invFrames = 30;
            this.hitStun = 10;
            this.phase = "ball";
            this.phaseTimer = 30;
        }
        if (this.health <= 0) {
            this.alive = false;
            this.setType(null);
            this.world.addEntity(new Crystal(this.x + 48, 416));
        }
    }
}