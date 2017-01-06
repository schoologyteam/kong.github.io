/* global Entity GameSprite MyGame HitBox KeyManager OverWorld Hammer PlayerFireball PowderBall*/
class Eduardo extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.faceRight = true;
        this.attacking = false;
        this.onGround = false;
        this.isCrawling = false;
        this.drag = 0.017;
        this.gravity = 0.7;
        this.friction = 0.02;
        this.specialJump = 1;
        this.specialJumpPow = 0;
        this.maxSpeed = 6;
        this.jumpPow = 0;
        this.cooldown = 0;
        this.springTime = 0;
        this.iFrames = 0;
        this.index = new Array(0, 0, 1, 2, 0, 0, 0, 3, 4, 0, 0, 0, 5);
        this.costume = new Array();
        this.addCostume("eddy");
        this.addCostume("eddy_wings");
        this.addCostume("eddy_boots");
        this.addCostume("eddy_powder");
        this.addCostume("eddy_hammer");
        this.addCostume("eddy_fire");
        this.setType("player");
        this.name = "Eduardo";
        this.image = this.costume[this.index[Eduardo.power]];
        this.image.playAnimation("right");
        this.offsetX = 8;
        this.width = 44;
        this.mainHitBox = new HitBox(this.x + this.offsetX, this.y, this.width, 70);
        this.mask = this.mainHitBox;
        this.crawlHitBox = new HitBox(this.x + this.offsetX, this.y + 30, this.width, 40);
        this.platformSweepHitBox = new HitBox(this.x + this.offsetX, this.y + 60, this.width, 10);
    }
    addCostume(cs) {
        let s = new GameSprite(MyGame.imgs[cs], 62, 70);
        s.addAnimation("right", [0, 1, 2, 3]);
        s.addAnimation("left", [4, 5, 6, 7]);
        s.addAnimation("stand_r", [0]);
        s.addAnimation("stand_l", [4]);
        s.addAnimation("jump_r", [8]);
        s.addAnimation("jump_l", [10]);
        s.addAnimation("fall_r", [9]);
        s.addAnimation("fall_l", [11]);
        s.addAnimation("attack_r", [12, 13, 14, 0]);
        s.addAnimation("attack_l", [15, 16, 17, 4]);
        s.addAnimation("crouch_r", [20]);
        s.addAnimation("crouch_l", [24]);
        s.addAnimation("crawl_r", [21, 22, 21, 23]);
        s.addAnimation("crawl_l", [25, 26, 25, 27]);
        s.addAnimation("glide_r", [18]);
        s.addAnimation("glide_l", [19]);
        this.costume.push(s);
    }
    update(_dt) {
        if (this.cooldown > 0) {
            this.cooldown -= 1;
        }
        if (this.attacking && (this.image.currentFrame < 12 || this.image.currentFrame > 17)) {
            this.attacking = false;
        }
        this.movement();
        this.collisions();
        if (this.x >= this.world.width - 410) {
            MyGame.camera.x = this.world.width - MyGame.WIDTH;
        }
        else if (this.x <= 358) {
            MyGame.camera.x = 0;
        }
        else {
            MyGame.camera.x = this.x - 358;
        }
        if (this.y >= this.world.height - 324) {
            MyGame.camera.y = this.world.height - MyGame.HEIGHT;
        }
        else if (this.y <= 252) {
            MyGame.camera.y = 0;
        }
        else {
            MyGame.camera.y = this.y - 252;
        }
        this.image.updateAnimation(_dt);
    }
    movement() {
        this.platformSweepHitBox.update(this.x + this.offsetX, this.y + 60);
        this.crawlHitBox.update(this.x + this.offsetX, this.y + 30);
        this.mainHitBox.update(this.x + this.offsetX, this.y);
        this.wallsAndPlatforms();
        this.controls();
        let ys = this.getYSpeed();
        let xs = this.getXSpeed();
        let fl = this.friction;
        let dl = this.drag;
        if (!this.onGround) {
            ys = ys + this.gravity;
        }
        if (this.springTime > 0) {
            this.springTime -= 1;
            ys = -10;
        }
        ys -= ys * dl + ys * ys * ys * 0.0000018;
        this.setYSpeed(ys);
        this.setXSpeed(xs - xs * fl);
        this.determineHitBox();
        this.moveBy(this.getXSpeed(), 0, "wall");
        if (this.getYSpeed() < 0) {
            this.moveBy(0, this.getYSpeed(), "wall");
        }
        else {
            this.selectHitBox("pfs");
            if (!this.collideTypes("platform", this.x, this.y)) {
                this.moveBy(0, this.getYSpeed(), ["wall", "platform"]);
            }
            else {
                this.moveBy(0, this.getYSpeed(), "wall");
            }
            this.determineHitBox();
        }
        this.mask.update(this.x + this.offsetX, this.y + this.offsetY);
    }
    collisions() {
        if (this.y > this.world.height || Eduardo.hearts <= 0) {
            Eduardo.hearts = Eduardo.maxHearts;
            Eduardo.power = 0;
            MyGame.setWorld(new OverWorld);
        }
        else if (this.x + 48 < 0 || this.x > this.world.width) {
            MyGame.setWorld(new OverWorld);
        }
        let item = this.collideTypes("item", this.x, this.y);
        if (item) {
            item.collect();
            this.image = this.costume[this.index[Eduardo.power]];
        }
        if (this.iFrames > 0) {
            if (this.visible) {
                this.visible = false;
            }
            else {
                this.visible = true;
            }
            this.iFrames -= 1;
            if (this.iFrames <= 0) {
                this.visible = true;
            }
        }
        let other = this.collideTypes(["enemy", "hazard", "bullet", "slime", "plant"], this.x, this.y);
        if (other) {
            if (other.getType() === "enemy") {
                if (this.y + 70 < other.y + 7 + other.height / 3.5) {
                    other.onCollision(1, "stomp");
                    this.setYSpeed(-10);
                    this.y -= 6;
                    if (Eduardo.power === 2) {
                        this.specialJumpPow += 15;
                    }
                    else if (Eduardo.power === 3) {
                        this.specialJumpPow += 5;
                    }
                    if (KeyManager.held("ArrowUp") || KeyManager.held("z") || KeyManager.held("c")) {
                        this.jumpPow = 16;
                    }
                }
                else {
                    if (this.iFrames > 0) {
                        return;
                    }
                    Eduardo.hearts -= 2;
                    Eduardo.powerHits--;
                    this.iFrames = 46;
                    if (Eduardo.powerHits <= 0) {
                        Eduardo.power = 0;
                        this.image = this.costume[0];
                    }
                    if (other.x + other.width / 2 > this.x + 27) {
                        this.setXSpeed(-4);
                    }
                    else {
                        this.setXSpeed(4);
                    }
                    this.setYSpeed(-2);
                }
            }
            else {
                if (this.iFrames > 0) {
                    return;
                }
                Eduardo.hearts--;
                Eduardo.powerHits--;
                this.iFrames = 46;
                if (other.getType() === "slime" || other.getType() === "plant") {
                    Eduardo.hearts--;
                }
                if (Eduardo.powerHits <= 0) {
                    Eduardo.power = 0;
                    this.image = this.costume[0];
                }
                if (other.x + other.width / 2 > this.x + 27) {
                    this.setXSpeed(-6);
                }
                else {
                    this.setXSpeed(6);
                }
                this.setYSpeed(-6);
            }
        }
    }
    wallsAndPlatforms() {
        this.selectHitBox("pfs");
        this.onGround = false;
        this.drag = 0.018;
        if (this.getYSpeed() >= 0) {
            if (this.collideTypes("wall", this.x, this.y + 1)) {
                this.setOnGround();
            }
            else if (this.collideTypes("platform", this.x, this.y + 1) && !this.collideTypes("platform", this.x, this.y)) {
                this.setOnGround();
            }
        }
        this.determineHitBox();
        if (!this.onGround) {
            this.friction = 0.02;
            if (this.getYSpeed() < 0) {
                if (this.faceRight) {
                    this.image.playAnimation("jump_r");
                }
                else {
                    this.image.playAnimation("jump_l");
                }
            }
            else {
                if (this.faceRight) {
                    this.image.playAnimation("fall_r");
                }
                else {
                    this.image.playAnimation("fall_l");
                }
            }
        }
    }
    controls() {
        let keyDown = false;
        if (KeyManager.held("ArrowLeft") || KeyManager.held("Left")) {
            this.friction = 0.1;
            keyDown = true;
            this.faceRight = false;
            if (this.getXSpeed() > -this.maxSpeed) {
                this.setXSpeed(this.getXSpeed() - 1);
            }
            if (this.onGround) {
                if (this.isCrawling) {
                    this.image.playAnimation("crawl_l", 10);
                }
                else {
                    this.image.playAnimation("left", 15);
                }
            }
        }
        if (KeyManager.held("ArrowRight") || KeyManager.held("Right")) {
            this.friction = 0.1;
            keyDown = true;
            this.faceRight = true;
            if (this.getXSpeed() < this.maxSpeed) {
                this.setXSpeed(this.getXSpeed() + 1);
            }
            if (this.onGround) {
                if (this.isCrawling) {
                    this.image.playAnimation("crawl_r", 10);
                }
                else {
                    this.image.playAnimation("right", 15);
                }
            }
        }
        if (KeyManager.pressed("ArrowUp") || KeyManager.pressed("z") || KeyManager.pressed("c") || KeyManager.pressed("Up")) {
            if (this.onGround) {
                this.setYSpeed(-8.5);
                this.jumpPow = 16;
                this.onGround = false;
            }
        }
        else if (KeyManager.held("ArrowUp") || KeyManager.held("z") || KeyManager.held("c") || KeyManager.held("Up")) {
            if (this.jumpPow > 0) {
                this.jumpPow -= 1;
                this.setYSpeed(-8.5);
            }
        }
        else {
            this.jumpPow = 0;
        }
        if (KeyManager.held("ArrowDown") || KeyManager.held("Down")) {
            if (this.onGround) {
                this.isCrawling = true;
                this.maxSpeed = 2.4;
                this.mask = this.crawlHitBox;
                if (this.getXSpeed() < 0.4 && this.getXSpeed() > -0.4) {
                    if (this.faceRight) {
                        this.image.playAnimation("crouch_r");
                    }
                    else {
                        this.image.playAnimation("crouch_l");
                    }
                }
            }
            keyDown = true;
        }
        else {
            if (this.isCrawling) {
                if (!this.collideTypes("wall", this.x, this.y - 26)) {
                    this.isCrawling = false;
                    this.maxSpeed = 6;
                    this.determineHitBox();
                }
                else {
                    keyDown = true;
                    if (this.faceRight) {
                        if (this.getXSpeed() < 0.6) {
                            this.image.playAnimation("crouch_r");
                        }
                    }
                    else {
                        if (this.getXSpeed() > -0.6) {
                            this.image.playAnimation("crouch_l");
                        }
                    }
                }
            }
        }
        if (!keyDown) {
            if (this.onGround && !this.attacking) {
                if (this.faceRight) {
                    this.image.playAnimation("stand_r");
                }
                else {
                    this.image.playAnimation("stand_l");
                }
            }
        }
        if (KeyManager.pressed("x") && this.cooldown <= 0) {
            if (Eduardo.power === 3 && this.specialJump === 1) {
                this.specialJump = 0;
                this.specialJumpPow = 16;
                this.setYSpeed(-6);
            }
            if (!this.isCrawling) {
                if (Eduardo.power === 12) {
                    this.cooldown = 30;
                    if (this.faceRight) {
                        if (this.getXSpeed() < 10 && this.getYSpeed() == 0) {
                            this.attacking = true;
                            this.image.playAnimation("attack_r", 15);
                        }
                        this.world.addEntity(new PlayerFireball(this.x + this.width, this.y, 8 + 0.7 * this.getXSpeed()));
                    }
                    else {
                        if (this.getXSpeed() > -10 && this.getYSpeed() == 0) {
                            this.attacking = true;
                            this.image.playAnimation("attack_l", 15);
                        }
                        this.world.addEntity(new PlayerFireball(this.x, this.y, -8 + 0.7 * this.getXSpeed()));
                    }
                }
                else if (Eduardo.power === 8) {
                    let swing;
                    this.cooldown = 39;
                    this.attacking = true;
                    if (this.faceRight) {
                        if (this.onGround) {
                            swing = "ground_right";
                            this.image.playAnimation("attack_r", 15);
                        }
                        else {
                            swing = "air_right";
                        }
                    }
                    else {
                        if (this.onGround) {
                            swing = "ground_left";
                            this.image.playAnimation("attack_l", 15);
                        }
                        else {
                            swing = "air_left";
                        }
                    }
                    this.world.addEntity(new Hammer(this.x, this.y, this, swing));
                }
                else if (Eduardo.power === 7) {
                    this.cooldown = 28;
                    if (this.faceRight) {
                        if (this.getXSpeed() < 10 && this.getYSpeed() == 0) {
                            this.attacking = true;
                            this.image.playAnimation("attack_r", 15);
                        }
                        this.world.addEntity(new PowderBall(this.x + this.width, this.y, 8 + 0.7 * this.getXSpeed()));
                    }
                    else {
                        if (this.getXSpeed() > -10 && this.getYSpeed() == 0) {
                            this.attacking = true;
                            this.image.playAnimation("attack_l", 15);
                        }
                        this.world.addEntity(new PowderBall(this.x, this.y, -8 + 0.7 * this.getXSpeed()));
                    }
                }
            }
        }
        else if (KeyManager.held("x")) {
            if (Eduardo.power === 3 && this.specialJumpPow > 0) {
                this.specialJumpPow -= 1;
                this.setYSpeed(-6);
            }
            else if (Eduardo.power === 2 && this.getYSpeed() > 0) {
                if (this.specialJump === 1) {
                    this.specialJump = 0;
                    this.specialJumpPow = 91;
                }
                if (this.specialJumpPow > 0) {
                    this.specialJumpPow -= 1;
                    this.drag = 0.3;
                }
                if (this.faceRight) {
                    this.image.playAnimation("glide_r");
                }
                else {
                    this.image.playAnimation("glide_l");
                }
            }
        }
        if (KeyManager.pressed("Escape")) {
            MyGame.setWorld(new PauseWorld(this.world));
        }
    }
    springJump(_jump) {
        if (_jump) {
            this.springTime = 25;
        }
        else {
            this.springTime = 5;
        }
    }
    determineHitBox() {
        if (this.isCrawling && this.onGround) {
            this.selectHitBox("crawl");
        }
        else {
            this.selectHitBox("main");
        }
    }
    setOnGround() {
        this.setYSpeed(0);
        this.onGround = true;
        this.friction = 0.30;
        this.specialJump = 1;
    }
    selectHitBox(_hb) {
        if (_hb === "main") {
            this.mask = this.mainHitBox;
            this.offsetY = 0;
        }
        else if (_hb === "crawl") {
            this.mask = this.crawlHitBox;
            this.offsetY = 30;
        }
        else if (_hb === "pfs") {
            this.mask = this.platformSweepHitBox;
            this.offsetY = 60;
        }
    }
}
Eduardo.power = 0;
Eduardo.hearts = 6;
Eduardo.maxHearts = 6;
Eduardo.powerHits = 2;
Eduardo.money = 0;
Eduardo.levelCleared = [];
Eduardo.allCoinsCollected = [];
