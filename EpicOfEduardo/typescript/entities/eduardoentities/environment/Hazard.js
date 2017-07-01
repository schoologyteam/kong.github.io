/* global Entity */
class Hazard extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.setType("hazard");
    }
    smash(_s) {
        if (_s == this.weakness) {
            this.destroy();
            this.world.addEntity(new SmashEffect(this.x, this.y, this.weakness));
        }
    }
}

class SmashEffect extends Entity {
    constructor(_x, _y, _type) {
        super(_x, _y);
        if (this.type === "fire") {
            this.image = new ParticleEmitter();
            this.image.setImage(MyGame.imgs["fire_2"]);
            this.image.useFade(1, 0.6);
            this.image.setMotion(20, 4 / 3 * Math.PI, 40, 5 /3 * Math.PI);
            this.image.setLife(0.10, 0.28);
            this.image.setLocalPosition(this.x, this.y);
            this.image.setUseLocal(true);
            this.image.imageParticle(Math.random() * (52 -16), Math.random() * (38 - 16));
            this.image.imageParticle(Math.random() * (52 -16), Math.random() * (38 - 16));
            this.image.imageParticle(Math.random() * (52 -16), Math.random() * (38 - 16));
            this.image.imageParticle(Math.random() * (52 -16), Math.random() * (38 - 16));
            this.image.imageParticle(Math.random() * (52 -16), Math.random() * (38 - 16));
            this.image.imageParticle(Math.random() * (52 -16), Math.random() * (38 - 16));
            this.image.imageParticle(Math.random() * (52 -16), Math.random() * (38 - 16));
        }
        else {
            this.image = new ParticleEmitter();
            this.image.setColour("#AFA2A0");
            this.image.setShape("circle");
            this.image.setMotion(60, 0, 120, 2 * Math.PI);
            this.image.setRadius(5);
            this.image.setUseLocal(true);
            this.image.setLocalPosition(this.x, this.y);
            this.image.setLife(0.33);
            this.image.setScale(0.4, 1.2);
            this.image.colouredShapeParticle(12, 12);
            this.image.colouredShapeParticle(36, 12);
            this.image.colouredShapeParticle(12, 36);
            this.image.colouredShapeParticle(36, 36);
            this.image.colouredShapeParticle(24, 24);
        }
        this.timer = 20;
    }
    update(_dt) {
        this.image.update(_dt);
        this.timer--;
        if (this.timer <= 0) {
            this.destroy();
        }
    }
}