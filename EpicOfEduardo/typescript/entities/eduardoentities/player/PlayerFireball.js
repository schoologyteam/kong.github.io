/* global BaseMobile */
class PlayerFireball extends BaseMobile {
    constructor(_x, _y, _s) {
        super(_x, _y);
        this.setXSpeed(_s);
        this.setYSpeed(-1.5);
        this.gravity = 0.3;
        this.drag = 0.03;
        this.friction = 0.016;
        this.image = new GameSprite(MyGame.imgs["fire"], 32, 32);
        this.image.addAnimation("fire", [1, 2]);
        this.image.playAnimation("fire", 10);
        this.image.addAnimation("flare", [0, 1, 2, 3, 4]);
        this.offsetX = 10;
        this.offsetY = 8;
        this.timer = 14;
        this.flare = false;
        this.shouldFlare = false;
        this.mask = new HitBox(this.x + this.offsetX, this.y + this.offsetY, 20, 16);
        this.setType("fire");
    }
    update(_dt) {
        if (this.checkOnGround() || this.collideTypes("wall", this.x + this.getXSpeed(), this.y) || this.shouldFlare) {
            if (!this.flare) {
                this.flare = true;
                this.image.playAnimation("flare", 20);
                this.setHitBox(20, 16, 0, 0);
            }
        }
        if (this.flare) {
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
