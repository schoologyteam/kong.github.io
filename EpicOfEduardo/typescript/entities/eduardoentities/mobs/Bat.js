/* global BaseMobile */
class Bat extends BaseMobile {
    constructor(_x, _y, _pattern = "Circle", ps = 2, _size = 0) {
        super(_x, _y);
        this.setType("enemy");
        this.pattern = _pattern;
        this.preferredSpeed = ps;
        this.side = 1;
        if (_size < 30 || _size > 90) {
            this.size = 60;
        }
        else {
            this.size = _size;
        }
        this.width = 48;
        this.height = 30;
        this.setDirection(0);
        this.setSpeed(ps);
        this.mask = new HitBox(this.x, this.y, this.width, this.height);
        this.image = new GameSprite(MyGame.imgs["bat"], 48, 30);
        this.image.addAnimation("fly", [0, 1, 2, 1]);
        this.image.playAnimation("fly", 15);
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
        this.mobileMove();
    }
    onCollision(dmg, _type) {
        this.setType(null);
        this.alive = false;
        this.gravity = 0.7;
        this.drag = 0.018;
    }
}
