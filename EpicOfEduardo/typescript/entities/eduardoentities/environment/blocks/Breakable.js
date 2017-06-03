/* global Entity HitBox */
class Breakable extends Entity {
    constructor(_x, _y, _t) {
        super(_x, _y);
        this.setType("wall");
        this.iFrames = 0;
        this.emitter = new ParticleEmitter();
        this.timer = 0;
        if (_t == "rocks") {
            this.emitter.setColour("#AFA2A0");
            this.emitter.setShape("circle");
            this.emitter.setMotion(60, 0, 120, 2 * Math.PI);
            this.emitter.setRadius(5);
            this.emitter.setUseLocal(true);
            this.emitter.setLocalPosition(this.x, this.y);
            this.emitter.setLife(0.3);
            this.emitter.setScale(0.4, 1.2);
            this.name = "rock";
            this.image = new GameSprite(MyGame.imgs["rock_wall"], 48, 48);
        }
        this.mask = new HitBox(_x, _y, 48, 48);
    }
    update(_dt) {
        this.emitter.update(_dt);
        if (this.iFrames > 0) {
            this.iFrames -= 1;
        }
        let hammer = this.collideTypes("hammer", this.x, this.y);
        if (hammer) {
            this.onCollision(2, "hammer");
        }
        this.image.updateAnimation(_dt);
        if (this.timer > 0) {
            this.timer--;
            if (this.timer <= 0) {
                this.destroy();
            }
        }
    }
    render(_g) {
        super.render(_g);
        this.emitter.render(_g);
    }
    onCollision(dmg, _type) {
        if (this.name == "rock" && this.iFrames <= 0 && _type == "hammer") {
            let h = this.image.currentFrame + 1;
            if (h > 2) {
                this.setType(null);
                this.timer = 15;
            }
            else {
                this.image.currentFrame = h;
            }
            this.iFrames = 5;
            this.emitter.colouredShapeParticle(12, 12);
            this.emitter.colouredShapeParticle(36, 12);
            this.emitter.colouredShapeParticle(12, 36);
            this.emitter.colouredShapeParticle(36, 36);
            this.emitter.colouredShapeParticle(24, 24);
        }
    }
}
