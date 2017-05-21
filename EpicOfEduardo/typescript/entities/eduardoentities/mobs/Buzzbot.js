/* global BaseMobile GameSprite MyGame */
class Buzzbot extends BaseMobile {
    constructor(_x, _y, _pattern = "Circle", ps = 2, _size = 0, _d) {
        super(_x, _y);
        this.setType("enemy");
        this.pattern = _pattern;
        this.preferredSpeed = ps;
        this.side = 1;
        this.drops = _d;
        if (_size < 20 || _size > 120) {
            this.size = 60;
        }
        else {
            this.size = _size;
        }
        this.setDirection(0);
        this.setSpeed(ps);
        this.setHitBox(56, 32, 2, 2);
        if (_pattern === "Chase") {
            this.image = new GameSprite(MyGame.imgs["buzzbot_chaser"], 60, 36);
            this.movementTimer = 5;
        }
        else if (_pattern === "Shoot") {
            this.image = new GameSprite(MyGame.imgs["buzzbot_shooter"], 60, 36);
            this.timer = 60;
            this.movementTimer = _size;
            this.setYSpeed(-ps);
            this.setXSpeed(0);
        }
        else if (_pattern === "Left") {
            this.setDirection(Math.PI);
            this.image = new GameSprite(MyGame.imgs["buzzbot"], 60, 36);
        }
        else {
            this.image = new GameSprite(MyGame.imgs["buzzbot"], 60, 36);
        }
        this.image.addAnimation("left", [0, 1]);
        this.image.addAnimation("right", [2, 3]);
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
        else if (this.y < MyGame.camera.y - MyGame.HEIGHT / 2 || this.x < MyGame.camera.x - MyGame.WIDTH / 2 || this.y > MyGame.camera.y + MyGame.HEIGHT * 3 / 2 || this.x > MyGame.camera.x + MyGame.WIDTH * 3 / 2) {
            return;
        }
        if (this.pattern != "Shoot") {
            if (this.getXSpeed() > 0) {
                this.image.playAnimation("right", 15);
            }
            else {
                this.image.playAnimation("left", 15);
            }
        }
        this.image.updateAnimation(_dt);
        if (this.pattern == "Circle") {
            this.setDirection(this.getDirection() + Math.PI / this.size);
        }
        else if (this.pattern == "Eight") {
            this.setDirection(this.getDirection() + this.side * Math.PI / this.size);
            if (this.getDirection() >= 0 && this.getDirection() < (Math.PI / this.size)) {
                this.side = -this.side;
            }
        }
        else if (this.pattern == "Chase") {
            if (!this.target) {
                this.target = this.world.findByName("Eduardo");
                return;
            }
            this.movementTimer--;
            if (this.movementTimer <= 0) {
                this.setDirection(Math.atan2(this.target.y - this.y, this.target.x - this.x));
                this.movementTimer = 5;
            }
        }
        else if (this.pattern == "Shoot") {
            this.timer--;
            this.movementTimer--;
            if (this.movementTimer <= 0) {
                this.movementTimer = this.size;
                if (this.getYSpeed() < 0) {
                    this.setYSpeed(this.preferredSpeed);
                }
                else {
                    this.setYSpeed(-this.preferredSpeed);
                }
            }
            if (this.x > MyGame.camera.x + MyGame.WIDTH / 2) {
                this.image.playAnimation("left", 15);
                if (this.timer <= 0) {
                    this.world.addEntity(new Bullet(this.x + this.width / 2, this.y + this.height / 2, 5, 5, Math.PI));
                    this.timer = 60;
                }
            }
            else {
                this.image.playAnimation("right", 15);
                if (this.timer <= 0) {
                    this.world.addEntity(new Bullet(this.x + this.width / 2, this.y + this.height / 2, 6, 5, 0));
                    this.timer = 60;
                }
            }
        }
        this.mobileMove();
    }
    onCollision(dmg, _type) {
        this.setType(null);
        this.alive = false;
        this.gravity = 0.7;
        this.drag = 0.018;
    }
}
