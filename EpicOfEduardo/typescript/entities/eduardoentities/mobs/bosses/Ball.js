/* global BaseMobile GameImage MyGame */
class Ball extends BaseMobile {
    constructor(_x, _y, _b, _xs) {
        super(_x, _y);
        this.bounces = _b;
        this.gravity = 0.7;
        this.drag = 0.01;
        this.friction = 0.004;
        this.setXSpeed(_xs);
        this.image = new GameImage(MyGame.imgs["ball"]);
        this.setHitBox(32, 32);
        this.setType("enemy");
        this.bounceOff = ["wall", "platform"];
    }
    update(_dt) {
        if (this.y > this.world.height) {
            this.destroy();
        }
        this.setYSpeed(this.getYSpeed() + this.gravity - this.drag * this.getYSpeed());
        this.setXSpeed(this.getXSpeed() - this.getXSpeed() * this.friction);
        this.moveBy(this.getXSpeed(), this.getYSpeed(), this.bounceOff);
        this.mask.update(this.x, this.y);
        if (this.bounces >= 0) {
            if (this.collideTypes(["wall", "platform"], this.x, this.y + 1)) {
                this.bounces -= 1; 
                this.setYSpeed(-this.getYSpeed() - 1);
                this.y -= 4;
            }
        }
        else {
            this.bounceOff = null;
        }
    }
}