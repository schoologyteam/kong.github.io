/* global BaseMobile GameSprite MyGame */
class PowderBall extends BaseMobile {
    constructor(_x, _y, _s) {
        super(_x, _y);
        this.setXSpeed(_s);
        this.setYSpeed(-2);
        this.gravity = 0.5;
        this.drag = 0.03;
        this.timer = 18;
        this.friction = 0.012;
        this.image = new GameSprite(MyGame.imgs["projectiles"], 16, 16);
        this.image.addAnimation("powder", [3]);
        this.image.playAnimation("powder");
        this.setHitBox(16, 16, 0, 0);
        this.flare = false;
        this.shouldFlare = false;
        this.setType("powder");
    }
    update(_dt) {
        if (this.checkOnGround() || this.collideTypes("wall", this.x + this.getXSpeed(), this.y) || this.shouldFlare) {
            if (!this.flare) {
                this.flare = true;
                this.image = new GameSprite(MyGame.imgs["lock"], 16, 16);
                this.image.addAnimation("poof", [1, 2, 3, 3]);
                this.image.playAnimation("poof", 12);
                this.setHitBox(20, 20, -4, -4);
                this.y -= 4;
            }
        }
        if (this.flare) {
            if (this.checkOnGround()) {
                this.setYSpeed(0);
            }
            this.timer--;
            if (this.timer <= 0) {
                this.destroy();
            }
        }
        this.setYSpeed(this.getYSpeed() + this.gravity - this.getYSpeed() * this.drag);
        this.setXSpeed(this.getXSpeed() - this.getXSpeed() * this.friction);
        this.mobileMove();
        this.image.updateAnimation(_dt);
        let e = this.collideTypes(["enemy", "slime", "plant"], this.x, this.y);
        if (e) {
            e.onCollision(1, this.getType());
            this.shouldFlare = true;
        }
        let h = this.collideTypes("hazard", this.x, this.y);
        if (h) {
            h.smash(this.getType());
            this.shouldFlare = true;
        }
    }
}
